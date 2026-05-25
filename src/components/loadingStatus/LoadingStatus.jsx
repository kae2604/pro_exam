import React from 'react';
import {LinearProgress} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const LoadingStatus = ({ isLoading, error, data, children}) => {
    if (isLoading) {
        return (
            <div className="loading_skeleton">
                <LinearProgress aria-label="Loading…" />
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    animation="wave"
                />
                <LinearProgress aria-label="Loading…" variant="query" />
            </div>
        );
    }

    // if (error) {
    //     return <div className="container">Ошибка загрузки: {error.status || 'Что-то пошло не так'}</div>;
    // }
    //
    // if (!data) {
    //     return <div className="container">Данных нет</div>;
    // }

    // return <>{children}</>;
};

export default LoadingStatus;