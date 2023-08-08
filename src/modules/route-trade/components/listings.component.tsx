import { Game } from '@diablosnaps/common';
import { Redux } from '@modules/redux';
import { ListingsDataGrid } from './listings-data-grid.component';

interface ListingsProps {
    onDetailClick: (id: string) => void;
}

export const Listings: React.FC<ListingsProps> = ({
    onDetailClick,
}) => {
    // TODO: use listings query
    const query = Redux.useTradeSearchQuery({
        page: 1,
        pageSize: 30,
        payload: undefined,
        // no server type filter
        serverType: Game.ServerType.Eternal,
    });

    return (
        <ListingsDataGrid
            results={query?.data?.results ?? []}
            onResultClick={onDetailClick}
        />
    );
};
