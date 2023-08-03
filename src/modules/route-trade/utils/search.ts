import { API } from '@sanctuaryteam/shared';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

type KEY =
    | keyof API.TradeSearch
    | keyof API.TradeSearch['query']
    | keyof API.TradeSearch['query']['item']
    | keyof API.TradeSearch['query']['seasonal']
    | keyof API.TradeSearch['query']['affix']
    | keyof API.TradeSearch['query']['affix']['options'][0]
    | keyof API.TradeSearch['sort'];

const TABLE: Record<KEY, string> = {
    query: 'a',
    sort: 'b',
    item: 'c',
    seasonal: 'd',
    affix: 'e',
    options: 'f',
    id: 'g',
    minValue: 'h',
    count: 'i',
    type: 'j',
    minPower: 'k',
    maxRequiredLevel: 'l',
    classRestriction: 'm',
    socketType: 'n',
    field: 'o',
    direction: 'p',
};

const REVERSE_TABLE: Record<string, KEY> = Object.fromEntries(
    Object.entries(TABLE).map(([k, v]) => [v, k as KEY]),
);

export function parseSearchPayload(
    stringified: string,
): API.TradeSearch {
    if (!stringified?.length) {
        return {};
    }
    try {
        const minified = decompressFromEncodedURIComponent(stringified);
        const payload = JSON.parse(minified, (_, value: unknown) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const replacement: Record<string, unknown> = {};
                for (const [k, v] of Object.entries(value)) {
                    const key = REVERSE_TABLE[k];
                    if (!key) {
                        console.warn(`Unknown key ${k} in minifed payload`);
                        continue;
                    }
                    replacement[key] = v;
                }
                return replacement;
            }
            return value;
        }) as API.TradeSearch;
        return payload;
    } catch (error) {
        console.warn('Failed to parse search payload', error);
        return {};
    }
}

export function stringifySearchPayload(
    payload: API.TradeSearch,
): string {
    const minified = JSON.stringify(payload, (_, value: unknown) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const replacement: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(value)) {
                const key = TABLE[k as keyof typeof TABLE];
                if (!key) {
                    console.warn(`Unknown key ${k} in payload`);
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
