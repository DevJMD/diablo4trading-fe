import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate, useResolvedPath } from 'react-router';
import { matchPath, useMatches } from 'react-router-dom';
import { Common } from '../../common';
import { useAssets, useServerType } from '../providers';

const ServerTypeIcon = styled('img')(() => ({
    width: 48,
    height: 48,
}));

interface MasterLayoutProps {
    children?: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
    children
}) => {
    const { i18n } = useLingui();

    const serverType = useServerType();
    const { language, translations } = useAssets();

    const navigate = useNavigate();

    const matches = useMatches();
    const searchPath = useResolvedPath('./search');
    const listingsPath = useResolvedPath('./listings');

    const paths = [
        searchPath,
        listingsPath
    ];

    const tabValue = Math.max(0, paths.findIndex(p => {
        const match = matchPath({
            path: p.pathname,
            end: false
        }, matches[matches.length - 1].pathname);
        return match !== null;
    }));
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        navigate(paths[newValue]);
    };

    return (
        <>
            <Box
                pt={2}
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <ServerTypeIcon
                    src={Common.GAME_SERVER_TYPE_ICONS[serverType]}
                    alt={t(i18n)`${Game.getServerTypeText(serverType, language, translations)}'s icon`}
                />
                <Typography variant='h4' component='h1'>
                    {Game.getServerTypeText(serverType, language, translations)}
                </Typography>
            </Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
            >
                <Tab label={t(i18n)`Search for items`} />
                <Tab label={t(i18n)`My Listings`} />
            </Tabs>
            <Box pt={1} pb={2}>
                {children}
            </Box>
        </>
    )
}