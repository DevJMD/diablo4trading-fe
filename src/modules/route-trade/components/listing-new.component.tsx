import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Box, Button, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { ListingNewImport } from './listing-new-1_import.component';
import { ListingNewParams } from './listing-new-2_params.component';
import { isListingNewParamsFormValid } from './listing-new-2_params.helper';
import { ListingNewParamsFormValue } from './listing-new-2_params.types';
import { ListingNewItem } from './listing-new-3_item.component';
import { isListingNewItemFormValid } from './listing-new-3_item.helper';
import { ListingNewItemFormValue } from './listing-new-3_item.types';

const Image = styled('div')(({ theme }) => ({
    height: '100%',
    minHeight: 384,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
}));

enum Step {
    Import,
    Params,
    Item,
    Listing,
}

const STEP_ORDER = [
    Step.Import,
    Step.Params,
    Step.Item,
    Step.Listing,
];

interface ListingNewProps {
    onCancel: () => void;
}

export const ListingNew: React.FC<ListingNewProps> = ({
    onCancel,
}) => {
    const { i18n } = useLingui();

    // const language = useSelector(Redux.UserSelectors.getLanguage);
    // const serverType = useSelector(Redux.UserSelectors.getServerType);

    const [step, setStep] = React.useState(Step.Import);
    const [loading, setLoading] = React.useState(false);

    const [image, setImage] = React.useState('');

    const [paramsForm, setParamsForm] = React.useState<ListingNewParamsFormValue>({});
    const [itemForm, setItemForm] = React.useState<ListingNewItemFormValue>({});

    const handleImageImport = (image: string) => {
        setImage(image);
        // TODO: could set language and server type based on last context
        setStep(Step.Params);
    };

    const handleItemImport = (image: string, item: Game.Item) => {
        setImage(image);
        // TODO: could set server type based on last context
        setParamsForm({ language: item.language });
        setItemForm({
            variant: item.variant,
            quality: item.quality,
            type: item.type,
            power: item.power,
            requiredLevel: item.requiredLevel,
            classRestriction: item.classRestriction,
            inherentAffixes: item.inherentAffixes?.map((affix) => ({ id: affix.id })),
            affixes: item.affixes?.map((affix) => ({ id: affix.id })),
            socketType: item.socketType,
        });
        setStep(Step.Params);
    };

    const handleNext = () => {
        if (step === Step.Params) {
            // TODO: call ocr
            setLoading(true);
            window.setTimeout(() => {
                setLoading(false);
                setStep(Step.Item);
            }, 1000 * 3);
        } else {
            const stepIndex = STEP_ORDER.indexOf(step);
            const nextStep = STEP_ORDER[stepIndex + 1];
            setStep(nextStep);
        }
    };

    const isValid = (() => {
        switch (step) {
            case Step.Import:
                return undefined;
            case Step.Params:
                return isListingNewParamsFormValid(paramsForm);
            case Step.Item:
                return isListingNewItemFormValid(itemForm, paramsForm.serverType);
            case Step.Listing:
                return true;
        }
    })();

    const hasImage = image.length > 0 && step !== Step.Params;
    return (
        <Grid height='100%' container>
            {hasImage && (
                <Grid xs={12} md={4} item>
                    <Image style={{ backgroundImage: `url(${image})` }} />
                </Grid>
            )}
            <Grid xs={12} md={hasImage ? 8 : 12} item>
                {loading
                    ? (
                        <Box
                            height='100%'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Common.Spinner />
                        </Box>
                    )
                    : (
                        <Box height='100%' p={2}>
                            <Stack height='100%' gap={1}>
                                <Box height='100%'>
                                    {step === Step.Import && (
                                        <ListingNewImport
                                            onImageImport={handleImageImport}
                                            onItemImport={handleItemImport}
                                        />
                                    )}
                                    {step === Step.Params && (
                                        <ListingNewParams
                                            value={paramsForm}
                                            onChange={setParamsForm}
                                        />
                                    )}
                                    {step === Step.Item && (
                                        <ListingNewItem
                                            value={itemForm}
                                            onChange={setItemForm}
                                            serverType={paramsForm.serverType}
                                        />
                                    )}
                                </Box>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Button
                                        onClick={onCancel}
                                        color='secondary'
                                    >
                                        {t(i18n)`Cancel`}
                                    </Button>
                                    {typeof isValid === 'boolean' && (
                                        <Button
                                            onClick={handleNext}
                                            disabled={!isValid}
                                            variant='contained'
                                        >
                                            {t(i18n)`Next`}
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Box>
                    )}
            </Grid>
        </Grid>
    );
};
