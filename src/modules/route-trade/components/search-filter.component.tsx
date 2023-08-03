import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, Collapse, Divider, Grid } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { SearchFilterAffix } from './search-filter-affix.component';
import { SearchFilterItem } from './search-filter-item.component';
import { SearchFilterSeasonal } from './search-filter-seasonal.component';

const SEASONAL_SERVERS = [Game.ServerType.Seasonal, Game.ServerType.SeasonalHardcore];

const isSeasonalItemType = (type: Game.ItemType) => [Game.ItemType.Amulet, Game.ItemType.Ring].includes(type);

interface SearchFilterProps {
    search: API.TradeSearch;
    onSearch: (search: API.TradeSearch) => void;
    disabled?: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    search: initialSearch,
    onSearch,
    disabled,
}) => {
    const { i18n } = useLingui();

    const [serverType, setServerType] = Common.useRouteServerType();

    const [visible, setVisible] = React.useState<boolean>(true);
    const [search, setSearch] = React.useState<API.TradeSearch>(initialSearch || {});

    React.useEffect(() => {
        if (!initialSearch) return;
        setSearch(initialSearch);
    }, [initialSearch]);

    const {
        query = {},
    } = search;

    React.useEffect(() => {
        if (!SEASONAL_SERVERS.includes(serverType) || !isSeasonalItemType(search.query?.item?.type)) {
            if (search.query?.seasonal) {
                setSearch({
                    ...search,
                    query: { ...search.query, seasonal: undefined },
                });
            }
        }
    }, [search, serverType]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(search);
        setVisible(false);
    };

    const handleClear = () => {
        setSearch({});
        setVisible(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{ p: 2, pt: 0 }}>
                <Collapse in={visible}>
                    <Box pt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12}>
                                        <SearchFilterItem
                                            value={query.item}
                                            onChange={(item) =>
                                                setSearch({
                                                    ...search,
                                                    query: { ...query, item },
                                                })}
                                        />
                                    </Grid>
                                    {SEASONAL_SERVERS.includes(serverType) && isSeasonalItemType(query?.item?.type) && (
                                        <Grid item xs={12}>
                                            <SearchFilterSeasonal
                                                value={query.seasonal}
                                                onChange={(seasonal) =>
                                                    setSearch({
                                                        ...search,
                                                        query: {
                                                            ...query,
                                                            seasonal,
                                                        },
                                                    })}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SearchFilterAffix
                                    value={query.affix}
                                    onChange={(affix) =>
                                        setSearch({
                                            ...search,
                                            query: { ...query, affix },
                                        })}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: { md: 'none' } }}>
                                <Divider />
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
                <Box pt={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                            <Common.ServerTypeInput
                                value={serverType}
                                onChange={setServerType}
                            />
                        </Grid>
                        <Grid md={1} item sx={{ display: { xs: 'none', md: 'block' } }} />
                        <Grid item xs={12} sm={12} md={4}>
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={handleSubmit}
                                startIcon={!disabled ? <SearchIcon /> : undefined}
                                disabled={disabled}
                            >
                                {!disabled ? t(i18n)`Search` : t(i18n)`Searching...`}
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            display='flex'
                            justifyContent='flex-end'
                            sx={(theme) => ({
                                [theme.breakpoints.down('sm')]: {
                                    justifyContent: 'space-between',
                                },
                            })}
                            gap={1}
                        >
                            <Button
                                variant='outlined'
                                onClick={handleClear}
                                startIcon={<RestoreIcon />}
                                disabled={disabled}
                            >
                                {t(i18n)`Clear`}
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => setVisible(!visible)}
                                endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {visible ? t(i18n)`Hide Filters` : t(i18n)`Show Filters`}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </form>
    );
};
