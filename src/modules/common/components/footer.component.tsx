import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { APP_NAME } from '../constants';

const Root = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    textAlign: 'center',
    padding: theme.spacing(2, 0)
}))

export const FOOTER_HEIGHT = 104;

export const Footer: React.FC = (

) => {
    const { i18n } = useLingui();

    const year = new Date().getFullYear();

    return (
        <Root>
            <Typography variant='body2' fontFamily='monospace'>
                {t(i18n)`This app isn't affiliated with or endorsed by Blizzard in any way.`}
            </Typography>
            <Typography variant='body2' fontFamily='monospace'>
                {t(i18n)`© ${APP_NAME} ${year}. All rights reserved.`}
            </Typography>
            <Stack
                mt={1}
                direction='row'
                justifyContent='center'
                spacing={1}
            >
                <Link href='https://www.reddit.com/r/Diablo4'>
                    r/diablo4
                </Link>
                <Link href='https://discord.gg/Diablo4'>
                    gg/diablo4
                </Link>
            </Stack>
        </Root>
    )
}