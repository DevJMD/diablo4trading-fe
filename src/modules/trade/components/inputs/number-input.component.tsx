import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

const toString = (value: number) => value === undefined ? '' : value.toString();

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
    value,
    onChange,
    label,
    placeholder,
    min,
    max,
    disabled,
}) => {
    const [textValue, setTextValue] = React.useState<string>(toString(value));
    useEffect(() => {
        setTextValue(toString(value));
    }, [value])
    return (
        <TextField
            value={textValue}
            label={label}
            placeholder={placeholder}
            onChange={e => setTextValue(e.target.value)}
            onBlur={() => {
                const numericValue = parseInt(textValue)
                if (isNaN(numericValue)) {
                    onChange(undefined);
                    return;
                }
                if (min !== undefined && numericValue < min) {
                    onChange(min);
                    return;
                }
                if (max !== undefined && numericValue > max) {
                    onChange(max);
                    return;
                }
                onChange(numericValue);
            }}
            disabled={disabled}
        />
    )
}