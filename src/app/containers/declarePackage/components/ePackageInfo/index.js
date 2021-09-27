import React from 'react'
import './style.css'
import {
    Input,
    Textarea,
    Select,
    ContainerScreen
} from '../../../../components'
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';


const eVoucherSourceCode = [
    {
        id: 1,
        title: "Đối tác",
    },
    {
        id: 2,
        title: "Tự phát hành",
    },
]

const EPackageInfo = (props) => {
    const {
        eVoucherTypeId,
        setEVoucherTypeId,
        evoucherName,
        setEvoucherName,
        isApplyInPerson,
        setIsApplyInPerson,
        isActived,
        setIsActived,
        description,
        setDescription,
        eVoucherSrc,
        setEVoucherSrc,
        currencyCode,
        setCurrencyCode,
        cashOutAllowed,
        setCashOutAllowed,
        isCheckCustomerInfo,
        setCheckCustomerInfo,
        cusInfoCMND,
        setCusInfoCMND,
        cusInfoSDT,
        setCusInfoSDT,
        isDisableAll,
        selectEvoucherType
    } = props;

    const checkCusInfo = (cusIfCMND, cusIfSDT) => {
        if (cusIfCMND > 0 || cusIfSDT > 0) {
            setCheckCustomerInfo(1)
        } else {
            setCheckCustomerInfo(0)
        }
    }

    const changeCusInfoCMND = () => {
        if (cusInfoCMND === 1){
            setCusInfoCMND(0)
            checkCusInfo(0, cusInfoSDT)
        }else{
            setCusInfoCMND(1)
            checkCusInfo(1, cusInfoSDT)
        }
    }

    const changeCusInfoSDT = () => {
        if (cusInfoSDT === 2){
            setCusInfoSDT(0)
            checkCusInfo(cusInfoCMND, 0)
        }else{
            setCusInfoSDT(2)
            checkCusInfo(cusInfoCMND, 2)
        }
    }

    return (
        <ContainerScreen className="epackage-info-container">
            <div className="col-md-4 pd-botton">
                <button disabled={isDisableAll} onClick={() => selectEvoucherType(2)} className="evoucher-type-btn">
                    {
                        eVoucherTypeId === 2 ?
                            <RadioButtonCheckedOutlinedIcon style={styles.active} />
                            :
                            <RadioButtonUncheckedOutlinedIcon style={styles.active} />
                    }
                    <span>Multi codes</span>
                </button>
            </div>
            <div className="col-md-4 pd-botton">
                <button disabled={isDisableAll} onClick={() => selectEvoucherType(1)} className="evoucher-type-btn">
                    {
                        eVoucherTypeId === 1 ?
                            <RadioButtonCheckedOutlinedIcon style={styles.active} />
                            :
                            <RadioButtonUncheckedOutlinedIcon style={styles.active} />
                    }
                    <span>Single code</span>
                </button>
            </div>
            <div className="col-md-12">
                <Input
                    disabled={isDisableAll}
                    value={evoucherName}
                    type="text"
                    className="input-epackage-name"
                    placeholder="Nhập tên gói Evoucher (*)"
                    onChange={(e) => setEvoucherName(e.target.value)}
                    maxLength={500}
                />
                <span style={styles.spanLengthName}>{evoucherName.length}/500</span>
            </div>

            <div className="col-md-12">
                <button
                    disabled={isDisableAll}
                    onClick={() => {
                        if (isApplyInPerson === 1) setIsApplyInPerson(0)
                        else setIsApplyInPerson(1)
                    }}
                    className="evoucher-apply"
                    disabled={eVoucherTypeId === 2}
                >
                    {
                        isApplyInPerson === 1 ?
                            <ToggleOnOutlinedIcon style={styles.active} className="apply-icon" />
                            :
                            <ToggleOffOutlinedIcon style={styles.notActive} className="apply-icon" />
                    }

                    <span> Mỗi khách hàng chỉ được phép áp dụng mã Evoucher 1 lần</span>
                </button>
            </div>
            <div className="col-md-12 evoucher-status">
                <span style={styles.fontWeightSpan}>
                    Trạng thái EVoucher:
                </span>
                <button
                    disabled={isDisableAll}
                    onClick={() => {
                        if (isActived === 1) setIsActived(0)
                        else setIsActived(1)
                    }}
                    className="eVoucher-status-btn"
                >
                    {
                        isActived === 1 ?
                            <ToggleOnOutlinedIcon style={styles.active} className="status-icon" />
                            :
                            <ToggleOffOutlinedIcon style={styles.notActive} className="status-icon" />
                    }
                    <span>{isActived === 1 ? 'Kích hoạt' : 'Chưa kích hoạt'}</span>
                </button>
            </div>
            <div className="col-md-12 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Mô tả chương trình
                </span>
                <div className="evoucher-description">
                    <Textarea
                        disabled={isDisableAll}
                        placeholder="Nhập thông tin mô tả..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={2000}
                    />
                    <span style={styles.spanLengthDescription}>{description.length}/2000</span>
                </div>
            </div>
            <div className="col-md-4 pd-botton">
                <div className="evoucher-src">
                    <span style={styles.fontWeightSpan}>
                        Nguồn phát hành <span style={styles.spanColor}>(*)</span>
                    </span>
                    <Select
                        value={"id"}
                        display={"title"}
                        data={eVoucherSourceCode}
                        valueSelect={eVoucherSrc}
                        setValueSelect={setEVoucherSrc}
                        className="select-evoucher-src"
                        hideClearIcon={true}
                        disabled={isDisableAll}
                    />
                </div>
            </div>
            <div className="col-md-4 pd-botton">
                <div className="evoucher-currencycode">
                    <span style={styles.fontWeightSpan}>
                        Đơn vị tiền tệ <span style={styles.spanColor}>(*)</span>
                    </span>
                    <button disabled={isDisableAll} onClick={() => setCurrencyCode(1)} className="evoucher-type-btn">
                        {
                            currencyCode === 1 ?
                                <RadioButtonCheckedOutlinedIcon style={styles.active} />
                                :
                                <RadioButtonUncheckedOutlinedIcon style={styles.active} />
                        }
                        <span>VND</span>
                    </button>
                    <span></span>
                    <button disabled={isDisableAll} onClick={() => setCurrencyCode(2)} className="evoucher-type-btn">
                        {
                            currencyCode === 2 ?
                                <RadioButtonCheckedOutlinedIcon style={styles.active} />
                                :
                                <RadioButtonUncheckedOutlinedIcon style={styles.active} />
                        }
                        <span>USD</span>
                    </button>
                </div>
            </div>
            <div className="col-md-4 pd-botton">
                <div className="evoucher-cashoutallowed">
                    <button
                        disabled={isDisableAll}
                        onClick={() => {
                            if (cashOutAllowed === 1) setCashOutAllowed(0)
                            else setCashOutAllowed(1)
                        }}
                        className="evoucher-type-btn"
                    >
                        {
                            cashOutAllowed === 1 ?
                                <CheckBoxOutlinedIcon style={styles.active} />
                                :
                                <CheckBoxOutlineBlankOutlinedIcon style={styles.active} />
                        }
                        <span>Quy đổi tiền mặt</span>
                    </button>
                    <span></span>
                </div>
            </div>
            <div className="col-md-9">
                <div className="evoucher-check-custonmerinfo">
                    <span style={styles.fontWeightSpan}>
                        Kiểm tra thông tin khách hàng
                    </span>
                    <button
                        disabled={isDisableAll}
                        onClick={changeCusInfoCMND}
                        className="evoucher-type-btn"
                    >
                        {
                            cusInfoCMND === 1 ?
                                <CheckBoxOutlinedIcon style={styles.active} />
                                :
                                <CheckBoxOutlineBlankOutlinedIcon style={styles.active} />
                        }
                        <span>Yêu cầu CMND/CCCD khách hàng</span>
                    </button>
                    <span></span>
                    <button
                        disabled={isDisableAll}
                        onClick={changeCusInfoSDT}
                        className="evoucher-type-btn"
                    >
                        {
                            cusInfoSDT === 2 ?
                                <CheckBoxOutlinedIcon style={styles.active} />
                                :
                                <CheckBoxOutlineBlankOutlinedIcon style={styles.active} />
                        }
                        <span>Yêu cầu số điện thoại khách hàng</span>
                    </button>
                </div>
            </div>
        </ContainerScreen>
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


export default EPackageInfo;
