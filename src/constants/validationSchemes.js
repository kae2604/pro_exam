import * as yup from "yup";


export const subscribeEmailScheme = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address")
}).required();

export const userLoginScheme = yup.object({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
}).required();