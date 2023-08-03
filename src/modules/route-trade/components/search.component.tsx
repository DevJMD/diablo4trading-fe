import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { Alert, Snackbar } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { AutoSizer, InfiniteLoader, List, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { SearchResult } from './search-result.component';

const PAGE_SIZE = 10;

function createCacheKey(
    serverType: Game.ServerType,
    payload: string,
    timestamp: number,
): string {
    return `${serverType}-${payload}-${timestamp}`;
}

interface SearchResultsProps {
    serializedPayload: string;
    timestamp: number;
    onTimestampChange: (timestamp: number) => void;
}

export const Search: React.FC<SearchResultsProps> = ({
    serializedPayload: payload,
    timestamp,
    onTimestampChange,
}) => {
    const { i18n } = useLingui();

    const [serverType] = Common.useRouteServerType();

    const [cache, setCache] = React.useState<Record<string, API.TradeGetSearchResponse>>({});
    const [fetch, query] = Redux.useLazyTradeSearchQuery();

    const next = React.useCallback(async (
        serverType: Game.ServerType,
        payload: string,
        page: number,
        timestamp: number,
    ) => {
        const result = await fetch({ serverType, payload, page, pageSize: PAGE_SIZE, timestamp });
        if (result.isSuccess) {
            const cacheKey = createCacheKey(serverType, payload, result.data.timestamp);
            setCache((cache) => {
                const prev = cache[cacheKey]?.results || [];
                const set = new Set(prev.map((x) => x.listing.id));
                const next = result.data.results.filter((x) => !set.has(x.listing.id));
                return {
                    ...cache,
                    [cacheKey]: {
                        results: [...prev, ...next],
                        hasMore: result.data.hasMore,
                        timestamp: result.data.timestamp,
                    },
                };
            });
            return result;
        }
        throw new Error('Unable to fetch search results');
    }, [fetch]);

    const loader = React.useRef<InfiniteLoader>();
    React.useLayoutEffect(() => {
        if (!isNaN(timestamp)) {
            return;
        }
        next(serverType, payload, 1, undefined)
            .then(result => {
                loader.current?.resetLoadMoreRowsCache(true);
                onTimestampChange(result.data.timestamp);
            })
            .catch((error) => {
                console.warn('Unable to fetch search results', error);
            });
    }, [next, payload, serverType, timestamp, onTimestampChange]);

    const key = createCacheKey(serverType, payload, timestamp);
    const { results, hasMore } = cache[key] ?? { results: [], hasMore: true };
    const page = Math.floor(results.length / PAGE_SIZE);
    const rowCount = results.length;

    const handleNextPage = React.useCallback(async () => {
        if (page === 0) return;
        await next(serverType, payload, page + 1, timestamp);
    }, [next, page, payload, serverType, timestamp]);

    return (
        <>
            <InfiniteLoader
                ref={loader}
                isRowLoaded={({ index }) => index < rowCount}
                loadMoreRows={handleNextPage}
                rowCount={hasMore ? rowCount + 1 : rowCount}
                threshold={2}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <WindowScroller>
                                {({ height, onChildScroll, scrollTop }) => (
                                    <List
                                        autoHeight
                                        height={height || 0}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        ref={registerChild}
                                        onRowsRendered={onRowsRendered}
                                        rowRenderer={({ index, key, style }) => {
                                            const result = results[index];
                                            return (
                                                <div key={key} style={style}>
                                                    {result
                                                        ? (
                                                            <SearchResult
                                                                item={result.item}
                                                                listing={result.listing}
                                                            />
                                                        )
                                                        : undefined}
                                                </div>
                                            );
                                        }}
                                        rowCount={rowCount}
                                        overscanRowCount={0}
                                        rowHeight={1056}
                                        width={width}
                                    />
                                )}
                            </WindowScroller>
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
            <Snackbar
                open={query.isError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='error'>
                    {t(i18n)`Unable to fetch search results.`}
                </Alert>
            </Snackbar>
        </>
    );
};
