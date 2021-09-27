import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { SideBarPage, EHeaderComponent, LoadingComponent } from '../../components';
import { toast, getCache } from '../../common';
import { bindActionCreators } from "redux";
import * as declarePackageAction from "./action";
import { connect } from 'react-redux';
import EPackageShareUpdate from './components/ePackageShare/EPackageShareUpdate';
import EpackageNumOfApp from './components/ePackageNumOfApp';
import EpackageRedeemer from './components/EpackageRedeemer';
import EPackageInfo from './components/ePackageInfo';
import Issurer from './components/issurer';
import CharacterReleases from './components/characterReleases';
import imgGiamGia from '../../../assets/images/giamgia.jpg';
import imgHTTT from '../../../assets/images/httt.jpg';
import imgQuaTang from '../../../assets/images/quatang.jpg';
import { useParams } from 'react-router-dom';

const DeclarePackage = (props) => {
    const {
        declarePackageAction,
        // listRedeemer,
        listCompany,
        listProvince,
        listCompanyBrand,
        listOutputType,
        getCache,
    } = props;

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    

    useEffect(() => {
        // console.log(location.state)
        if (location.state && location.state.objPackage) {
            const { objPackage } = location.state;
            if (location.state.isCopy) {//sao chép
                getEpackageInfo(objPackage.packageId)
            } else {//từ màn hình redeemer trở về
                setDataPackage(objPackage)
            }
        } else {
            if (id) {//lần đầu vào chỉnh sửa thì lấy data
                //lấy data
                getEpackageInfo(id)
            } else {//thêm mới
            }
        }
    }, [])
    const [isLoading, setIsLoading] = useState(false)
    const [idPage, setIdPage] = useState(1)
    const [namePage, setNamePage] = useState("Thông tin chung")
    const [offerType, setOfferType] = useState(0)
    const [isDisableAll, setIsDisableAll] = useState(false)

    //info
    const [eVoucherTypeId, setEVoucherTypeId] = useState(2)//loại code
    const [evoucherName, setEvoucherName] = useState("")//tên gói
    const [isApplyInPerson, setIsApplyInPerson] = useState(1)//áp dụng 1 lần khách hàng
    const [isActived, setIsActived] = useState(0)//kích hoạt
    const [description, setDescription] = useState("")//mô tả
    const [eVoucherSrc, setEVoucherSrc] = useState(1)//nguồn phát hành
    const [currencyCode, setCurrencyCode] = useState(1)//đơn vị tiền tệ
    const [cashOutAllowed, setCashOutAllowed] = useState(0)//quy đổi tiền mặt
    const [isCheckCustomerInfo, setCheckCustomerInfo] = useState(0)//có yêu cầu kt tt khách hàng
    const [cusInfoCMND, setCusInfoCMND] = useState(0)//kt CMND/CCCD
    const [cusInfoSDT, setCusInfoSDT] = useState(0)//kt SDT

    //số lần áp dụng
    //customer
    const [numCusApp, setNumCusApp] = useState("")
    const [maxEvoucherTypeCus, setMaxEvoucherTypeCus] = useState(0)
    const [isCusDay, setIsCusDay] = useState(0)
    const [isCusWeek, setIsCusWeek] = useState(0)
    const [isCusMonth, setIsCusMonth] = useState(0)
    const [isCusYear, setIsCusYear] = useState(0)
    const [valueCusDay, setValueCusDay] = useState("")
    const [valueCusWeek, setValueCusWeek] = useState("")
    const [valueCusMonth, setValueCusMonth] = useState("")
    const [valueCusYear, setValueCusYear] = useState("")

    //package
    const [numPackApp, setNumPackApp] = useState("")
    const [maxEvoucherTypePackage, setMaxEvoucherTypePackage] = useState(0)
    const [isPackDay, setIsPackDay] = useState(0)
    const [isPackWeek, setIsPackWeek] = useState(0)
    const [isPackMonth, setIsPackMonth] = useState(0)
    const [isPackYear, setIsPackYear] = useState(0)
    const [valuePackDay, setValuePackDay] = useState("")
    const [valuePackWeek, setValuePackWeek] = useState("")
    const [valuePackMonth, setValuePackMonth] = useState("")
    const [valuePackYear, setValuePackYear] = useState("")

    //ký tự đặc biệt
    const [codeLength, setCodeLength] = useState("8")
    const [characterSet, setCharacterSet] = useState("0")
    const [disallowedCharacters, setDisallowedCharacters] = useState("")
    const [prefix, setPrefix] = useState("")
    const [postfix, setPostfix] = useState("")
    const [pattern, setPattern] = useState("")
    const [isErrorPatternSingleCode, setIsErrorPatternSingleCode] = useState(false)
    const [generateQuantity, setGenerateQuantity] = useState("");


    //nhà phát hành
    const [issueBy, setIssueBy] = useState("")

    //Quy định áp dụng
    const [dataRedeemer, setDataRedeemer] = useState([])

    //lưu data để truyền ngược lại
    const [image_Template, setImage_Template] = useState(null)
    const [qr_Template, setQr_Template] = useState(null)
    const [refundMethodId, setRefundMethodId] = useState(null)
    const [cusInfoTelId, setCusInfoTelId] = useState(null)
    const [cusInfoIDCardId, setCusInfoIDCardId] = useState(null)
    const [critCusId, setCritCusId] = useState(null)
    const [critCusDayId, setCritCusDayId] = useState(null)
    const [critCusWeekId, setCritCusWeekId] = useState(null)
    const [critCusMonthId, setCritCusMonthId] = useState(null)
    const [critCusYearId, setCritCusYearId] = useState(null)
    const [critPackId, setCritPackId] = useState(null)
    const [critPackDayId, setCritPackDayId] = useState(null)
    const [critPackWeekId, setCritPackWeekId] = useState(null)
    const [critPackMonthId, setCritPackMonthId] = useState(null)
    const [critPackYearId, setCritPackYearId] = useState(null)

    const getEpackageInfo = (packageId) => {
        setIsLoading(true)
        declarePackageAction.getEpackageInfo(packageId)
            .then((res) => {
                // console.log(res)
                setOfferType(res.offerType)
                setEVoucherTypeId(res.evoucherTypeId)
                setEvoucherName(res.packageName)
                if (res.valueCritCus == 1) {
                    setIsApplyInPerson(1)
                } else {
                    setIsApplyInPerson(0)
                }
                setIsActived(res.isActived)
                setDescription(res.description)
                setEVoucherSrc(res.evoucherSourceCode)
                setCurrencyCode(res.currencyCode)
                setCashOutAllowed(res.cashoutAllowed)
                setCheckCustomerInfo(res.checkCustomerInformation)
                setCusInfoCMND(res.checkCusIDCard)
                setCusInfoSDT(res.checkCusInfoTel)
                setCodeLength(res.codeLength)
                setCharacterSet(res.characterSet)
                setDisallowedCharacters(res.disallowedCharacters)
                setPrefix(res.prefix)
                setPostfix(res.postfix)
                setPattern(res.pattern)
                setIssueBy(res.issueBy)

                setNumCusApp(res.valueCritCus)
                setMaxEvoucherTypeCus(res.checkCusAdvancedSetting)
                setIsCusDay(res.checkCritCusDay)
                setIsCusWeek(res.checkCritCusWeek)
                setIsCusMonth(res.checkCritCusMonth)
                setIsCusYear(res.checkCritCusYear)
                setValueCusDay(res.valueCritCusDay)
                setValueCusWeek(res.valueCritCusWeek)
                setValueCusMonth(res.valueCritCusMonth)
                setValueCusYear(res.valueCritCusYear)
                setNumPackApp(res.valueCritPack)
                setMaxEvoucherTypePackage(res.checkPackAdvancedSetting)
                setIsPackDay(res.checkCritPackDay)
                setIsPackWeek(res.checkCritPackWeek)
                setIsPackMonth(res.checkCritPackMonth)
                setIsPackYear(res.checkCritPackYear)
                setValuePackDay(res.valueCritPackDay)
                setValuePackWeek(res.valueCritPackWeek)
                setValuePackMonth(res.valueCritPackMonth)
                setValuePackYear(res.valueCritPackYear)

                //data truyền lại khi update
                setImage_Template(res.image_Template)
                setQr_Template(res.qr_Template)
                setRefundMethodId(res.refundMethodId)
                setCusInfoTelId(res.cusInfoTelId)
                setCusInfoIDCardId(res.cusInfoIDCardId)
                setCritCusId(res.critCusId)
                setCritCusDayId(res.critCusDayId)
                setCritCusWeekId(res.critCusWeekId)
                setCritCusMonthId(res.critCusMonthId)
                setCritCusYearId(res.critCusYearId)
                setCritPackId(res.critPackId)
                setCritPackDayId(res.critPackDayId)
                setCritPackWeekId(res.critPackWeekId)
                setCritPackMonthId(res.critPackMonthId)
                setCritPackYearId(res.critPackYearId)
                
                setDataRedeemer(res.lstRedeemer)
                if (res.isActived === 1 && id) {
                    setIsDisableAll(true)
                }
                setIsLoading(false)

            })
            .catch((error) => {
                toast.notifyError("Lấy thông tin: " + error.msgError)
                // console.log(error)
            });
    }


    const createObjPackage = () => {
        return {
            offerType: offerType,
            evoucherTypeId: eVoucherTypeId,
            packageName: evoucherName,
            maxEvoucherType: isApplyInPerson,
            isActived: isActived,
            description: description,
            evoucherSourceCode: eVoucherSrc,
            currencyCode: currencyCode,
            cashoutAllowed: cashOutAllowed,
            checkCustomerInformation: isCheckCustomerInfo,
            checkCusIDCard: cusInfoCMND,
            checkCusInfoTel: cusInfoSDT,
            codeLength: codeLength,
            characterSet: characterSet,
            disallowedCharacters: disallowedCharacters,
            prefix: prefix,
            postfix: postfix,
            pattern: pattern,
            issueBy: issueBy,
            valueCritCus: numCusApp,
            checkCusAdvancedSetting: maxEvoucherTypeCus,
            checkCritCusDay: isCusDay,
            valueCritCusDay: valueCusDay,
            checkCritCusWeek: isCusWeek,
            valueCritCusWeek: valueCusWeek,
            checkCritCusMonth: isCusMonth,
            valueCritCusMonth: valueCusMonth,
            checkCritCusYear: isCusYear,
            valueCritCusYear: valueCusYear,
            valueCritPack: numPackApp,
            checkPackAdvancedSetting: maxEvoucherTypePackage,
            checkCritPackDay: isPackDay,
            valueCritPackDay: valuePackDay,
            checkCritPackWeek: isPackWeek,
            valueCritPackWeek: valuePackWeek,
            checkCritPackMonth: isPackMonth,
            valueCritPackMonth: valuePackMonth,
            checkCritPackYear: isPackYear,
            valueCritPackYear: valuePackYear,
            lstRedeemer: dataRedeemer,
            image_Template: image_Template,
            qr_Template: qr_Template,
            refundMethodId: refundMethodId,
            cusInfoTelId: cusInfoTelId,
            cusInfoIDCardId: cusInfoIDCardId,
            critCusId: critCusId,
            critCusDayId: critCusDayId,
            critCusWeekId: critCusWeekId,
            critCusMonthId: critCusMonthId,
            critCusYearId: critCusYearId,
            critPackId: critPackId,
            critPackDayId: critPackDayId,
            critPackWeekId: critPackWeekId,
            critPackMonthId: critPackMonthId,
            critPackYearId: critPackYearId
        }
    }

    const setDataPackage = (res) => {
        setOfferType(res.offerType)
        setEVoucherTypeId(res.evoucherTypeId)
        setEvoucherName(res.packageName)
        if (res.valueCritCus == 1) {
            setIsApplyInPerson(1)
        } else {
            setIsApplyInPerson(0)
        }
        setIsActived(res.isActived)
        setDescription(res.description)
        setEVoucherSrc(res.evoucherSourceCode)
        setCurrencyCode(res.currencyCode)
        setCashOutAllowed(res.cashoutAllowed)
        setCheckCustomerInfo(res.checkCustomerInformation)
        setCusInfoCMND(res.checkCusIDCard)
        setCusInfoSDT(res.checkCusInfoTel)
        setCodeLength(res.codeLength)
        setCharacterSet(res.characterSet)
        setDisallowedCharacters(res.disallowedCharacters)
        setPrefix(res.prefix)
        setPostfix(res.postfix)
        setPattern(res.pattern)
        setIssueBy(res.issueBy)

        setNumCusApp(res.valueCritCus)
        setMaxEvoucherTypeCus(res.checkCusAdvancedSetting)
        setIsCusDay(res.checkCritCusDay)
        setIsCusWeek(res.checkCritCusWeek)
        setIsCusMonth(res.checkCritCusMonth)
        setIsCusYear(res.checkCritCusYear)
        setValueCusDay(res.valueCritCusDay)
        setValueCusWeek(res.valueCritCusWeek)
        setValueCusMonth(res.valueCritCusMonth)
        setValueCusYear(res.valueCritCusYear)
        setNumPackApp(res.valueCritPack)
        setMaxEvoucherTypePackage(res.checkPackAdvancedSetting)
        setIsPackDay(res.checkCritPackDay)
        setIsPackWeek(res.checkCritPackWeek)
        setIsPackMonth(res.checkCritPackMonth)
        setIsPackYear(res.checkCritPackYear)
        setValuePackDay(res.valueCritPackDay)
        setValuePackWeek(res.valueCritPackWeek)
        setValuePackMonth(res.valueCritPackMonth)
        setValuePackYear(res.valueCritPackYear)

        //data truyền lại khi update
        setImage_Template(res.image_Template)
        setQr_Template(res.qr_Template)
        setRefundMethodId(res.refundMethodId)
        setCusInfoTelId(res.cusInfoTelId)
        setCusInfoIDCardId(res.cusInfoIDCardId)
        setCritCusId(res.critCusId)
        setCritCusDayId(res.critCusDayId)
        setCritCusWeekId(res.critCusWeekId)
        setCritCusMonthId(res.critCusMonthId)
        setCritCusYearId(res.critCusYearId)
        setCritPackId(res.critPackId)
        setCritPackDayId(res.critPackDayId)
        setCritPackWeekId(res.critPackWeekId)
        setCritPackMonthId(res.critPackMonthId)
        setCritPackYearId(res.critPackYearId)

        setDataRedeemer(res.lstRedeemer)
        if (res.isActived === 1 && id) {
            setIsDisableAll(true)
        }
        setIdPage(5)
    }

    const selectEvoucherType = (n) => {
        if (n === 2) {
            setIsApplyInPerson(1)
        }else{
            setNumCusApp("1")
        }
        setEVoucherTypeId(n)
        setPattern("")
        setGenerateQuantity("")
        setPostfix("")
        setPrefix("")
        setDisallowedCharacters("")
        setIsErrorPatternSingleCode(false)
        setCharacterSet("0")
        setNumCusApp("")
        setMaxEvoucherTypeCus(0)
        setIsCusDay(0)
        setIsCusWeek(0)
        setIsCusMonth(0)
        setIsCusYear(0)
        setValueCusDay("")
        setValueCusWeek("")
        setValueCusMonth("")
        setValueCusYear("")
        setNumPackApp("")
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

    const goback = () => {
        history.push('/evoucher-package')
    }

    const RenderOfferType = ({ item }) => {
        return (
            <button onClick={() => setOfferType(item.id)} className="offertype-item">
                <img src={item.image} alt="" />
                <div>
                    <span>{item.title}</span>
                </div>
            </button>
        )
    }

    const onDeclare = () => {
        //validate objinfo
        if (offerType === 0) {
            toast.notifyWarning('Vui lòng chọn loại ưu đãi ở màn hình thông tin chung!');
            return;
        }
        if (!evoucherName) {
            toast.notifyWarning('Vui lòng nhập tên gói Evoucher ở màn hình thông tin chung!');
            return;
        }
        if (!eVoucherSrc) {
            toast.notifyWarning('Vui lòng chọn nguồn phát hành ở màn hình thông tin chung!');
            return;
        }
        if (!currencyCode) {
            toast.notifyWarning('Vui lòng chọn đơn vị tiền tệ ở màn hình thông tin chung!');
            return;
        }
        //validate số lần áp dụng
        if (eVoucherTypeId === 1) {
            if (maxEvoucherTypeCus === 0 && maxEvoucherTypePackage === 0 && !numCusApp && !numPackApp) {
                toast.notifyWarning('Vui lòng nhập số lần áp dụng');
                return;
            }
            if (maxEvoucherTypeCus === 1) {
                if ((!isCusDay && !isCusWeek && !isCusMonth && !isCusYear) || (isCusDay < 1 && isCusWeek < 1 && isCusMonth < 1 && isCusYear < 1)) {
                    toast.notifyWarning('Vui lòng thiết lập số lần áp dụng cho mỗi khách hàng ở màn hình số lần áp dụng!');
                    return;
                } else {
                    if (isCusDay !== 0 && !valueCusDay) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isCusWeek !== 0 && !valueCusWeek) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isCusMonth !== 0 && !valueCusMonth) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isCusYear !== 0 && !valueCusYear) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                }
            }
            if (maxEvoucherTypePackage === 2) {
                if ((!isPackDay && !isPackWeek && !isPackMonth && !isPackYear) || (isPackDay < 1 && isPackWeek < 1 && isPackMonth < 1 && isPackYear < 1)) {
                    toast.notifyWarning('Vui lòng thiết lập số lần áp dụng cho chương trình ở màn hình số lần áp dụng!');
                    return;
                } else {
                    if (isPackDay !== 0 && !valuePackDay) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isPackWeek !== 0 && !valuePackWeek) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isPackMonth !== 0 && !valuePackMonth) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                    if (isPackYear !== 0 && !valuePackYear) {
                        toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                        return;
                    }
                }
            }
        } else {//multi
            // console.log(isPackDay)
            // if ((!isPackDay && !isPackWeek && !isPackMonth && !isPackYear) || (isPackDay < 1 && isPackWeek < 1 && isPackMonth < 1 && isPackYear < 1)) {
            //     toast.notifyWarning('Vui lòng thiết lập số lần áp dụng cho chương trình ở màn hình số lần áp dụng!');
            //     return;
            // } else {

            // }
            if (isPackDay !== 0 && !valuePackDay) {
                toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                return;
            }
            if (isPackWeek !== 0 && !valuePackWeek) {
                toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                return;
            }
            if (isPackMonth !== 0 && !valuePackMonth) {
                toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                return;
            }
            if (isPackYear !== 0 && !valuePackYear) {
                toast.notifyWarning('Vui lòng nhập giá trị cho ngày ở màn hình số lần áp dụng!');
                return;
            }
        }

        //Ký tự đặc biệt
        if (eVoucherTypeId === 1) {
            if (!pattern) {
                toast.notifyWarning('Vui lòng nhập mẫu ký tự cho Single code ở màn hình ký tự phát sinh!');
                return;
            }
            if (isErrorPatternSingleCode) {
                toast.notifyWarning("Mẫu ký tự bị trùng với những mã Evoucher đã tồn tại, Vui lòng khai báo lại!")
                return;
            }
        }

        //Nhà phát hành
        if (!issueBy) {
            toast.notifyWarning('Vui lòng chọn nhà phát hành!');
            return;
        }

        //Quy định áp dụng
        if (dataRedeemer.length === 0 || dataRedeemer.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
            toast.notifyWarning('Vui lòng chọn bộ quy định áp dụng!');
            return;
        }

        // console.log('not error')
        if (!id) {
            addEpackage()
        }
        else {
            updateEpackage()
        }
    }

    const addEpackage = () => {
        const { userData } = props;
        setIsLoading(true)
        let params = {
            packageName: evoucherName,
            description: description,
            cashoutAllowed: cashOutAllowed,
            offerType: offerType,
            currencyCode: currencyCode,
            image_Template: "",
            qr_Template: "",
            evoucherSourceCode: eVoucherSrc,
            refundMethodId: null,
            evoucherTypeId: eVoucherTypeId,
            checkCustomerInformation: isCheckCustomerInfo,
            codeLength: codeLength,
            characterSet: characterSet,
            disallowedCharacters: disallowedCharacters,
            prefix: prefix,
            postfix: postfix,
            pattern: pattern,
            issueBy: issueBy,
            isActived: isActived,
            createdUser: userData.profile.Username,
            checkCusInfoTel: cusInfoSDT,
            checkCusIDCard: cusInfoCMND,
            valueCritCus: numCusApp,
            checkCritCusDay: isCusDay,
            valueCritCusDay: valueCusDay,
            checkCritCusWeek: isCusWeek,
            valueCritCusWeek: valueCusWeek,
            checkCritCusMonth: isCusMonth,
            valueCritCusMonth: valueCusMonth,
            checkCritCusYear: isCusYear,
            valueCritCusYear: valueCusYear,
            valueCritPack: numPackApp,
            checkCritPackDay: isPackDay,
            valueCritPackDay: valuePackDay,
            checkCritPackWeek: isPackWeek,
            valueCritPackWeek: valuePackWeek,
            checkCritPackMonth: isPackMonth,
            valueCritPackMonth: valuePackMonth,
            checkCritPackYear: isPackYear,
            valueCritPackYear: valuePackYear,
            lstEvoucherRedeemer: dataRedeemer
        }
        declarePackageAction.addEpackage(params)
            .then((res) => {
                setIsLoading(false)
                // console.log(res)
                toast.notifySuccess("Thêm mới thành công!")
                goback()
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError(error.msgError)
                // console.log(error)
            });
    }

    const updateEpackage = () => {
        setIsLoading(true)
        const {
            userData,
            objInfo
        } = props;
        let params = {
            packageId: id,
            packageName: evoucherName,
            description: description,
            cashoutAllowed: cashOutAllowed,
            offerType: offerType,
            currencyCode: currencyCode,
            image_Template: image_Template,
            qr_Template: qr_Template,
            evoucherSourceCode: eVoucherSrc,
            refundMethodId: refundMethodId,
            evoucherTypeId: eVoucherTypeId,
            checkCustomerInformation: isCheckCustomerInfo,
            codeLength: codeLength,
            characterSet: characterSet,
            disallowedCharacters: disallowedCharacters,
            prefix: prefix,
            postfix: postfix,
            pattern: pattern,
            issueBy: issueBy,
            isActived: isActived,
            updatedUser: userData.profile.Username,
            cusInfoTelId: cusInfoTelId,
            cusInfoIDCardId: cusInfoIDCardId,
            checkCusInfoTel: cusInfoSDT,
            checkCusIDCard: cusInfoCMND,
            critCusId: critCusId,
            valueCritCus: numCusApp,
            critCusDayId: critCusDayId,
            checkCritCusDay: isCusDay,
            valueCritCusDay: valueCusDay,
            critCusWeekId: critCusWeekId,
            checkCritCusWeek: isCusWeek,
            valueCritCusWeek: valueCusWeek,
            critCusMonthId: critCusMonthId,
            checkCritCusMonth: isCusMonth,
            valueCritCusMonth: valueCusMonth,
            critCusYearId: critCusYearId,
            checkCritCusYear: isCusYear,
            valueCritCusYear: valueCusYear,
            critPackId: critPackId,
            valueCritPack: numPackApp,
            critPackDayId: critPackDayId,
            checkCritPackDay: isPackDay,
            valueCritPackDay: valuePackDay,
            critPackWeekId: critPackWeekId,
            checkCritPackWeek: isPackWeek,
            valueCritPackWeek: valuePackWeek,
            critPackMonthId: critPackMonthId,
            checkCritPackMonth: isPackMonth,
            valueCritPackMonth: valuePackMonth,
            critPackYearId: critPackYearId,
            checkCritPackYear: isPackYear,
            valueCritPackYear: valuePackYear,
            lstEvoucherRedeemer: dataRedeemer
        }
        // console.log('params update', params)
        declarePackageAction.updateEpackage(params)
            .then((res) => {
                // if (isActived == 1) {
                //     setIsDisableAll(true)
                // }
                goback()
                setIsLoading(false)
                toast.notifySuccess("Cập nhật thành công!")
                // console.log(res)
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError(error.msgError)
                // console.log(error)
            });
    }

    const genCharacterEpackage = () => {
        if (!codeLength || parseInt(codeLength) < 8) {
            toast.notifyWarning("Tổng số ký tự quy định của mã Evoucher phải lơn hoặc bằng 8!")
            return;
        }
        setIsLoading(true)
        var params = {
            codeLength: codeLength,
            characterSet: characterSet,
            disallowedCharacters: disallowedCharacters,
            prefix: prefix,
            postfix: postfix,
            pattern: ""
        }
        declarePackageAction.genCharacterEpackage(params)
            .then((res) => {
                setIsLoading(false)
                // console.log(res)
                if (res) {
                    setPattern(res.generateCode)
                    setGenerateQuantity(res.generateQuantity)
                } else {
                    toast.notifyError("Lỗi lấy chuỗi ký tự minh họa!")
                }
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError(error.msgError)
                // console.log(error)
            });
    }

    return (
        <SideBarPage
            dataPage={dataPage}
            idPage={idPage}
            setNamePage={setNamePage}
            setIdPage={setIdPage}
        >
            <EHeaderComponent title={'KHAI BÁO GÓI EVOUCHER'} goback={goback} />
            {
                idPage === 1 ?
                    offerType > 0 ?
                        <EPackageShareUpdate
                            title={idPage + '. ' + namePage}
                            goback={goback}
                            onDeclare={onDeclare}
                            isDisableAll={isDisableAll}
                        >
                            <EPackageInfo
                                eVoucherTypeId={eVoucherTypeId}
                                setEVoucherTypeId={setEVoucherTypeId}
                                evoucherName={evoucherName}
                                setEvoucherName={setEvoucherName}
                                isApplyInPerson={isApplyInPerson}
                                setIsApplyInPerson={setIsApplyInPerson}
                                isActived={isActived}
                                setIsActived={setIsActived}
                                description={description}
                                setDescription={setDescription}
                                eVoucherSrc={eVoucherSrc}
                                setEVoucherSrc={setEVoucherSrc}
                                currencyCode={currencyCode}
                                setCurrencyCode={setCurrencyCode}
                                cashOutAllowed={cashOutAllowed}
                                setCashOutAllowed={setCashOutAllowed}
                                isCheckCustomerInfo={isCheckCustomerInfo}
                                setCheckCustomerInfo={setCheckCustomerInfo}
                                cusInfoCMND={cusInfoCMND}
                                setCusInfoCMND={setCusInfoCMND}
                                cusInfoSDT={cusInfoSDT}
                                setCusInfoSDT={setCusInfoSDT}
                                isDisableAll={isDisableAll}
                                selectEvoucherType={selectEvoucherType}
                            />
                        </EPackageShareUpdate>
                        :
                        <div className="offertype-container">
                            <div className="offer-type">
                                <div className="offertype-title">
                                    <span>LOẠI ƯU ĐÃI</span>
                                </div>
                                <div className="offertype-container-item">
                                    {
                                        offerTypes.map((item, index) => {
                                            return (
                                                <RenderOfferType item={item} key={index} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    : null
            }
            {
                idPage === 2 ?
                    <EPackageShareUpdate
                        title={idPage + '. ' + namePage}
                        goback={goback}
                        onDeclare={onDeclare}
                        isDisableAll={isDisableAll}
                    >
                        <EpackageNumOfApp
                            evoucherTypeId={eVoucherTypeId}
                            numCusApp={numCusApp}
                            setNumCusApp={setNumCusApp}
                            maxEvoucherTypeCus={maxEvoucherTypeCus}
                            setMaxEvoucherTypeCus={setMaxEvoucherTypeCus}
                            isCusDay={isCusDay}
                            setIsCusDay={setIsCusDay}
                            isCusWeek={isCusWeek}
                            setIsCusWeek={setIsCusWeek}
                            isCusMonth={isCusMonth}
                            setIsCusMonth={setIsCusMonth}
                            isCusYear={isCusYear}
                            setIsCusYear={setIsCusYear}
                            valueCusDay={valueCusDay}
                            setValueCusDay={setValueCusDay}
                            valueCusWeek={valueCusWeek}
                            setValueCusWeek={setValueCusWeek}
                            valueCusMonth={valueCusMonth}
                            setValueCusMonth={setValueCusMonth}
                            valueCusYear={valueCusYear}
                            setValueCusYear={setValueCusYear}
                            numPackApp={numPackApp}
                            setNumPackApp={setNumPackApp}
                            maxEvoucherTypePackage={maxEvoucherTypePackage}
                            setMaxEvoucherTypePackage={setMaxEvoucherTypePackage}
                            isPackDay={isPackDay}
                            setIsPackDay={setIsPackDay}
                            isPackWeek={isPackWeek}
                            setIsPackWeek={setIsPackWeek}
                            isPackMonth={isPackMonth}
                            setIsPackMonth={setIsPackMonth}
                            isPackYear={isPackYear}
                            setIsPackYear={setIsPackYear}
                            valuePackDay={valuePackDay}
                            setValuePackDay={setValuePackDay}
                            valuePackWeek={valuePackWeek}
                            setValuePackWeek={setValuePackWeek}
                            valuePackMonth={valuePackMonth}
                            setValuePackMonth={setValuePackMonth}
                            valuePackYear={valuePackYear}
                            setValuePackYear={setValuePackYear}
                            isDisableAll={isDisableAll}
                            isApplyInPerson={isApplyInPerson}
                            setIsApplyInPerson={setIsApplyInPerson}
                        />
                    </EPackageShareUpdate>

                    : null
            }
            {
                idPage === 3 ?
                    <EPackageShareUpdate
                        title={idPage + '. ' + namePage}
                        goback={goback}
                        onDeclare={onDeclare}
                        isDisableAll={isDisableAll}
                    >
                        <CharacterReleases
                            eVoucherTypeId={eVoucherTypeId}
                            characterSet={characterSet}
                            setCharacterSet={setCharacterSet}
                            codeLength={codeLength}
                            setCodeLength={setCodeLength}
                            disallowedCharacters={disallowedCharacters}
                            setDisallowedCharacters={setDisallowedCharacters}
                            prefix={prefix}
                            setPrefix={setPrefix}
                            postfix={postfix}
                            setPostfix={setPostfix}
                            pattern={pattern}
                            setPattern={setPattern}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            notifyWarning={toast.notifyWarning}
                            notifyError={toast.notifyError}
                            setIsErrorPatternSingleCode={setIsErrorPatternSingleCode}
                            genCharacterEpackage={genCharacterEpackage}
                            generateQuantity={generateQuantity}
                            setGenerateQuantity={setGenerateQuantity}
                            isDisableAll={isDisableAll}
                        />
                    </EPackageShareUpdate>
                    : null
            }
            {
                idPage === 4 ?
                    <EPackageShareUpdate
                        title={idPage + '. ' + namePage}
                        goback={goback}
                        onDeclare={onDeclare}
                        isDisableAll={isDisableAll}
                    >
                        <Issurer
                            issueBy={issueBy}
                            setIssueBy={setIssueBy}
                            isDisableAll={isDisableAll}
                            getCache={getCache}
                            setIsLoading={setIsLoading}
                            listCompany={listCompany}
                        />
                    </EPackageShareUpdate>
                    : null
            }
            {
                idPage === 5 ?
                    <EPackageShareUpdate
                        title={idPage + '. ' + namePage}
                        goback={goback}
                        onDeclare={onDeclare}
                        isDisableAll={isDisableAll}
                    >
                        <EpackageRedeemer
                            packageId={id}
                            dataRedeemer={dataRedeemer}
                            setDataRedeemer={setDataRedeemer}
                            isDisableAll={isDisableAll}
                            history={history}
                            notifyError={toast.notifyError}
                            getCache={getCache}
                            createObjPackage={createObjPackage}
                            listProvince={listProvince}
                            listCompanyBrand={listCompanyBrand}
                            listOutputType={listOutputType}
                        />
                    </EPackageShareUpdate>

                    : null
            }
            <LoadingComponent isLoading={isLoading} />
        </SideBarPage>
    )
}

const mapStateToProps = (state) => ({
    userData: state.auth.infoUser.userData,
    objInfo: state.declarePackage.epackageInfo.objInfo,
    // listRedeemer: state.redeemer.lstRedeemer.dataRedeemer,
    listCompany: state.cache.company.data,
    listProvince: state.cache.province.data,
    listCompanyBrand: state.cache.companyBrand.data,
    listOutputType: state.cache.outputType.data,
})

const mapDispatchToProps = (dispatch) => ({
    declarePackageAction: bindActionCreators(declarePackageAction, dispatch),
    getCache: bindActionCreators(getCache, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DeclarePackage);


const dataPage = [
    {
        id: 1,
        name: "Thông tin chung",
        icon: "fa fa-info-circle",
    },
    {
        id: 2,
        name: "Số lần áp dụng",
        icon: "fa fa-list-ol",
    },
    {
        id: 3,
        name: "Ký tự phát sinh",
        icon: "fa fa-snowflake-o",
    },
    {
        id: 4,
        name: "Nhà phát hành",
        icon: "fa fa-home",
    },
    {
        id: 5,
        name: "Quy định áp dụng",
        icon: "fa fa-recycle",
    }
]

const offerTypes = [
    {
        id: 1,
        title: "Giảm giá",
        image: imgGiamGia
    },
    {
        id: 2,
        title: "Thanh toán",
        image: imgHTTT
    },
    {
        id: 3,
        title: "Quà tặng",
        image: imgQuaTang
    }
]

