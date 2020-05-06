import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
    <div className="alert alert-danger mb-4">
        <span className="h5">{message}</span>
    </div>
    )
}

export default ErrorMessage;