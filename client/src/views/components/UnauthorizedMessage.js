import React from 'react';

const UnauthorizedMessage = () => {
    return (
    <div className="alert alert-danger">
        <span className="h5">You are not authorized to view this page.</span>
    </div>
    )
}

export default UnauthorizedMessage;