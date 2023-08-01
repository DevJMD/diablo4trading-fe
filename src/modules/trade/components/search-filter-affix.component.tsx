import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { ItemAffixInput, NumberInput } from './inputs';

const AFFIX_MIN_COUNT = 4;
const AFFIX_MAX_COUNT = 8;

interface SearchFilterAffixProp {
    value: API.AffixFilter;
    onChange: (value: API.AffixFilter) => void;
}

// TODO: support count
// TODO: add new option
export const SearchFilterAffix: React.FC<SearchFilterAffixProp> = ({
    value = {} as API.AffixFilter,
    onChange,
}) => {
    const { i18n } = useLingui();

    const {
        options = []
    } = value;

    const handleOptionChange = (index: number, update: Partial<API.AffixOption>) => {
        const newOptions = [...options];
        newOptions[index] = {
            ...newOptions[index],
            ...update
        };
        onChange({
            ...value,
            options: newOptions
        });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Affixes`}
                </Typography>
                <Divider />
            </Grid>
            {Array
                .from({ length: Math.max(AFFIX_MIN_COUNT, Math.min(options?.length ?? 0, AFFIX_MAX_COUNT)) })
                .map((_, i) => {
                    const option = options[i] || {
                        id: undefined
                    };
                    const placeholder = isNaN(option.minValue) ? '#' : `${option.minValue}`;
                    return (
                        <Grid item xs={12} key={i}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={9}>
                                    <ItemAffixInput
                                        value={option.id}
                                        onChange={id => handleOptionChange(i, { id })}
                                        label={t(i18n)`Affix ${i + 1}`}
                                        placeholder={placeholder}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <NumberInput
                                        value={option.minValue}
                                        onChange={minValue => handleOptionChange(i, { minValue })}
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