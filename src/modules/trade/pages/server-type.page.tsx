import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Common } from '../../common';
import { useAssets } from '../providers';

const ServerTypeIcon = styled('img')(() => ({
    width: 24,
    height: 24,
}));

interface ServerTypePageProps {
    onChange: (serverType: Game.ServerType) => void;
}

export const ServerTypePage: React.FC<ServerTypePageProps> = ({
    onChange
}) => {
    const { i18n } = useLingui();
    const { language, translations } = useAssets();
    return (
        <Common.FloatingPanel>
            <Card sx={{ width: 288, padding: 2 }}>
                <Typography
                    variant='h6'
                >
                    {t(i18n)`Select your server`}
                </Typography>
                <Stack gap={1}>
                    {Object
                        .values(Game.ServerType)
                        .map((serverType) => (
                            <Button
                                key={serverType}
                                startIcon={<ServerTypeIcon
                                    src={Common.GAME_SERVER_TYPE_ICONS[serverType]}
                                    alt={t(i18n)`${Game.getServerTypeText(serverType, language, translations)}'s icon`}
                                />}
                                onClick={() => onChange(serverType)}
                                sx={{ textAlign: 'left' }}
                            >
                                <Typography variant='subtitle1' component='div' width='100%'>
                                    {Game.getServerTypeText(serverType, language, translations)}
                                    <Typography variant='body2' color='textSecondary' textTransform='none'>
                                        {serverType === Game.ServerType.Eternal && t(i18n)`The main server.`}
                                        {serverType === Game.ServerType.Hardcore && t(i18n)`The main hardcore server.`}
                                        {serverType === Game.ServerType.Seasonal && t(i18n)`The seasonal server.`}
                                        {serverType === Game.ServerType.SeasonalHardcore && t(i18n)`The seasonal hardcore server.`}
                                    </Typography>
                                </Typography>
                            </Button>
                        ))
                    }
                </Stack>
            </Card>
        </Common.FloatingPanel>
    );
}