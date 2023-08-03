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

const PAGE_SIZE = 10;

function createCacheKey(
    serverType: Game.ServerType,
    searchId: string,
    timestamp: number,
): string {
    return `${serverType}-${searchId}-${timestamp}`;
}

interface SearchResultsProps {
    searchId: string;
    timestamp: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
    searchId,
    timestamp,
}) => {
    const { i18n } = useLingui();

    const [serverType] = Common.useRouteServerType();

    const [cache, setCache] = React.useState<Record<string, API.TradeFetchGetResponse>>({});
    const [fetch, query] = Redux.useLazyTradeFetchQuery();

    const next = React.useCallback(async (
        serverType: Game.ServerType,
        searchId: string,
        page: number,
        timestamp: number,
    ) => {
        const result = await fetch({ serverType, searchId, page, timestamp });
        if (result.isSuccess) {
            const cacheKey = createCacheKey(serverType, searchId, timestamp);
            setCache((cache) => {
                const prev = cache[cacheKey]?.results || [];
                const set = new Set(prev.map((x) => x.listing.id));
                const next = result.data.results.filter((x) => !set.has(x.listing.id));
                return {
                    ...cache,
                    [cacheKey]: {
                        results: [...prev, ...next],
                        hasMore: result.data.hasMore,
                    },
                };
            });
        }
    }, [fetch]);

    const loader = React.useRef<InfiniteLoader>();
    React.useLayoutEffect(() => {
        next(serverType, searchId, 1, timestamp)
            .then(() => {
                loader.current?.resetLoadMoreRowsCache(true);
            })
            .catch((error) => {
                console.warn('Unable to fetch search results', error);
            });
    }, [next, searchId, serverType, timestamp]);

    const key = createCacheKey(serverType, searchId, timestamp);
    const { results, hasMore } = cache[key] ?? { results: [], hasMore: true };
    const page = Math.floor(results.length / PAGE_SIZE);
    const rowCount = results.length;

    const handleNextPage = React.useCallback(async () => {
        await next(serverType, searchId, page + 1, timestamp);
    }, [next, page, searchId, serverType, timestamp]);

    return (
        <>
            <InfiniteLoader
                ref={loader}
                isRowLoaded={({ index }) => index < rowCount}
                loadMoreRows={handleNextPage}
                rowCount={hasMore ? rowCount + 1 : rowCount}
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
                                        rowRenderer={({ index, key, style }) => (
                                            <div key={key} style={style}>
                                                <pre>
                                                    {JSON.stringify(results[index].item, undefined, 2)}
                                                </pre>
                                            </div>
                                        )}
                                        rowCount={rowCount}
                                        rowHeight={888}
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
