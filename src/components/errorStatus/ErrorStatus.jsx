import React from 'react';
import "./errorStatus.scss";

const ErrorStatus = ({ error, refetch }) => {

    console.log("Входящий объект ошибки:", error);

//     let errorMessage = "Произошла неизвестная ошибка";
//
//     if (error?.status >= 400 && error.status <= 499) {
//         errorMessage = "Запрашиваемые данные не найдены (404)";
//     } else if (error?.status >= 500 && error.status <= 599) {
//         errorMessage = "Проблема на стороне сервера (500+)";
//     }
// //     // } else if (error?.status) {
// //     errorMessage = `Ошибка ${error.status}`;
// // }


    const isServerError = error?.status >= 500;

    const message = isServerError
        ? "Прервана связь с сервером. Попробуйте позже."
        : "Ошибка подключения. Проверьте интернет и попробуйте снова.";


    return (
        <div className="error-container">

            <p>Детали: {message}</p>

            <button onClick={refetch}>
                Повторить
            </button>
        </div>
    );
};

export default ErrorStatus;