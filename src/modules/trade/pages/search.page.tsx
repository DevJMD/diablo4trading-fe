import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchFilter } from '../components';
import { parseSearchRequest, stringifySearchRequest } from '../utils';

const PARAM_REQUEST = 'r';

export const SearchPage: React.FC = (

) => {
    const [params, setParams] = useSearchParams();

    const stringifiedRequest = params.get(PARAM_REQUEST);

    const request = React.useMemo(() => {
        return parseSearchRequest(stringifiedRequest);
    }, [stringifiedRequest]);
    const setRequest = React.useCallback((request: API.SearchRequest) => {
        setParams({
            [PARAM_REQUEST]: stringifySearchRequest(request)
        });
    }, [setParams]);

    const handleSearch = React.useCallback((request: API.SearchRequest) => {
        setRequest(request);
    }, [setRequest]);

    return (
        <React.Fragment>
            <SearchFilter
                request={request}
                onSearch={handleSearch}
            />
        </React.Fragment>
    );
}