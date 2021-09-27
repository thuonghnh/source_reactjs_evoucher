import React from 'react'

const Icon = (props) => {
    const {
        onClick,
        onChange,
        icon,
        style,
        className,
        disabled,
    } = props;
    return (
        <span className={className + (disabled ? " " + "disabled" : "")}>
            <i
                onClick={!disabled ? onClick : null}
                style={style}
                className={icon}
                aria-hidden="true"
                onChange={onChange}
            >
            </i>
        </span>

    )
}

export default Icon
