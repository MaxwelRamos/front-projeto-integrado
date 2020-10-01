import React from 'react';

export const AlertDanger = (props) => {
    if(props.erros === "") return null;

    return(
        <div className="alert alert-danger">
            {props.erros.message}
        </div>
    );
};