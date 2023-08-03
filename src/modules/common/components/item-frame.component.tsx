import TooltipCommonBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Common.webp';
import TooltipMagicBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Magic.webp';
import TooltipRareBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Rare.webp';
import TooltipBase from '@assets/game/2DUI_TooltipBase.webp';
import TooltipFrame from '@assets/game/2DUI_TooltipFrame.webp';
import TooltipHeaders from '@assets/game/2DUI_TooltipHeaders.webp';
import TooltipItemAmulet from '@assets/game/2DUI_TooltipItem_Amulet.webp';
import TooltipItemAxe from '@assets/game/2DUI_TooltipItem_Axe.webp';
import TooltipItemBoots from '@assets/game/2DUI_TooltipItem_Boots.webp';
import TooltipItemBow from '@assets/game/2DUI_TooltipItem_Bow.webp';
import TooltipItemChestArmor from '@assets/game/2DUI_TooltipItem_ChestArmor.webp';
import {
    default as TooltipItemCrossbow,
    default as TooltipItemCrossbow2H,
} from '@assets/game/2DUI_TooltipItem_Crossbow.webp';
import TooltipItemDagger from '@assets/game/2DUI_TooltipItem_Dagger.webp';
import TooltipItemFocus from '@assets/game/2DUI_TooltipItem_Focus.webp';
import TooltipItemGloves from '@assets/game/2DUI_TooltipItem_Gloves.webp';
import TooltipItemHelm from '@assets/game/2DUI_TooltipItem_Helm.webp';
import TooltipItemMace from '@assets/game/2DUI_TooltipItem_Mace.webp';
import TooltipItemLegs from '@assets/game/2DUI_TooltipItem_Pants.webp';
import TooltipItemPolearm from '@assets/game/2DUI_TooltipItem_Polearm.webp';
import TooltipItemRing from '@assets/game/2DUI_TooltipItem_Ring.webp';
import TooltipItemScythe from '@assets/game/2DUI_TooltipItem_Scythe.webp';
import TooltipItemShield from '@assets/game/2DUI_TooltipItem_Shield.webp';
import TooltipItemStaff from '@assets/game/2DUI_TooltipItem_Staff.webp';
import TooltipItemSword from '@assets/game/2DUI_TooltipItem_Sword.webp';
import TooltipItemAxe2H from '@assets/game/2DUI_TooltipItem_TwoHandedAxe.webp';
import TooltipItemMace2H from '@assets/game/2DUI_TooltipItem_TwoHandedMace.webp';
import TooltipItemScythe2H from '@assets/game/2DUI_TooltipItem_TwoHandedScythe.webp';
import TooltipItemSword2H from '@assets/game/2DUI_TooltipItem_TwoHandedSword.webp';
import TooltipItemWand from '@assets/game/2DUI_TooltipItem_Wand.webp';
import TooltipBulletPoint from '@assets/game/2DUIFontIcon/2627966652.webp';
import { Game } from '@diablosnaps/common';
import { styled } from '@mui/material/styles';
import reactStringReplace from 'react-string-replace';
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

const Tooltip = styled('div')(() => ({
    position: 'relative',
    zIndex: 0,
    margin: '16px',
    padding: '28px 24px',
    maxWidth: 340,

    color: '#bfbfbf',
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
    [`&[data-type="${Game.ItemType.Axe}"]`]: { backgroundImage: `url(${TooltipItemAxe})` },
    [`&[data-type="${Game.ItemType.Axe2H}"]`]: { backgroundImage: `url(${TooltipItemAxe2H})` },
    [`&[data-type="${Game.ItemType.Bow}"]`]: { backgroundImage: `url(${TooltipItemBow})` },
    [`&[data-type="${Game.ItemType.Crossbow}"]`]: { backgroundImage: `url(${TooltipItemCrossbow})` },
    [`&[data-type="${Game.ItemType.Crossbow2H}"]`]: { backgroundImage: `url(${TooltipItemCrossbow2H})` },
    [`&[data-type="${Game.ItemType.Dagger}"]`]: { backgroundImage: `url(${TooltipItemDagger})` },
    [`&[data-type="${Game.ItemType.Focus}"]`]: { backgroundImage: `url(${TooltipItemFocus})` },
    [`&[data-type="${Game.ItemType.Mace}"]`]: { backgroundImage: `url(${TooltipItemMace})` },
    [`&[data-type="${Game.ItemType.Mace2H}"]`]: { backgroundImage: `url(${TooltipItemMace2H})` },
    [`&[data-type="${Game.ItemType.Scythe}"]`]: { backgroundImage: `url(${TooltipItemScythe})` },
    [`&[data-type="${Game.ItemType.Scythe2H}"]`]: { backgroundImage: `url(${TooltipItemScythe2H})` },
    [`&[data-type="${Game.ItemType.Staff}"]`]: { backgroundImage: `url(${TooltipItemStaff})` },
    [`&[data-type="${Game.ItemType.Sword}"]`]: { backgroundImage: `url(${TooltipItemSword})` },
    [`&[data-type="${Game.ItemType.Sword2H}"]`]: { backgroundImage: `url(${TooltipItemSword2H})` },
    [`&[data-type="${Game.ItemType.Polearm}"]`]: { backgroundImage: `url(${TooltipItemPolearm})` },
    [`&[data-type="${Game.ItemType.Wand}"]`]: { backgroundImage: `url(${TooltipItemWand})` },
    [`&[data-type="${Game.ItemType.Amulet}"]`]: { backgroundImage: `url(${TooltipItemAmulet})` },
    [`&[data-type="${Game.ItemType.Boots}"]`]: { backgroundImage: `url(${TooltipItemBoots})` },
    [`&[data-type="${Game.ItemType.ChestArmor}"]`]: { backgroundImage: `url(${TooltipItemChestArmor})` },
    [`&[data-type="${Game.ItemType.Gloves}"]`]: { backgroundImage: `url(${TooltipItemGloves})` },
    [`&[data-type="${Game.ItemType.Helm}"]`]: { backgroundImage: `url(${TooltipItemHelm})` },
    [`&[data-type="${Game.ItemType.Legs}"]`]: { backgroundImage: `url(${TooltipItemLegs})` },
    [`&[data-type="${Game.ItemType.Ring}"]`]: { backgroundImage: `url(${TooltipItemRing})` },
    [`&[data-type="${Game.ItemType.Shield}"]`]: { backgroundImage: `url(${TooltipItemShield})` },
}));

const TypeLine = styled('div')(() => ({
    fontSize: 24,
    lineHeight: '28px',
    color: '#ffff00',
    paddingRight: 96,
    [`&[data-quality="${Game.ItemQuality.Magic}"]`]: {
        color: '#ababf8',
    },
    [`&[data-quality="${Game.ItemQuality.Common}"]`]: {
        color: '#ffffff',
    },
}));

const Power = styled('div')(() => ({}));

const Number = styled('span')(() => ({
    color: '#ffffff',
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
            <Icon data-type={item.type} />
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
