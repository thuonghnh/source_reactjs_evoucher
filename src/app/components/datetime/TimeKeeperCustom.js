import React, { useState, useEffect, useRef } from 'react';
import TimeKeeper from 'react-timekeeper';
import './styles/time_keeper_custom.css';
const TimeKeeperCustom = (props) => {
    const {
        value,
        setValue,
        switchToMinuteOnHourSelect,
        hour24Mode,
        formatted12,
        forceCoarseMinutes,
        coarseMinutes,
        closeOnMinuteSelect,
        onChange,
        placeholder,
        disabled,
        onClose
    } = props;
    const ref = useRef();
    const refIcon = useRef();
    const [showTime, setShowTime] = useState(false)

    useEffect(() => {
        document.addEventListener("mousedown", moveDiv);
        return () => {
            document.removeEventListener("mousedown", moveDiv);
        };
    }, [])

    const moveDiv = e => {
        if (refIcon.current && refIcon.current.contains(e.target)) return;
        //Nếu click vào chính Box thì không làm gì cả và return kết thúc hàm
        if (ref.current && ref.current.contains(e.target)) return;
        //Ngược lại thì thực hiện việc thay đổi state
        setShowTime(false);
    };

    const onChangeTime = (newTime) => {
        if (!formatted12) {
            setValue(newTime.formatted24)
        } else {
            setValue(newTime.formatted12)
        }
        if (onChange) {
            onChange(newTime)
        }
    }

    const onClickIconTime = () => {
        if (disabled) return;
        if (showTime) setShowTime(false)
        else setShowTime(true)
    }

    const closePopup = (newTime) => {
        setShowTime(false)
        if (onClose) {
            onClose(newTime)
        }
    }

    const BtnDoneCustom = ({ newTime }) => {
        return (
            <div
                className="btn-done-custom"
                onClick={() => closePopup(newTime)}
            >
                Đóng
            </div>
        )
    }

    const clearData = () => {
        if (disabled) return;
        setValue(null)
    }

    return (
        <div className="time-keeper-custom-container">
            <div className={"time-keeper-custom-value" + (disabled ? " disabled" : "")}>
                <div className="choose-time">
                    <i ref={refIcon} onClick={onClickIconTime} className="fa fa-clock-o" aria-hidden="true"></i>
                    {
                        value ?
                            <span>{value}</span>
                            :
                            <span style={styles.shadow}>{placeholder}</span>
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

            {showTime &&
                <div
                    ref={ref}
                >
                    <TimeKeeper

                        time={value}
                        onChange={onChangeTime}
                        onDoneClick={() => setShowTime(false)}
                        switchToMinuteOnHourSelect={switchToMinuteOnHourSelect}
                        hour24Mode={hour24Mode}
                        forceCoarseMinutes={forceCoarseMinutes}
                        closeOnMinuteSelect={closeOnMinuteSelect}
                        coarseMinutes={coarseMinutes}
                        doneButton={(newTime) => (
                            <BtnDoneCustom newTime={newTime} />
                        )}
                    />
                </div>

            }
        </div>
    )
}

const styles = {
    shadow: {
        opacity: "0.5"
    }
}

export default TimeKeeperCustom