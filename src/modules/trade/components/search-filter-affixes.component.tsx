import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import { ItemAffixInput, NumberInput } from './inputs';

const AFFIX_COUNT = 4;

interface SearchFilterAffixesProps {
    value: API.AffixFilter[];
    onChange: (value: API.AffixFilter[]) => void;
}

export const SearchFilterAffixes: React.FC<SearchFilterAffixesProps> = ({
    value = [],
    onChange,
}) => {
    const { i18n } = useLingui();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Affixes`}
                </Typography>
                <Divider />
            </Grid>
            {Array
                .from({ length: AFFIX_COUNT })
                .map((_, i) => {
                    const affix = value[i] || {
                        id: undefined
                    };
                    const placeholder = isNaN(affix.minValue) ? '#' : `${affix.minValue}`;
                    return (
                        <Grid item xs={12} key={i}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={9}>
                                    <ItemAffixInput
                                        value={affix.id}
                                        onChange={id => {
                                            const newAffix: API.AffixFilter = { ...affix, id };
                                            const newValue = [...value];
                                            newValue[i] = newAffix;
                                            onChange(newValue);
                                        }}
                                        label={t(i18n)`Affix ${i + 1}`}
                                        placeholder={placeholder}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <NumberInput
                                        value={affix.minValue}
                                        onChange={minValue => {
                                            const newAffix: API.AffixFilter = { ...affix, minValue };
                                            const newValue = [...value];
                                            newValue[i] = newAffix;
                                            onChange(newValue);
                                        }}
                                        min={0}
                                        label={t(i18n)`Value`}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
        </Grid>
    )
}