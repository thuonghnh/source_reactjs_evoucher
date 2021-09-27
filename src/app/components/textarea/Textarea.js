import React from 'react'
import './styles/textarea.css'
const Textarea = (props) => {
    const {
        disabled,
        value,
        className,
        maxLength,
        onChange,
        placeholder,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
        hidden,
        style
    } = props;
    return (
        <textarea
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
            className={"textarea-custom" + (className ? " " + className : "")}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            hidden={hidden}
            onBlur={onBlur}
            style={style}
        />
    )
}

export default Textarea
