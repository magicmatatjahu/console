import React from 'react';

export const Token = ({ children, clickHandler, className, ...rest }) => (
    <span className={`fd-token${className ? ' ' + className : ''}`} onClick={clickHandler}
        role='button' {...rest}>
        {children}
    </span>
);
