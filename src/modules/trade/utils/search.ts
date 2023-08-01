import { API } from '@sanctuaryteam/shared';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

type KEY = keyof API.SearchRequest
    | keyof API.SearchRequest['query']
    | keyof API.SearchRequest['query']['item']
    | keyof API.SearchRequest['query']['seasonal']
    | keyof API.SearchRequest['query']['affixes'][0]
    | keyof API.SearchRequest['sort']

const TABLE: Record<KEY, string> = {
    query: 'q',
    sort: 's',
    item: 'i',
    affixes: 'a',
    type: 't',
    minPower: 'p',
    maxRequiredLevel: 'l',
    classRestriction: 'c',
    seasonal: 'e',
    socketType: 'y',
    id: 'd',
    minValue: 'm',
    field: 'f',
    direction: 'r'
};

const REVERSE_TABLE: Record<string, KEY> = Object.fromEntries(
    Object.entries(TABLE).map(([k, v]) => [v, k as KEY])
);

export function parseSearchRequest(
    stringified: string
): API.SearchRequest {
    if (!stringified?.length) {
        return {};
    }
    try {
        const minified = decompressFromEncodedURIComponent(stringified);
        const request = JSON.parse(minified, (_, value: unknown) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const replacement: Record<string, unknown> = {};
                for (const [k, v] of Object.entries(value)) {
                    const key = REVERSE_TABLE[k];
                    if (!key) {
                        console.warn(`Unknown key ${k} in minifed request`);
                        continue;
                    }
                    replacement[key] = v;
                }
                return replacement;
            }
            return value;
        }) as API.SearchRequest;
        return request;
    } catch (error) {
        console.warn('Failed to parse search request', error);
        return {};
    }
}

export function stringifySearchRequest(
    request: API.SearchRequest
): string {
    const minified = JSON.stringify(request, (_, value: unknown) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const replacement: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(value)) {
                const key = TABLE[k as keyof typeof TABLE];
                if (!key) {
                    console.warn(`Unknown key ${k} in request`);
                    continue;
                }
                replacement[key] = v;
            }
            return replacement;
        }
        return value;
    });
    return compressToEncodedURIComponent(minified);
}