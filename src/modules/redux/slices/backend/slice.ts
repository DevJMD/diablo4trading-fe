import { API_ENDPOINT } from '@config';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API } from '@sanctuaryteam/shared';
import { AuthSelectors } from '../auth/selectors';
import { AuthSlice } from '../auth/slice';
import { RootState } from '../root';

const baseQuery = fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = AuthSelectors.getToken(state);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        api.dispatch(AuthSlice.actions.logout());
    }
    return result;
};

export const BackendSlice = createApi({
    reducerPath: 'backend',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // auth
        authDiscordCallback: builder.query<API.AuthCallbackResponse, API.AuthCallbackParams>({
            query: ({ code }) => ({
                url: '/auth/discord/callback',
                method: 'GET',
                params: { code },
            }),
        }),

        // trade
        tradeGetSearch: builder.query<API.TradeSearchGetResponse, API.TradeSearchGetParams>({
            query: ({ searchId }) => ({
                url: `/trade/search/${searchId}`,
                method: 'GET',
            }),
        }),
        tradeCreateSearch: builder.mutation<API.TradeSearchCreateResponse, API.TradeSearchCreateBody>({
            query: (body) => ({
                url: '/trade/search',
                method: 'POST',
                body,
            }),
        }),
        tradeFetch: builder.query<API.TradeFetchGetResponse, API.TradeFetchGetQuery>({
            query: ({ serverType, searchId, timestamp, page }) => ({
                url: '/trade/fetch',
                method: 'GET',
                params: { serverType, searchId, timestamp, page },
            }),
        }),
    }),
});

export const {
    // auth
    useAuthDiscordCallbackQuery,

    // trade
    useTradeGetSearchQuery,
    useLazyTradeGetSearchQuery,
    useTradeCreateSearchMutation,
    useTradeFetchQuery,
    useLazyTradeFetchQuery,
} = BackendSlice;
