import React, { useState } from 'react';
import "./loginUser.scss";
import login from "@assets/header/login.svg";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide,
    Box, TextField, FormControl, Input, InputLabel, InputAdornment, IconButton, FormHelperText, Typography
} from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff, Lock } from '@mui/icons-material';
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
    const [serverError, setServerError] = useState(""); // Стейт для ошибок сервера
    const [isSuccess, setIsSuccess] = useState(false);   // Стейт для успешного входа

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(userLoginScheme),
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onTouched"
    });

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const onSubmit = async (data) => {
        setServerError(""); // Сбрасываем прошлую ошибку перед новым запросом
        try {
            // Отправляем данные на сервер
            await loginUser(data).unwrap();

            setIsSuccess(true); // Включаем режим успеха (покажет фразу на английском)

            // Ровно через 2 секунды закрываем окно и очищаем форму
            setTimeout(() => {
                setOpen(false);
                setIsSuccess(false);
                reset();
            }, 2000);

        } catch (err) {
            console.error("Login failed:", err);
            // Записываем ошибку, которую прислал сервер (или дефолтную)
            setServerError(err?.data?.message || "Invalid username or password. Please try again.");
        }
    };

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        if (isLoading || isSuccess) return; // Запрещаем закрывать модалку в процессе отправки или успеха
        setOpen(false);
        setServerError("");
        reset();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClickOpen}
                size="small"
                sx={{
                    p: 0,
                    ml: '14px',
                    width: '24px',
                    height: '24px',
                    minWidth: 'unset',
                    minHeight: 'unset',
                    '& .MuiTouchRipple-root': {
                        width: '24px',
                        height: '24px'
                    }
                }}
            >
                <img className="header_icon_login"  src={login} alt="Icon of login" />
            </IconButton>

            <Dialog
                open={open}
                slots={{ transition: Transition }}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {!isSuccess && (
                    <DialogTitle>{"Authorization"}</DialogTitle>
                        )}

                    <DialogContent>
                        {isSuccess ? (
                            /* Если вход успешный — показываем только эту фразу */
                            <Box sx={{ textAlign: 'center', py: 3, textColor: 'green' }}>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    sx={{ color: 'success.main' }} // Перенесли цвет внутрь sx
                                >
                                    You are successfully logged in!
                                </Typography>
                            </Box>
                        ) : (
                            /* Если еще не вошли — показываем форму */
                            <>
                                {/* Красный блок для вывода ошибок сервера */}
                                {serverError && (
                                    <FormHelperText error sx={{ mb: 2, textAlign: 'center', fontSize: '24px', fontWeight: '700' }}>
                                        {serverError}
                                    </FormHelperText>
                                )}

                                {/* 1. ПОЛЕ ЛОГИНА */}
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3, mt: 1 }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        id="login-username"
                                        label="User name"
                                        variant="standard"
                                        fullWidth
                                        {...register("username")}
                                        error={Boolean(errors.username)}
                                        helperText={errors.username?.message}
                                    />
                                </Box>

                                {/* 2. ПОЛЕ ПАРОЛЯ */}
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                    <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl variant="standard" fullWidth error={Boolean(errors.password)}>
                                        <InputLabel htmlFor="login-password">Password</InputLabel>
                                        <Input
                                            id="login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...register("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {errors.password && (
                                            <FormHelperText>{errors.password.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </>
                        )}
                    </DialogContent>

                    {/* Прячем нижние кнопки, если вход уже выполнен успешно */}
                    {!isSuccess && (
                        <DialogActions>
                            <Button onClick={handleClose} disabled={isLoading}>
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disableElevation
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Enter"}
                            </Button>
                        </DialogActions>
                    )}
                </form>
            </Dialog>
        </React.Fragment>
    );
}

export default LoginUser;