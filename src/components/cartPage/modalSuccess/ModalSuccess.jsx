import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, Typography, Box } from '@mui/material';

const ModalSuccess = ({ openSuccessModal }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (openSuccessModal) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [openSuccessModal, navigate]);

    return (
        <Dialog
            open={openSuccessModal}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                },
            }}
        >
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2
                }}>
                    <Box sx={{ fontSize: '60px', mb: 1 }}>✅</Box>

                    <Typography variant="h5" fontWeight="bold">
                        Order Placed Successfully!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        Thank you for your purchase. <br />
                        You will be redirected to the home page in a moment.
                    </Typography>

                    <Box sx={{
                        width: '100%',
                        height: '4px',
                        bgcolor: '#e0e0e0',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2px'
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: '100%',
                            bgcolor: '#4caf50',
                            animation: 'progress 3s linear forwards'
                        }} />
                    </Box>
                </Box>
            </DialogContent>
            <style>
                {`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                `}
            </style>
        </Dialog>
    );
};
export default ModalSuccess;