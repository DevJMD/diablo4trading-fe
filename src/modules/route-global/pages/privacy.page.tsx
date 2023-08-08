import { styled } from '@mui/material/styles';
import { html as content } from './privacy.page.md';

const Content = styled('div')(({ theme }) => ({
    '*': {
        userSelect: 'text',
    },
    'a': {
        color: theme.palette.primary.main,
    },
}));

export const PrivacyPage: React.FC = () => {
    return (
        <Content>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
    );
};
