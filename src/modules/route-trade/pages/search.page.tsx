import { Redux } from '@modules/redux';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchFilter, SearchResults } from '../components';

const PARAM_SEARCH_ID = 's';

export const SearchPage: React.FC = () => {
    const [params, setParams] = useSearchParams();

    const searchId = params.get(PARAM_SEARCH_ID);

    const [createSearch, createSearchResult] = Redux.useTradeCreateSearchMutation();
    const createdSearchId = createSearchResult.data?.searchId;

    const search = Redux.useTradeGetSearchQuery({ searchId }, {
        skip: !searchId || createdSearchId === searchId,
    });

    React.useEffect(() => {
        if (search.isError) {
            setParams({});
        }
    }, [search, setParams]);

    React.useEffect(() => {
        if (createSearchResult.isError) {
            setParams({});
        } else if (createSearchResult.isSuccess) {
            setParams({ [PARAM_SEARCH_ID]: createSearchResult.data.searchId });
        }
    }, [createSearchResult, setParams]);

    const handleSearch = (search: API.TradeSearch) => {
        void createSearch(search);
    };

    return (
        <React.Fragment>
            <SearchFilter
                search={search.data}
                onSearch={handleSearch}
                disabled={search.isFetching || createSearchResult.isLoading}
            />
            {searchId?.length > 0 && (
                <SearchResults
                    searchId={searchId}
                    timestamp={1}
                />
            )}
        </React.Fragment>
    );
};
