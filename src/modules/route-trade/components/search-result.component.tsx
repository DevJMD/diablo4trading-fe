import { Game } from '@diablosnaps/common';
import { API } from '@sanctuaryteam/shared';

interface SearchResultProps {
    item: Game.Item;
    listing: API.TradeListing;
}

export const SearchResult: React.FC<SearchResultProps> = ({
    item,
    listing,
}) => {
    // TODO;
    return (
        <pre>
            {JSON.stringify({ item, listing }, null, 2)}
        </pre>
    );
};
