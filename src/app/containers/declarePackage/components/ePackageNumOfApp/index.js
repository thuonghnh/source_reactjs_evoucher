import React, { useEffect } from 'react'
import { helper } from '../../../../common'
import './style.css';
import { Input, ContainerScreen } from '../../../../components'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const EpackageNumOfApp = (props) => {
    const {
        evoucherTypeId,
        numCusApp,
        setNumCusApp,
        maxEvoucherTypeCus,
        setMaxEvoucherTypeCus,
        isCusDay,
        setIsCusDay,
        isCusWeek,
        setIsCusWeek,
        isCusMonth,
        setIsCusMonth,
        isCusYear,
        setIsCusYear,
        valueCusDay,
        setValueCusDay,
        valueCusWeek,
        setValueCusWeek,
        valueCusMonth,
        setValueCusMonth,
        valueCusYear,
        setValueCusYear,
        numPackApp,
        setNumPackApp,
        maxEvoucherTypePackage,
        setMaxEvoucherTypePackage,
        isPackDay,
        setIsPackDay,
        isPackWeek,
        setIsPackWeek,
        isPackMonth,
        setIsPackMonth,
        isPackYear,
        setIsPackYear,
        valuePackDay,
        setValuePackDay,
        valuePackWeek,
        setValuePackWeek,
        valuePackMonth,
        setValuePackMonth,
        valuePackYear,
        setValuePackYear,
        isDisableAll,
        isApplyInPerson,
        setIsApplyInPerson
    } = props;

    useEffect(() => {
        if (isApplyInPerson === 1 && evoucherTypeId === 1) {
            setNumCusApp("1")
            setMaxEvoucherTypeCus(0)
            setIsCusDay(0)
            setIsCusWeek(0)
            setIsCusMonth(0)
            setIsCusYear(0)
            setValueCusDay("")
            setValueCusWeek("")
            setValueCusMonth("")
            setValueCusYear("")
        }
    }, [])

    const changeMaxEvoucherTypeCus = () => {
        if (maxEvoucherTypeCus === 1) {
            setMaxEvoucherTypeCus(0)
            setIsCusDay(0)
            setIsCusWeek(0)
            setIsCusMonth(0)
            setIsCusYear(0)
            setValueCusDay("")
            setValueCusWeek("")
            setValueCusMonth("")
            setValueCusYear("")
        }
        else setMaxEvoucherTypeCus(1)
    }

    const changeMaxEvoucherTypePack = () => {
        if (maxEvoucherTypePackage === 2) {
            setMaxEvoucherTypePackage(0)
            setIsPackDay(0)
            setIsPackWeek(0)
            setIsPackMonth(0)
            setIsPackYear(0)
            setValuePackDay("")
            setValuePackWeek("")
            setValuePackMonth("")
            setValuePackYear("")
        }
        else setMaxEvoucherTypePackage(2)
    }

    const changeIsCheck = (n, isCheck, setIsCheck, setValueCheck) => {
        if (isCheck === n) {
            setIsCheck(0)
            setValueCheck("")
        }
        else setIsCheck(n)
    }

    //cus
    const changeIsCusDay = () => {
        changeIsCheck(1, isCusDay, setIsCusDay, setValueCusDay)
    }

    const changeIsCusWeek = () => {
        changeIsCheck(2, isCusWeek, setIsCusWeek, setValueCusWeek)
    }

    const changeIsCusMonth = () => {
        changeIsCheck(3, isCusMonth, setIsCusMonth, setValueCusMonth)
    }

    const changeIsCusYear = () => {
        changeIsCheck(4, isCusYear, setIsCusYear, setValueCusYear)
    }

    //package

    const changeIsPackDay = () => {
        changeIsCheck(1, isPackDay, setIsPackDay, setValuePackDay)
    }

    const changeIsPackWeek = () => {
        changeIsCheck(2, isPackWeek, setIsPackWeek, setValuePackWeek)
    }

    const changeIsPackMonth = () => {
        changeIsCheck(3, isPackMonth, setIsPackMonth, setValuePackMonth)
    }

    const changeIsPackYear = () => {
        changeIsCheck(4, isPackYear, setIsPackYear, setValuePackYear)
    }


    const setDay = (text, setDay, isWeek, valueWeek, isMonth, valueMonth, isYear, valueYear) => {
        if (!text) {
            setDay(text)
            return;
        }
        //kiểm tra có lớn hơn tuần
        if (isWeek && valueWeek && parseInt(text) > parseInt(valueWeek)) {
            setDay(valueWeek)
            return;
        }

        //Kiểm tra với tháng
        if (isMonth && valueMonth && parseInt(text) > parseInt(valueMonth)) {
            setDay(valueMonth)
            return;
        }

        //Kiểm tra với năm
        if (isYear && valueYear && parseInt(text) > parseInt(valueYear)) {
            setDay(valueYear)
            return;
        }
        setDay(text)
    }

    const setWeek = (text, setWeek, isDay, valueDay, isMonth, valueMonth, isYear, valueYear) => {
        if (!text) {
            setWeek(text)
            return;
        }

        //kiểm tra với ngày
        if (isDay && valueDay && parseInt(text) < parseInt(valueDay)) {
            setWeek(valueDay)
            return;
        }

        //Kiểm tra với tháng
        if (isMonth && valueMonth && parseInt(text) > parseInt(valueMonth)) {
            setWeek(valueMonth)
            return;
        }

        //Kiểm tra với năm
        if (isYear && valueYear && parseInt(text) > parseInt(valueYear)) {
            setWeek(valueYear)
            return;
        }
        setWeek(text)
    }

    const setMonth = (text, setMonth, isDay, valueDay, isWeek, valueWeek, isYear, valueYear) => {
        if (!text) {
            setMonth(text)
            return;
        }

        //Kiểm tra với tuần
        if (isWeek && valueWeek && parseInt(text) < parseInt(valueWeek)) {
            setMonth(valueWeek)
            return;
        }

        //kiểm tra với ngày
        if (isDay && valueDay && parseInt(text) < parseInt(valueDay)) {
            setMonth(valueDay)
            return;
        }

        //Kiểm tra với năm
        if (isYear && valueYear && parseInt(text) > parseInt(valueYear)) {
            setMonth(valueYear)
            return;
        }
        setMonth(text)
    }

    const setYear = (text, setYear, isDay, valueDay, isWeek, valueWeek, isMonth, valueMonth) => {
        if (!text) {
            setYear(text)
            return;
        }

        //Kiểm tra với tháng
        if (isMonth && valueMonth && parseInt(text) < parseInt(valueMonth)) {
            setYear(valueMonth)
            return;
        }

        //Kiểm tra với tuần
        if (isWeek && valueWeek && parseInt(text) < parseInt(valueWeek)) {
            setYear(valueWeek)
            return;
        }

        //kiểm tra với ngày
        if (isDay && valueDay && parseInt(text) < parseInt(valueDay)) {
            setYear(valueDay)
            return;
        }
        setYear(text)
    }

    const setValueText = (text, setText) => {
        if (text.charAt(0) === "0") {
            text = text.slice(1);
        }
        setText(helper.validateNumber(text))
    }
    //cus
    const changeValueCusDay = (e) => {
        setValueText(e.target.value, setValueCusDay)
    }

    const changeValueCusWeek = (e) => {
        setValueText(e.target.value, setValueCusWeek)
    }

    const changeValueCusMonth = (e) => {
        setValueText(e.target.value, setValueCusMonth)
    }

    const changeValueCusYear = (e) => {
        setValueText(e.target.value, setValueCusYear)
    }

    //pack
    const changeValuePackDay = (e) => {
        setValueText(e.target.value, setValuePackDay)
    }

    const changeValuePackWeek = (e) => {
        setValueText(e.target.value, setValuePackWeek)
    }

    const changeValuePackMonth = (e) => {
        setValueText(e.target.value, setValuePackMonth)
    }

    const changeValuePackYear = (e) => {
        setValueText(e.target.value, setValuePackYear)
    }

    //blur//
    //cus
    const blurValueCusDay = (e) => {
        setDay(e.target.value, setValueCusDay, isCusWeek, valueCusWeek, isCusMonth, valueCusMonth, isCusYear, valueCusYear)
    }

    const blurValueCusWeek = (e) => {
        setWeek(e.target.value, setValueCusWeek, isCusDay, valueCusDay, isCusMonth, valueCusMonth, isCusYear, valueCusYear)
    }

    const blurValueCusMonth = (e) => {
        setMonth(e.target.value, setValueCusMonth, isCusDay, valueCusDay, isCusWeek, valueCusWeek, isCusYear, valueCusYear)
    }

    const blurValueCusYear = (e) => {
        setYear(e.target.value, setValueCusYear, isCusDay, valueCusDay, isCusWeek, valueCusWeek, isCusMonth, valueCusMonth)
    }

    //pack
    const blurValuePackDay = (e) => {
        setDay(e.target.value, setValuePackDay, isPackWeek, valuePackWeek, isPackMonth, valuePackMonth, isPackYear, valuePackYear)
    }

    const blurValuePackWeek = (e) => {
        setWeek(e.target.value, setValuePackWeek, isPackDay, valuePackDay, isPackMonth, valuePackMonth, isPackYear, valuePackYear)
    }

    const blurValuePackMonth = (e) => {
        setMonth(e.target.value, setValuePackMonth, isPackDay, valuePackDay, isPackWeek, valuePackWeek, isPackYear, valuePackYear)
    }

    const blurValuePackYear = (e) => {
        setYear(e.target.value, setValuePackYear, isPackDay, valuePackDay, isPackWeek, valuePackWeek, isPackMonth, valuePackMonth)
    }

    const changeNumCusApp = (text) => {
        setNumCusApp(helper.validateNumber(text))
    }
    return (
        <React.Fragment>
            {
                evoucherTypeId === 1 ?
                    <ContainerScreen className="epackage-numofapp">
                        {/* Thiết lập cho toàn bộ khách hàng */}
                        <div className="col-md-5 pd-botton">
                            <span style={styles.fontWeightSpan}>Số lần áp dụng Evoucher cho mỗi khách hàng</span>
                            <div className="number-app">
                                <Input
                                    disabled={isDisableAll || isApplyInPerson === 1}
                                    value={numCusApp}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần áp dụng tối đa......"
                                    onChange={(e) => changeNumCusApp(e.target.value)}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 pd-botton">
                            <button
                                disabled={isDisableAll || isApplyInPerson === 1}
                                onClick={changeMaxEvoucherTypeCus}
                                className="evoucher-btn"
                            >
                                {
                                    maxEvoucherTypeCus === 1 ?
                                        <CheckBoxOutlinedIcon className="etypecus-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="etypecus-icon" />
                                }
                                <span> Thiết lập mở rộng số lần áp dụng cho mỗi khách hàng</span>
                            </button>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsCusDay}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypeCus === 1 ? false : true) || isDisableAll}
                            >
                                {
                                    isCusDay === 1 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Ngày</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valueCusDay}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValueCusDay}
                                    maxLength={10}
                                    disabled={(isCusDay === 1 ? false : true) || isDisableAll}
                                    onBlur={blurValueCusDay}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsCusWeek}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypeCus === 1 ? false : true) || isDisableAll}
                            >
                                {
                                    isCusWeek === 2 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Tuần</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valueCusWeek}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValueCusWeek}
                                    maxLength={10}
                                    disabled={(isCusWeek === 2 ? false : true) || isDisableAll}
                                    onBlur={blurValueCusWeek}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsCusMonth}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypeCus === 1 ? false : true) || isDisableAll}
                            >
                                {
                                    isCusMonth === 3 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Tháng</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valueCusMonth}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValueCusMonth}
                                    maxLength={10}
                                    disabled={(isCusMonth === 3 ? false : true) || isDisableAll}
                                    onBlur={blurValueCusMonth}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsCusYear}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypeCus === 1 ? false : true) || isDisableAll}
                            >
                                {
                                    isCusYear === 4 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Năm</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valueCusYear}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValueCusYear}
                                    maxLength={10}
                                    disabled={(isCusYear === 4 ? false : true) || isDisableAll}
                                    onBlur={blurValueCusYear}
                                />
                            </div>
                        </div>

                        {/* Thiết lập cho toàn bộ chương trình */}
                        <div className="col-md-5 pd-botton">
                            <span style={styles.fontWeightSpan}>Số lượng Evoucher áp dụng cho chương trình</span>
                            <div className="number-app">
                                <Input
                                    disabled={isDisableAll}
                                    value={numPackApp}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần áp dụng tối đa......"
                                    onChange={(e) => setNumPackApp(helper.validateNumber(e.target.value))}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 pd-botton">
                            <button
                                disabled={isDisableAll}
                                onClick={changeMaxEvoucherTypePack}
                                className="evoucher-btn"
                            >
                                {
                                    maxEvoucherTypePackage === 2 ?
                                        <CheckBoxOutlinedIcon className="etypecus-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="etypecus-icon" />
                                }
                                <span> Thiết lập mở rộng số lần áp dụng cho cho trình</span>
                            </button>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsPackDay}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypePackage === 2 ? false : true) || isDisableAll}
                            >
                                {
                                    isPackDay === 1 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Ngày</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valuePackDay}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValuePackDay}
                                    maxLength={10}
                                    disabled={(isPackDay === 1 ? false : true) || isDisableAll}
                                    onBlur={blurValuePackDay}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsPackWeek}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypePackage === 2 ? false : true) || isDisableAll}
                            >
                                {
                                    isPackWeek === 2 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Tuần</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valuePackWeek}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValuePackWeek}
                                    maxLength={10}
                                    disabled={(isPackWeek === 2 ? false : true) || isDisableAll}
                                    onBlur={blurValuePackWeek}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsPackMonth}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypePackage === 2 ? false : true) || isDisableAll}
                            >
                                {
                                    isPackMonth === 3 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Tháng</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valuePackMonth}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValuePackMonth}
                                    maxLength={10}
                                    disabled={(isPackMonth === 3 ? false : true) || isDisableAll}
                                    onBlur={blurValuePackMonth}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 pd-botton">
                            <button
                                onClick={changeIsPackYear}
                                className="evoucher-btn"
                                disabled={(maxEvoucherTypePackage === 2 ? false : true) || isDisableAll}
                            >
                                {
                                    isPackYear === 4 ?
                                        <CheckBoxOutlinedIcon className="timecheck-icon" />
                                        :
                                        <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                }
                                <span> Năm</span>
                            </button>
                            <div className="container-input">
                                <Input
                                    value={valuePackYear}
                                    type="text"
                                    className="input-numofapp"
                                    placeholder="Nhập số lần......"
                                    onChange={changeValuePackYear}
                                    maxLength={10}
                                    disabled={(isPackYear === 4 ? false : true) || isDisableAll}
                                    onBlur={blurValuePackYear}
                                />
                            </div>
                        </div>
                    </ContainerScreen>
                    :
                    <ContainerScreen className="epackage-numofapp">
                        <div className="numofapp-column">
                            <div className="col-md-12 pd-botton">
                                <span style={styles.fontWeightSpan, styles.fontSizeSpan}>Số lượng Evoucher Phát hành</span>
                            </div>
                            <div className="col-md-12 pd-botton">
                                <button
                                    disabled={isDisableAll}
                                    onClick={changeIsPackDay}
                                    className="evoucher-btn"
                                >
                                    {
                                        isPackDay === 1 ?
                                            <CheckBoxOutlinedIcon className="timecheck-icon" />
                                            :
                                            <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                    }
                                    <span> Ngày</span>
                                </button>
                                <div className="container-input">
                                    <Input
                                        value={valuePackDay}
                                        type="text"
                                        className="input-numofapp"
                                        placeholder="Nhập số lần......"
                                        onChange={changeValuePackDay}
                                        maxLength={10}
                                        disabled={(isPackDay === 1 ? false : true) || isDisableAll}
                                        onBlur={blurValuePackDay}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 pd-botton">
                                <button
                                    disabled={isDisableAll}
                                    onClick={changeIsPackWeek}
                                    className="evoucher-btn"
                                >
                                    {
                                        isPackWeek === 2 ?
                                            <CheckBoxOutlinedIcon className="timecheck-icon" />
                                            :
                                            <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                    }
                                    <span> Tuần</span>
                                </button>
                                <div className="container-input">
                                    <Input
                                        value={valuePackWeek}
                                        type="text"
                                        className="input-numofapp"
                                        placeholder="Nhập số lần......"
                                        onChange={changeValuePackWeek}
                                        maxLength={10}
                                        disabled={(isPackWeek === 2 ? false : true) || isDisableAll}
                                        onBlur={blurValuePackWeek}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 pd-botton">
                                <button
                                    disabled={isDisableAll}
                                    onClick={changeIsPackMonth}
                                    className="evoucher-btn"
                                >
                                    {
                                        isPackMonth === 3 ?
                                            <CheckBoxOutlinedIcon className="timecheck-icon" />
                                            :
                                            <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                    }
                                    <span> Tháng</span>
                                </button>
                                <div className="container-input">
                                    <Input
                                        value={valuePackMonth}
                                        type="text"
                                        className="input-numofapp"
                                        placeholder="Nhập số lần......"
                                        onChange={changeValuePackMonth}
                                        maxLength={10}
                                        disabled={(isPackMonth === 3 ? false : true) || isDisableAll}
                                        onBlur={blurValuePackMonth}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 pd-botton">
                                <button
                                    disabled={isDisableAll}
                                    onClick={changeIsPackYear}
                                    className="evoucher-btn"
                                >
                                    {
                                        isPackYear === 4 ?
                                            <CheckBoxOutlinedIcon className="timecheck-icon" />
                                            :
                                            <CheckBoxOutlineBlankOutlinedIcon className="timecheck-icon" />
                                    }
                                    <span> Năm</span>
                                </button>
                                <div className="container-input">
                                    <Input
                                        value={valuePackYear}
                                        type="text"
                                        className="input-numofapp"
                                        placeholder="Nhập số lần......"
                                        onChange={changeValuePackYear}
                                        maxLength={10}
                                        disabled={(isPackYear === 4 ? false : true) || isDisableAll}
                                        onBlur={blurValuePackYear}
                                    />
                                </div>
                            </div>
                        </div>

                    </ContainerScreen>
            }

        </React.Fragment>
    )
}

const styles = {
    active: {
        color: '#3BB8C3'
    },
    notActive: {
        color: '#E34E2D'
    },
    fontWeightSpan: {
        fontWeight: 600
    },
    fontSizeSpan: {
        fontSize: '1.4rem'
    },
    spanLengthName: {
        fontSize: 12,
        fontWeight: 300,
        float: 'right'
    },
    spanLengthDescription: {
        fontSize: 12,
        fontWeight: 300,
        paddingLeft: 10
    },
    spanColor: {
        color: 'red'
    }
}

export default EpackageNumOfApp;
