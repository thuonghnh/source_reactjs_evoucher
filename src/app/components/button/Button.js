import React from 'react';
import './style.css'
const Button = (props) => {
    const {
        title,
        onClick,
        icon,
        disabled,
        hidden,
        styleIcon,
        styleTitle,
        styleBtn,
        classBtn,
        onKeyDown,
        onKeyUp,
        onKeyPress,
    } = props;

    return (
        <button
            style={styleBtn}
            hidden={hidden}
            disabled={disabled}
            className={"btn-mybutton" + (classBtn ? " " + classBtn : "")}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
        >
            {
                icon ?
                    <i style={styleIcon} className={icon} aria-hidden="true"></i>
                    : null
            }
            <span style={styleTitle}>{title}</span>
        </button>
    )
}
export default Button
