import React from 'react'
import './styles/input.css'
const Input = (props) => {
    const {
        disabled,
        value,
        type,
        className,
        maxLength,
        onChange,
        placeholder,
        min,
        max,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
        hidden,
        style
    } = props;
    return (
        <input
            value={value}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
            min={min}
            max={max}
            className={"input-custom" + (className ? " " + className : "")}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            hidden={hidden}
            onBlur={onBlur}
            style={style}
        />
    )
}

export default Input
