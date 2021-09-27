import React from 'react'
import './style.css'
import { Select, Input, Textarea, ContainerScreen } from '../../../../components'
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import imgValueType from '../../../../../assets/images/valuetype.jpg';
import { helper } from '../../../../common'

const ProfileInfo = (props) => {
    const {
        valueType,
        setValueType,
        packageProfileName,
        setPackageProfileName,
        isActived,
        setIsActived,
        maxBudget,
        setMaxBudget,
        maxQuantity,
        setMaxQuantity,
        discountType,
        setDiscountType,
        description,
        setDescription,
        isDisableAll,
        objPackage
    } = props;

    const setValueText = (text, setText) => {
        if (text.charAt(0) === "0") {
            text = text.slice(1);
        }
        setText(helper.validateNumber(text))
    }

    const RenderValueType = ({ item }) => {
        return (
            <div className="col-md-4 col-xl-3 pd-botton">
                <button disabled={isDisableAll || objPackage.offerType === 3} onClick={() => setValueType(item.id)} className="valuetype-btn">
                    {
                        valueType === item.id ?
                            <RadioButtonCheckedOutlinedIcon style={styles.active} />
                            :
                            <RadioButtonUncheckedOutlinedIcon style={styles.active} />
                    }
                    <span>{item.title}</span>
                    <i style={styles.active} className="fa fa-question-circle-o" aria-hidden="true"></i>
                </button>
            </div>
        )
    }

    return (
        <ContainerScreen className="deprofile-info-container">
            <div className="col-md-12 col-xl-3 pd-botton">
                <div className="valuetype">
                    <img src={imgValueType} alt={""} />
                    <span>Loại giá trị</span>
                </div>
            </div>
            {
                valueTypes.map((item, index) => {
                    return (
                        <RenderValueType key={index} item={item} />
                    )
                })
            }
            <div className="col-md-12">
                <Input
                    disabled={isDisableAll}
                    value={packageProfileName}
                    type="text"
                    className="input-deprofile"
                    placeholder="Nhập tên gói Evoucher (*)"
                    onChange={(e) => setPackageProfileName(e.target.value)}
                    maxLength={500}
                />
                <span style={styles.spanLengthName}>{packageProfileName.length}/500</span>
            </div>
            <div className="col-md-12 deprofile-status">
                <span style={styles.fontWeightSpan}>
                    Trạng thái Profile:
                </span>
                <button
                    disabled={isDisableAll}
                    onClick={() => {
                        if (isActived === 1) setIsActived(0)
                        else setIsActived(1)
                    }}
                    className="deprofile-status-btn"
                >
                    {
                        isActived === 1 ?
                            <ToggleOnOutlinedIcon style={styles.active} className={"status-icon" + (isDisableAll ? " " + "disabled" : "")} />
                            :
                            <ToggleOffOutlinedIcon style={styles.notActive} className={"status-icon" + (isDisableAll ? " " + "disabled" : "")} />
                    }
                    <span>{isActived === 1 ? 'Kích hoạt' : 'Chưa kích hoạt'}</span>
                </button>
            </div>
            <div className="col-md-12 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Mô tả chương trình
                </span>
                <div className="deprofile-description">
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
            <div className="col-sm-8 col-md-6 col-xl-5 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Ngân sách tối đa
                </span>
                <Input
                    disabled={isDisableAll || objPackage.evoucherTypeId === 2}
                    value={maxBudget}
                    type="text"
                    className="input-deprofile"
                    placeholder="Nhập ngân sách tối đa..."
                    onChange={(e) => setValueText(e.target.value, setMaxBudget)}
                    maxLength={14}
                />
            </div>
            <div className="col-sm-8 col-md-6 col-xl-5 pd-botton">
                <span style={styles.fontWeightSpan}>
                    Số lượng phát hành tối đa
                    {
                        objPackage.evoucherTypeId === 2 ?
                            <span style={styles.spanColor}>(*)</span>
                            : null
                    }
                </span>
                <Input
                    disabled={isDisableAll || objPackage.evoucherTypeId === 1}
                    value={maxQuantity}
                    type="text"
                    className="input-deprofile"
                    placeholder="Nhập số lượng phát hành..."
                    onChange={(e) => setValueText(e.target.value, setMaxQuantity)}
                    maxLength={10}
                />
            </div>
            <div className="col-sm-8 col-md-6 col-xl-5 pd-botton">
                <div className="deprofile-discounttype">
                    <span style={styles.fontWeightSpan}>
                        Loại giảm giá
                        {
                            objPackage.offerType === 1 ?
                                <span style={styles.spanColor}>(*)</span>
                                : null
                        }
                    </span>
                    <Select
                        value={"id"}
                        display={"title"}
                        data={discountTypes}
                        valueSelect={discountType}
                        setValueSelect={setDiscountType}
                        className="discounttype-select"
                        disabled={isDisableAll || objPackage.offerType !== 1}
                    />
                </div>
            </div>
        </ContainerScreen>
    )
}

const discountTypes = [
    {
        id: 1,
        title: "Giỏ hàng",
    },
    {
        id: 2,
        title: "Sản phẩm",
    },
    {
        id: 3,
        title: "Sản phẩm giá trị thấp nhất",
    },
    {
        id: 4,
        title: "Sản phẩm giá trị cao nhất",
    },
]

const valueTypes = [
    {
        id: 1,
        title: "Số tiền",
        description: "Số tiền..."
    },
    {
        id: 2,
        title: "Linh hoạt",
        description: "Linh hoạt..."
    },
    {
        id: 3,
        title: "Phần trăm",
        description: "Phần trăm..."
    }
]

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

export default ProfileInfo
