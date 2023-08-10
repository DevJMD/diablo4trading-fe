
import { useLingui } from '@lingui/react';
import React from 'react';
import { t } from '@lingui/macro';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Box, Button,InputLabel, MenuItem, TextareaAutosize, Modal, Select, Typography } from '@mui/material';


export enum ReportType {
    Service,
    Item,
}

interface ReportDialogProps {
    reportType: ReportType
}

export const ReportDialog: React.FC<ReportDialogProps> = () => {
    const { i18n } = useLingui();
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedReason, setSelectedReason] = React.useState<string>('');

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleDialogClose = () => {
        setOpen(false);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // onReport(payload);
    };


    const reportReasons = React.useMemo(() => {
        return [
            t(i18n)`Bids not honored`,
            t(i18n)`Alt/friend used for manipulation`,
            t(i18n)`Scam (withholding gold/services)`,
            t(i18n)`Exploit sales (bugged sigils, etc)`,
            t(i18n)`RMT (Real Money Trading)`,
            t(i18n)`Sales outside of application (Direct Messages/etc)`,
            t(i18n)`Editing bids after posting`,
            t(i18n)`Other`,
        ];
    }, []);

    return (
        <div>
            <Button
                onClick={() => setOpen(prev => !prev)}
                color='error'
                variant='outlined'
                startIcon={<ReportGmailerrorredIcon />}
                sx={{ ml: 1 }}
            >
                {t(i18n)`Report`}
            </Button>
            <Modal
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {t(i18n)`Report`}
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {t(i18n)`Report any user that's breaking the Terms of Service of this web page.`}
                        </Typography>
                        <Box sx={{ mt: 2}}>
                            <InputLabel id="select-label">{t(i18n)`Select Reason for Report`}</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={selectedReason}
                                onChange={handleReasonChange}
                                fullWidth={true}
                            >
                                {reportReasons.map((r, i) => {
                                    return <MenuItem key={i} value={i}>{r}</MenuItem>
                                })}
                            </Select>
                        </Box>
                        <Box sx={{ mt: 2}}>
                            <InputLabel id="textarea-label">{t(i18n)`Additional information`}</InputLabel>
                            <TextareaAutosize
                                style={{width: '100%'}}
                                minRows={8}
                                placeholder={t(i18n)`Any additional information that would allow us to take a deciscion faster.`}
                                aria-labelledby='textarea-label' 
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button onClick={handleDialogClose}>Close</Button>
                            <Button onClick={handleSubmit} type='submit'>Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}