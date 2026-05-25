import React from 'react';
import "./errorModal.scss"

const ErrorModal = ({ refetch , onClose }) => {
    return (
        <div className="error_overlay"
             onClick={onClose}>
            <div className="error_modal"
                 onClick={e => e.stopPropagation()}>
                <h3>Oops! Something went wrong.</h3>
                <p>We're having trouble connecting to the server. Please check your internet connection and try again later.</p>
                <button onClick={refetch}>Retry Connection</button>
            </div>
        </div>
    );
};

export default ErrorModal;