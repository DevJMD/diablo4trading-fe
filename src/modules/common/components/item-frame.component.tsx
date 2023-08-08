import TooltipCommonBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Common.webp';
import TooltipMagicBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Magic.webp';
import TooltipRareBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Rare.webp';
import TooltipBase from '@assets/game/2DUI_TooltipBase.webp';
import TooltipFrame from '@assets/game/2DUI_TooltipFrame.webp';
import TooltipHeaders from '@assets/game/2DUI_TooltipHeaders.webp';
import TooltipBulletPoint from '@assets/game/2DUIFontIcon/2627966652.webp';
import { Game } from '@diablosnaps/common';
import { styled } from '@mui/material/styles';
import reactStringReplace from 'react-string-replace';
import { GAME_ITEM_TYPE_TOOLTIP_ICONS } from '../constants';
import { useAssets } from '../providers';

function replaceVariables(
    template: string,
    variables: Record<string, string>,
) {
    return template
        .replace(/\{([^}]+)\}/g, (_, key: string) => {
            const value = variables[key.toLocaleLowerCase()];
            return value === undefined ? `{${key}}` : `${value}`;
        });
}

const Tooltip = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 0,
    margin: '16px',
    padding: '28px 24px',
    maxWidth: 340,

    color: theme.palette.item.text,
    fontSize: 20,
    lineHeight: '24px',
    textShadow: '0 0 2px #000',

    borderImage: `url(${TooltipBase}) 76 fill / 38px stretch`,
    '&::after, &::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
    },
    '&::after': {
        borderImage: `url(${TooltipFrame}) 124 / 62px / 12px round`,
    },

    '&::before': {
        zIndex: -1,
        borderImage: `url(${TooltipRareBackground}) 128 fill / 64px stretch`,
    },
    [`&[data-quality="${Game.ItemQuality.Magic}"]`]: {
        '&::before': {
            borderImage: `url(${TooltipMagicBackground}) 128 fill / 64px stretch`,
        },
    },
    [`&[data-quality="${Game.ItemQuality.Common}"]`]: {
        '&::before': {
            borderImage: `url(${TooltipCommonBackground}) 128 fill / 64px stretch`,
        },
    },

    '& ul': {
        margin: 0,
        padding: 16,
        '& li': {
            listStyle: 'none',
            background: `url(${TooltipBulletPoint}) no-repeat 0 12px`,
            backgroundSize: 8,
            paddingLeft: 20,
            margin: '2px 0',
        },
    },
}));

const Icon = styled('div')(() => ({
    position: 'absolute',
    zIndex: 1,
    top: -6,
    right: 12,
    width: 80,
    height: 120,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}));

const TypeLine = styled('div')(({ theme }) => ({
    fontSize: 24,
    lineHeight: '28px',
    color: theme.palette.item.rare,
    paddingRight: 96,
    [`&[data-quality="${Game.ItemQuality.Magic}"]`]: {
        color: theme.palette.item.magic,
    },
    [`&[data-quality="${Game.ItemQuality.Common}"]`]: {
        color: theme.palette.item.common,
    },
}));

const Power = styled('div')(() => ({}));

const Number = styled('span')(({ theme }) => ({
    color: theme.palette.item.number,
}));

const Separator = styled('div')(() => ({
    backgroundImage: `url(${TooltipHeaders})`,
    width: 358,
    maxWidth: '100%',
    height: 10,
    backgroundPositionY: -32,
    margin: '6px auto',
    '&[data-left]': {
        backgroundPositionY: -42,
        marginLeft: 0,
    },
}));

interface ItemTooltipProps {
    item: Game.Item;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({
    item,
}) => {
    const { language, translations, affixes } = useAssets();

    const label = Game.getItemTypeLine(
        item.variant,
        item.quality,
        item.type,
        language,
        translations,
    );

    const highlightNumbers = (text: string) => {
        return reactStringReplace(text, /(\d+)/g, (value, index) => {
            return <Number key={index}>{value}</Number>;
        });
    };

    const itemPower = replaceVariables(translations[language]['UIItemPower'], {
        s1: `${isNaN(item.power) ? 1 : item.power}`,
    }).trim();

    const renderAffixes = (entries: Game.ItemAffix[]) => {
        return (
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        {highlightNumbers(
                            Game.getItemAffixText(
                                entry.id,
                                language,
                                Game.AffixType.Basic,
                                -1,
                                -1,
                                affixes,
                                `${isNaN(entry.value) ? '?' : entry.value}`,
                            ).replace(/\{([^}]+)\}/g, '#'),
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Tooltip data-quality={item.quality}>
            <Icon style={{ backgroundImage: `url(${GAME_ITEM_TYPE_TOOLTIP_ICONS[item.type]}})` }} />
            <TypeLine data-quality={item.quality}>{label}</TypeLine>
            <Power>{highlightNumbers(itemPower)}</Power>
            <Separator data-left />
            {item.inherentAffixes?.length > 0 && (
                <>
                    {renderAffixes(item.inherentAffixes)}
                    <Separator />
                </>
            )}
            {item.affixes?.length > 0 && renderAffixes(item.affixes)}
        </Tooltip>
    );
};
