import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { SideBarPage, EHeaderComponent, LoadingComponent } from '../../components'
import { bindActionCreators } from "redux";
import * as declareProfileAction from "./action";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, date as FormatDate } from '../../common';
import PackageShareDeclare from './components/packageProfileShare/packageShareDeclare';
import ProfileInfo from './components/profileInfo';
import ProfileTime from './components/profileTime';
import ProfileApp from './components/profileApp';
const DeclarePackageProfile = (props) => {
    const {
        declareProfileAction
    } = props;
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    // console.log(location)
    const [isLoading, setIsLoading] = useState(false)
    const [idPage, setIdPage] = useState(1)
    const [namePage, setNamePage] = useState("Thông tin chung")
    const [offerType, setOfferType] = useState(0)
    const [isDisableAll, setIsDisableAll] = useState(false)
    const [objPackage, setObjPackage] = useState({})
    //info
    const [valueType, setValueType] = useState(0)
    const [packageProfileName, setPackageProfileName] = useState("")
    const [isActived, setIsActived] = useState(0)
    const [maxBudget, setMaxBudget] = useState("")
    const [maxQuantity, setMaxQuantity] = useState("")
    const [discountType, setDiscountType] = useState("0")
    const [description, setDescription] = useState("")

    //time
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [validDateRuleTypeId, setValidDateRuleTypeId] = useState(1)
    const [validDateRuleValue, setValidDateRuleValue] = useState("")
    const [invalidDateRuleType, setInvalidDateRuleType] = useState(3)
    const [invalidDateRuleTypeValue, setInvalidDateRuleTypeValue] = useState("")

    //bộ giá trị
    const [listValueApp, setListValueApp] = useState([])

    //truyền lại api
    const [discountTypeValue, setDiscountTypeValue] = useState(0)

    useEffect(() => {
        if (location.state && location.state.objPackage) {
            setObjPackage(location.state.objPackage)
            if (location.state.objProfile) {
                const { objProfile } = location.state;
                if (location.state.isCopy) {//sao chép
                    getProfileInfo(objProfile.packageProfileId)
                } else {//từ màn hình profilevalue trở về
                    setDataProfile(objProfile)
                }
            } else {
                if (id) {//chỉnh sửa
                    getProfileInfo(id)
                }
            }
        } else {
            history.push({
                pathname: "/evoucher-package"
            });
        }
    }, [])

    const setDataProfile = (res) => {
        setPackageProfileName(res.packageProfileName)
        setDescription(res.description)
        setMaxQuantity(res.maxQuantity)
        setMaxBudget(res.maxBudget)
        setFromDate(new Date(res.fromDate))
        setToDate(new Date(res.toDate))
        setValueType(res.valueType)
        setDiscountType(res.discountType)
        setDiscountTypeValue(res.discountTypeValue)
        setValidDateRuleTypeId(res.validDateRuleTypeId)
        setValidDateRuleValue(res.validDateRuleValue)
        setInvalidDateRuleType(res.invalidDateRuleType)
        setInvalidDateRuleTypeValue(res.invalidDateRuleTypeValue)
        setIsActived(res.isActived)
        setListValueApp(res.lstProfileValues)
        if (res.isActived === 1 && id) {
            setIsDisableAll(true)
        }
        setIdPage(3)
    }

    const getProfileInfo = (packageProfileId) => {
        setIsLoading(true)
        declareProfileAction.getProfileInfo(parseInt(packageProfileId))
            .then((res) => {
                console.log(res)
                setPackageProfileName(res.packageProfileName)
                setDescription(res.description)
                setMaxQuantity(res.maxQuantity)
                setMaxBudget(res.maxBudget)
                setFromDate(new Date(res.fromDate))
                setToDate(new Date(res.toDate))
                setValueType(res.valueType)
                setDiscountType(res.discountType)
                setDiscountTypeValue(res.discountTypeValue)
                setValidDateRuleTypeId(res.validDateRuleTypeId)
                setValidDateRuleValue(res.validDateRuleValue)
                setInvalidDateRuleType(res.invalidDateRuleType)
                setInvalidDateRuleTypeValue(res.invalidDateRuleTypeValue)
                setIsActived(res.isActived)
                setListValueApp(res.lstProfileValues)
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

    const onDeclare = () => {
        if (objPackage.offerType !== 3 && valueType === 0) {
            toast.notifyWarning('Vui lòng chọn loại giá trị ở màn hình thông tin chung!');
            return;
        }
        if (!packageProfileName) {
            toast.notifyWarning('Vui lòng nhập tên Profile ở màn hình thông tin chung!');
            return;
        }
        if (objPackage.evoucherTypeId === 2 && !maxQuantity) {
            toast.notifyWarning('Vui lòng nhập số lượng phát hành tối đa ở màn hình thông tin chung!');
            return;
        }
        if (objPackage.offerType === 1 && discountType == "0") {
            toast.notifyWarning('Vui lòng chọn loại giảm giá ở màn hình thông tin chung!');
            return;
        }
        //thời gian
        if (!fromDate) {
            toast.notifyWarning('Vui lòng chọn ngày bắt đầu phát hành ở màn hình thời gian!');
            return;
        }
        if (!toDate) {
            toast.notifyWarning('Vui lòng chọn ngày kết thúc phát hành ở màn hình thời gian!');
            return;
        }
        if (validDateRuleTypeId !== 1 && !validDateRuleValue) {
            toast.notifyWarning('Vui lòng nhập hoặc chọn giá trị cho thời gian có hiệu lực ở màn hình thời gian!');
            return;
        }

        if (invalidDateRuleType !== 3 && !invalidDateRuleTypeValue) {
            toast.notifyWarning('Vui lòng nhập hoặc chọn giá trị cho thời gian hết hiệu lực ở màn hình thời gian!');
            return;
        }
        //Bộ áp dụng
        if (listValueApp.length === 0 || listValueApp.filter(x => x.isDeleted || x.isDeleted === 0).length === 0) {
            toast.notifyWarning('Vui lòng chọn bộ giá trị áp dụng!');
            return;
        }

        if (!id) {
            addProfile()
        }
        else {
            updateProfile()
        }
    }

    const addProfile = () => {
        setIsLoading(true)
        const {
            userData
        } = props;

        const params = {
            packageId: objPackage.packageId,
            packageProfileName: packageProfileName,
            description: description,
            maxQuantity: maxQuantity,
            maxBudget: maxBudget,
            fromDate: FormatDate.get_string_current_date_custom(fromDate),
            toDate: FormatDate.get_string_current_date_custom(toDate),
            valueType: valueType,
            discountType: discountType,
            discountTypeValue: discountTypeValue,
            validDateRuleTypeId: validDateRuleTypeId,
            validDateRuleValue: validDateRuleValue,
            invalidDateRuleType: invalidDateRuleType,
            invalidDateRuleTypeValue: invalidDateRuleTypeValue,
            isActived: isActived,
            lstProfileValues: listValueApp,
            createdUser: userData.profile.Username
        }
        console.log(params)
        declareProfileAction.addProfile(params)
            .then((res) => {
                setIsLoading(false)
                console.log(res)
                toast.notifySuccess("Thêm mới thành công!")
                goback()
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError(error.msgError)
                // console.log(error)
            });
    }

    const updateProfile = () => {
        setIsLoading(true)
        const {
            userData
        } = props;
        const params = {
            packageProfileId: parseInt(id),
            packageId: objPackage.packageId,
            packageProfileName: packageProfileName,
            description: description,
            maxQuantity: maxQuantity,
            maxBudget: maxBudget,
            fromDate: FormatDate.get_string_current_date_custom(fromDate),
            toDate: FormatDate.get_string_current_date_custom(toDate),
            valueType: valueType,
            discountType: discountType,
            discountTypeValue: discountTypeValue,
            validDateRuleTypeId: validDateRuleTypeId,
            validDateRuleValue: validDateRuleValue,
            invalidDateRuleType: invalidDateRuleType,
            invalidDateRuleTypeValue: invalidDateRuleTypeValue,
            isActived: isActived,
            lstProfileValues: listValueApp,
            updatedUser: userData.profile.Username
        }
        console.log(params)
        declareProfileAction.updateProfile(params)
            .then((res) => {
                // if (isActived == 1) {
                //     setIsDisableAll(true)
                // }
                goback()
                setIsLoading(false)
                toast.notifySuccess("Cập nhật thành công!")
                console.log(res)
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError(error.msgError)
                // console.log(error)
            });
    }

    const createObjProfile = () => {
        if (objPackage.offerType !== 3 && valueType === 0) {
            toast.notifyWarning('Vui lòng chọn loại giá trị ở màn hình thông tin chung!');
            return;
        }
        if (!fromDate) {
            toast.notifyWarning('Vui lòng chọn ngày bắt đầu phát hành ở màn hình thời gian!');
            return null;
        }
        if (!toDate) {
            toast.notifyWarning('Vui lòng chọn ngày kết thúc phát hành ở màn hình thời gian!');
            return null;
        }
        return {
            packageId: objPackage.packageId,
            packageProfileName: packageProfileName,
            description: description,
            maxQuantity: maxQuantity,
            maxBudget: maxBudget,
            fromDate: fromDate,
            toDate: toDate,
            valueType: valueType,
            discountType: discountType,
            discountTypeValue: discountTypeValue,
            validDateRuleTypeId: validDateRuleTypeId,
            validDateRuleValue: validDateRuleValue,
            invalidDateRuleType: invalidDateRuleType,
            invalidDateRuleTypeValue: invalidDateRuleTypeValue,
            isActived: isActived,
            lstProfileValues: listValueApp
        }
    }

    const goback = () => {
        history.push({
            pathname: "/package-profile",
            state: {
                objPackage: objPackage
            }
        });
    }

    return (
        <SideBarPage
            dataPage={dataPage}
            idPage={idPage}
            setNamePage={setNamePage}
            setIdPage={setIdPage}
        >
            <EHeaderComponent title={'KHAI BÁO PROFILE - ' + objPackage.packageId + ' - ' + objPackage.packageName} goback={goback} />
            <PackageShareDeclare
                title={idPage + '. ' + namePage}
                goback={goback}
                onDeclare={onDeclare}
                disabled={isDisableAll}
            >
                {
                    idPage === 1 ?
                        <ProfileInfo
                            valueType={valueType}
                            setValueType={setValueType}
                            packageProfileName={packageProfileName}
                            setPackageProfileName={setPackageProfileName}
                            isActived={isActived}
                            setIsActived={setIsActived}
                            maxBudget={maxBudget}
                            setMaxBudget={setMaxBudget}
                            maxQuantity={maxQuantity}
                            setMaxQuantity={setMaxQuantity}
                            discountType={discountType}
                            setDiscountType={setDiscountType}
                            description={description}
                            setDescription={setDescription}
                            isDisableAll={isDisableAll}
                            objPackage={objPackage}
                        />
                        : null
                }
                {
                    idPage === 2 ?
                        <ProfileTime
                            isDisableAll={isDisableAll}
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            toDate={toDate}
                            setToDate={setToDate}
                            validDateRuleTypeId={validDateRuleTypeId}
                            setValidDateRuleTypeId={setValidDateRuleTypeId}
                            validDateRuleValue={validDateRuleValue}
                            setValidDateRuleValue={setValidDateRuleValue}
                            invalidDateRuleType={invalidDateRuleType}
                            setInvalidDateRuleType={setInvalidDateRuleType}
                            invalidDateRuleTypeValue={invalidDateRuleTypeValue}
                            setInvalidDateRuleTypeValue={setInvalidDateRuleTypeValue}
                        />
                        : null
                }
                {
                    idPage === 3 ?
                        <ProfileApp
                            listValueApp={listValueApp}
                            setListValueApp={setListValueApp}
                            history={history}
                            isDisableAll={isDisableAll}
                            packageProfileId={id}
                            setIsLoading={setIsLoading}
                            objPackage={objPackage}
                            createObjProfile={createObjProfile}
                        />
                        : null
                }
            </PackageShareDeclare>
            <LoadingComponent isLoading={isLoading} />
        </SideBarPage>
    )
}

const mapStateToProps = (state) => ({
    userData: state.auth.infoUser.userData,
})

const mapDispatchToProps = (dispatch) => ({
    declareProfileAction: bindActionCreators(declareProfileAction, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DeclarePackageProfile);


const dataPage = [
    {
        id: 1,
        name: "Thông tin chung",
        icon: "fa fa-info-circle",
    },
    {
        id: 2,
        name: "Thời gian",
        icon: "fa fa-clock-o",
    },
    {
        id: 3,
        name: "Bộ giá trị",
        icon: "fa fa-cog",
    }
]

