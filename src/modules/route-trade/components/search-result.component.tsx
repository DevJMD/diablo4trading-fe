import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

const Root = styled('div')(({ theme }) => ({
    paddingBottom: theme.spacing(1),
}));

interface SearchResultProps {
    item: Game.Item;
    listing: API.TradeListing;
}

export const SearchResult: React.FC<SearchResultProps> = ({
    item,
}) => {
    return (
        <Root>
            <Card>
                <Common.ItemTooltip item={item} />
            </Card>
        </Root>
    );
};
