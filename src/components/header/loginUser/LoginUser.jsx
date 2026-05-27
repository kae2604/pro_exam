import React, {useEffect, useState} from 'react';
import "./loginUser.scss";
import login from "@assets/pictures/header/login.svg";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide,
    Box, TextField, FormControl, Input, InputLabel, InputAdornment, IconButton, FormHelperText, Typography, Avatar
} from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff, Lock, Logout } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginScheme } from "@constants/validationSchemes.js";
import { useLoginUserMutation } from "@store/api/commonAPI.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const LoginUser = () => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user') || "{}"));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(userLoginScheme),
        defaultValues: { username: "", password: "" },
        mode: "onTouched"
    });

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const result = await loginUser(data).unwrap();
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('user', JSON.stringify(result));
            setUserData(result);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setIsLoggedIn(true);
            }, 2000);
        } catch (err) {
            console.error("Login failed:", err);
            setServerError(err?.data?.message || "Invalid username or password.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData({});
        setOpen(false);
        reset();
    };

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        if (isLoading) return;
        setOpen(false);
        setServerError("");
        reset();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    useEffect(() => {
        const handleOpenLogin = () => setOpen(true);
        window.addEventListener('open-login', handleOpenLogin);
        return () => window.removeEventListener('open-login', handleOpenLogin);
    }, []);

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClickOpen}
                size="small"
                sx={{
                    p: 0, ml: '14px', width: '24px', height: '24px',
                    minWidth: 'unset', minHeight: 'unset',
                    '& .MuiTouchRipple-root': { width: '24px', height: '24px' }
                }}
            >
                <img className="header_icon_login" src={login} alt="Icon of login" />
            </IconButton>

            <Dialog
                open={open}
                slots={{ transition: Transition }}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                {showSuccessMessage ? (
                    <DialogContent sx={{ textAlign: 'center', py: 5 }}>
                        <Typography variant="h5" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                            You are successfully logged in!
                        </Typography>
                    </DialogContent>
                ) : isLoggedIn ? (
                    <>
                        <DialogTitle>My Account</DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 1 }}>
                                <Avatar src={userData.image} sx={{ width: 80, height: 80 }} />
                                <Typography variant="h6">{userData.firstName} {userData.lastName}</Typography>
                                <Typography variant="body2" color="text.secondary">{userData.email}</Typography>
                                <Typography variant="caption" sx={{ mt: 1 }}>Username: {userData.username}</Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleLogout} color="error" startIcon={<Logout />}>
                                Log Out
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <DialogTitle>Authorization</DialogTitle>
                        <DialogContent>
                            {serverError && (
                                <FormHelperText error sx={{ mb: 2, textAlign: 'center', fontSize: '16px', fontWeight: '700' }}>
                                    {serverError}
                                </FormHelperText>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    label="User name" variant="standard" fullWidth
                                    {...register("username")}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username?.message}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" fullWidth error={Boolean(errors.password)}>
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} disabled={isLoading}>Close</Button>
                            <Button type="submit" variant="contained" disableElevation disabled={isLoading}>
                                {isLoading ? "Processing..." : "Enter"}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Dialog>
        </React.Fragment>
    );
}
export default LoginUser;