import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/date_multi_custom.css';
import { date as DateFormat } from '../../common';

const DateMultipleCustom = (props) => {
    const {
        minDate,
        maxDate,
        filterDate,
        dateFormat,//chưa làm
        onChange,
        disabled,
        placeholder,
        className,
        value,
        setValue
    } = props;

    const ref = React.createRef();
    const [valueDate, setValueDate] = useState(new Date());
    const [listDate, setListDate] = useState([])

    useEffect(() => {
        if (value) {
            let arr = value.split(',');
            setListDate(arr)
        }
    }, [value])

    const changeDate = (date) => {
        setValueDate(date)
        let termDate = DateFormat.formatDate(date);
        let termData = [...listDate]
        if (listDate.indexOf(termDate) < 0) {
            termData.push(termDate)
            setValue(termData.join(", "))
        }

        if (onChange) {
            onChange(date);
        }
        // DateFormat.formatDate(valueDate)
    }

    const clearData = () => {
        if (disabled) return;
        setValue("")
        setValueDate(new Date())
        setListDate([])
    }

    const DatePickerCustomInput = React.forwardRef(({ onClick }, ref) => {
        return (
            <div style={disabled ? styles.disabled : null} className={"datemulticustom-input" + (className ? " " + className : "")}>
                <div className="choose-date">
                    {
                        !disabled ?
                            <i onClick={onClick} className="fa fa-calendar" aria-hidden="true"></i>
                            :
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                    }
                    {
                        value ?
                            <span className="datecontrol-value">{value}</span>
                            :
                            <span className="datecontrol-none">{placeholder}</span>
                    }
                </div>
                <div className="clear-data">
                    {
                        value ?
                            <i onClick={clearData} className="fa fa-times" aria-hidden="true"></i>
                            :
                            null
                    }
                </div>
            </div>
        )
    });
    //date => date.getDay() !== 6 && date.getDay() !== 0
    return (
        <div className="datemulticustom-container">
            <DatePicker
                selected={valueDate}
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

const styles = {
    disabled: {
        opacity: '0.5',
    }
}

export default DateMultipleCustom
