import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
    <div className="alert alert-danger">
        <span className="h5">{message}</span>
    </div>
    )
}

export default ErrorMessage;