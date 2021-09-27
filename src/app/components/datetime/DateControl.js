import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/datecontrol.css';
import { date as DateFormat } from '../../common'
const DateControl = (props) => {
    const {
        minDate,
        maxDate,
        filterDate,
        dateFormat,//chưa làm
        value,
        setValue,
        onChange,
        disabled,
        placeholder,
        className
    } = props;
    const ref = React.createRef();

    const changeDate = (date) => {
        if (!date) {
            setValue(new Date())
        } else {
            setValue(date)
        }

        if (onChange) {
            onChange(date);
        }
    }

    const DatePickerCustomInput = React.forwardRef(({ onClick }, ref) => {
        return (
            <button disabled={disabled} onClick={onClick} className={"datecontrol-custom-input " + (className ? " " + className : "")}>
                <i className="fa fa-calendar" aria-hidden="true"></i>
                {
                    value ?
                        <span className="datecontrol-value">{DateFormat.formatDate(value)}</span>
                        :
                        <span className="datecontrol-none">{placeholder}</span>
                }
            </button>

        )
    });
    //date => date.getDay() !== 6 && date.getDay() !== 0
    return (
        <div className="datecontrol-container">
            <DatePicker
                selected={value}
                onChange={changeDate}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
                filterDate={filterDate}
                // isClearable
                showYearDropdown
                scrollableMonthYearDropdown
                customInput={<DatePickerCustomInput ref={ref} />}
            />
        </div>
    )
}

export default DateControl
