import React, { useState, useEffect } from 'react'
import './style.css'
import { DateCustom, Input, ContainerScreen } from '../../../../components'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { helper, date as FormatDate } from '../../../../common';

const ProfileTime = (props) => {
    const {
        isDisableAll,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        validDateRuleTypeId,
        setValidDateRuleTypeId,
        validDateRuleValue,
        setValidDateRuleValue,
        invalidDateRuleType,
        setInvalidDateRuleType,
        invalidDateRuleTypeValue,
        setInvalidDateRuleTypeValue
    } = props;

    const [validDate, setValidDate] = useState(null)
    const [inValidDate, setInValidDate] = useState(null)
    const [validDateNum, setValidDateNum] = useState("0")
    const [inValidDateNum, setInValidDateNum] = useState("0")

    useEffect(() => {
        if (validDateRuleTypeId == 2) {
            setValidDate(new Date(validDateRuleValue))
        }
        if (invalidDateRuleType == 1) {
            setInValidDate(new Date(invalidDateRuleTypeValue))
        }
        if (validDateRuleTypeId == 3) {
            setValidDateNum(validDateRuleValue)
        }
        if (invalidDateRuleType == 2) {
            setInValidDateNum(invalidDateRuleTypeValue)
        }
    }, [])

    const onChangeValidDateNum = (text) => {
        if (text.charAt(0) === "0") {
            text = text.slice(1);
        }
        setValidDateNum(text)
        setValidDateRuleValue(text)
    }

    const onChangeInValidDateNum = (text) => {
        if (text.charAt(0) === "0") {
            text = text.slice(1);
        }
        setInValidDateNum(text)
        setInvalidDateRuleTypeValue(text)
    }

    const onChangeValidDateType = (n) => {
        if (validDateRuleTypeId !== n) setValidDateRuleTypeId(n)
    }

    const onChangeInvalidDateType = (n) => {
        if (invalidDateRuleType !== n) setInvalidDateRuleType(n)
    }

    const onChangeStartDate = (n) => {
        if (!fromDate || isDisableAll) return;
        onChangeValidDateType(n)
        setValidDateNum("0")
        setValidDate(null)
        setValidDateRuleValue("")
    }

    const onChangeDateValid = (n) => {
        if (!fromDate || isDisableAll) return;
        onChangeValidDateType(n)
        setValidDateNum("0")
        setValidDateRuleValue("")
    }

    const onChangeValidTypeNum = (n) => {
        if (!fromDate || isDisableAll) return;
        onChangeValidDateType(n)
        setValidDate(null)
        setValidDateRuleValue("")
    }

    const setValidDateStart = (date) => {
        setValidDateRuleValue(FormatDate.formatDateMMDDYYYY(date))
    }

    const onChangeEndDate = (n) => {
        if (!toDate || isDisableAll) return;
        onChangeInvalidDateType(n)
        setInValidDateNum("0")
        setInValidDate(null)
        setInvalidDateRuleTypeValue("")
    }

    const onChangeEndDateValid = (n) => {
        if (!toDate || isDisableAll) return;
        onChangeInvalidDateType(n)
        setInValidDateNum("0")
        setInvalidDateRuleTypeValue("")
    }

    const onChangeEndValidTypeNum = (n) => {
        if (!toDate || isDisableAll) return;
        onChangeInvalidDateType(n)
        setInValidDate(null)
        setInvalidDateRuleTypeValue("")
    }

    const setValidDateEnd = (date) => {
        setInvalidDateRuleTypeValue(FormatDate.formatDateMMDDYYYY(date))
    }

    return (
        <ContainerScreen className="deprofile-app-container">


            <div className="col-md-12 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Ngày bắt đầu phát hành <span style={styles.spanColor}>(*)</span>
                </span>
                <DateCustom
                    className={"deprofile-app-date"}
                    value={fromDate}
                    setValue={setFromDate}
                    maxDate={toDate}
                    disabled={isDisableAll}
                />
            </div>
            <div className="col-md-12 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Ngày kết thúc phát hành <span style={styles.spanColor}>(*)</span>
                </span>
                <DateCustom
                    className={"deprofile-app-date"}
                    minDate={fromDate}
                    value={toDate}
                    setValue={setToDate}
                    disabled={isDisableAll}
                />
            </div>
            <div className="col-sm-12 col-md-9 col-xl-6 pd-botton">
                <div className="validdate-grid">
                    <span className="validdatename" style={styles.fontWeightSpan}>
                        Thời gian có hiệu lực <span style={styles.spanColor}>(*)</span>
                    </span>
                    <div className="validdate-container">
                        <div className="validdate-item">
                            {
                                validDateRuleTypeId === 1 ?
                                    <CheckBoxOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeStartDate(1)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeStartDate(1)}
                                        style={styles.activePdright}
                                    />
                            }
                            <span>Tính từ ngày phát hành</span>
                        </div>
                        <div className="validdate-item">
                            {
                                validDateRuleTypeId === 2 ?
                                    <CheckBoxOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeDateValid(2)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeDateValid(2)}
                                        style={styles.activePdright}
                                    />
                            }
                            <DateCustom
                                minDate={fromDate}
                                value={validDate}
                                setValue={setValidDate}
                                placeholder="Chọn ngày có hiệu lực"
                                onChange={setValidDateStart}
                                disabled={!fromDate || validDateRuleTypeId !== 2 || isDisableAll}
                            />
                        </div>
                        <div className="validdate-item">
                            {
                                validDateRuleTypeId === 3 ?
                                    <CheckBoxOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeValidTypeNum(3)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!fromDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeValidTypeNum(3)}
                                        style={styles.activePdright}
                                    />
                            }
                            <span>Sau</span>
                            <Input
                                className="datenum-input"
                                value={validDateNum}
                                onChange={(e) => onChangeValidDateNum(helper.validateNumber(e.target.value))}
                                maxLength={4}
                                disabled={!fromDate || validDateRuleTypeId !== 3 || isDisableAll}
                            />
                            <span>Ngày tính từ ngày phát hành</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-9 col-xl-6 pd-botton">
                <div className="validdate-grid">
                    <span className="validdatename" style={styles.fontWeightSpan}>
                        Thời gian hết hiệu lực <span style={styles.spanColor}>(*)</span>
                    </span>
                    <div className="validdate-container">
                        <div className="validdate-item">
                            {
                                invalidDateRuleType === 3 ?
                                    <CheckBoxOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndDate(3)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndDate(3)}
                                        style={styles.activePdright}
                                    />
                            }
                            <span>Tại thời điểm kết thúc chương trình</span>
                        </div>
                        <div className="validdate-item">
                            {
                                invalidDateRuleType === 1 ?
                                    <CheckBoxOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndDateValid(1)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndDateValid(1)}
                                        style={styles.activePdright}
                                    />
                            }
                            <DateCustom
                                minDate={fromDate}
                                value={inValidDate}
                                setValue={setInValidDate}
                                placeholder="Chọn ngày hết hiệu lực"
                                onChange={setValidDateEnd}
                                disabled={!toDate || invalidDateRuleType !== 2 || isDisableAll}
                            />
                        </div>
                        <div className="validdate-item">
                            {
                                invalidDateRuleType === 2 ?
                                    <CheckBoxOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndValidTypeNum(2)}
                                        style={styles.activePdright}
                                    />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon
                                        className={!toDate || isDisableAll ? "disabled" : ""}
                                        onClick={() => onChangeEndValidTypeNum(2)}
                                        style={styles.activePdright}
                                    />
                            }
                            <span>Sau</span>
                            <Input
                                className="datenum-input"
                                value={inValidDateNum}
                                onChange={(e) => onChangeInValidDateNum(helper.validateNumber(e.target.value))}
                                maxLength={4}
                                disabled={!toDate || invalidDateRuleType !== 3 || isDisableAll}
                            />
                            <span>Ngày tính từ ngày phát hành</span>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerScreen>
    )
}

const styles = {
    active: {
        color: '#3BB8C3'
    },
    fontWeightSpan: {
        fontWeight: 600
    },
    spanColor: {
        color: 'red'
    },
    activePdright: {
        color: '#3BB8C3',
        marginRight: ".5rem"
    }
}

export default ProfileTime
