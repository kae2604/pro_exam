import React from 'react';

const LoadingStatus = () => ({ isLoading, error, data, children, skeleton: Skeleton }) => {
    if (isLoading) {
        return Skeleton ? <Skeleton /> : <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container">Ошибка загрузки: {error.status || 'Что-то пошло не так'}</div>;
    }

    if (!data) {
        return <div className="container">Данных нет</div>;
    }

    return <>{children}</>;
};

export default LoadingStatus;