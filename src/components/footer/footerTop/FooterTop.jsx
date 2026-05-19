import React, {useEffect, useState} from 'react';
import "./footerTop.scss";
import mailIcon from "@assets/footer/mailIcon.svg";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendLetterMutation } from "@store/api/commonAPI.js";
import {subscribeEmailScheme} from "@constants/validationSchemes.js"

const FooterTop = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(subscribeEmailScheme),
        defaultValues: {
            email: ""
        }
    });

    const [openModal, setOpenModal] = useState(false);
    const [sendLetter, { data: confirmed, isLoading }] = useSendLetterMutation();

    const onSubmit =  async (data) => {
        try {
            await sendLetter(data.email).unwrap();
            setOpenModal(true);
            reset();
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleCloseModal = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenModal(false);
    };

    useEffect(() => {
        if (errors.email) {
            reset({ email: "" },
                { keepErrors: true });
        }
    }, [errors.email, reset]);

    return (
        <div className="footer_top">
            <h3>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h3>
            <div className="footer_top_right">
                <form className="footer_form"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate >
                    <div className="footer_input_wrapper">
                        <img src={mailIcon} alt="Icon of mail"/>
                        <input type="email"
                               className={errors.email ? "footer_input_error" : ""}
                               placeholder={errors.email ? errors.email.message : "Enter your email address"}
                               {...register("email")}
                        />
                    </div>
                    <Button type="submit"
                            disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Subscribe to Newsletter"}
                    </Button>
                </form>
            </div>
            <Snackbar
                open={openModal}
                autoHideDuration={2000}
                onClose={handleCloseModal}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseModal}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Thanks for subscribing!
                </Alert>
            </Snackbar>
        </div>
    );
};
export default FooterTop;