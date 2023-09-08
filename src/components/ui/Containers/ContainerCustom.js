import React from "react";

const ContainerCustom = (props) => {
    const {children, className, ...rest} = props;

    return ( <div className={`container-custom container ${className}`}
    {...rest}>
        {children}
    </div> );
}
ContainerCustom.defaultProps = {
    className: ''
}
export default ContainerCustom;