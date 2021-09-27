import React, { useState, useEffect } from 'react'
import {
    Input,
    EHeaderComponent,
    LoadingComponent
} from '../../components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './styles/style.css';
import ProfileValueShareDeclare from './components/profileValueShare/profileValueShareDeclare';
import ListRedeemer from './components/listRedeemer';
import TimeApply from './components/timeApply';
import BenefitApply from './components/benefitApply';
import { toast, getCache } from '../../common';
import { bindActionCreators } from "redux";
import * as declarePackageAction from "../declarePackage/action";
import { connect } from 'react-redux';
import { helper, date as FormatDate } from '../../common';

const DeclareProfileValue = (props) => {
    const {
        declarePackageAction,
        getCache,
        listCompany,
        listProvince,
        listCompanyBrand,
        listOutputType,
    } = props;

    const dayOfInWeeks = [
        {
            id: 2,
            name: "Thứ 2",
            isChecked: 0
        },
        {
            id: 3,
            name: "Thứ 3",
            isChecked: 0
        },
        {
            id: 4,
            name: "Thứ 4",
            isChecked: 0
        },
        {
            id: 5,
            name: "Thứ 5",
            isChecked: 0
        },
        {
            id: 6,
            name: "Thứ 6",
            isChecked: 0
        }
    ]
    const dayOfLastWeeks = [
        {
            id: 7,
            name: "Thứ 7",
            isChecked: 0
        },
        {
            id: 8,
            name: "Chủ nhật",
            isChecked: 0
        }
    ]

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const [objPackage, setObjPackage] = useState({})
    const [objProfile, setObjProfile] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [idTab, setIdTab] = useState(1)
    const [packageProfileValueName, setPackageProfileValueName] = useState("")
    const [profileValueId, setProfileValueId] = useState(0)

    //ds id redeemer
    // const [listIdRedeemer, setListIdRedeemer] = useState([])
    const [dataRedeemer, setDataRedeemer] = useState([])
    const [provinces, setProvinces] = useState([])
    const [companyBrands, setCompanyBrands] = useState([])
    const [outputTypes, setOutputTypes] = useState([])
    const [isCheckAllListRedeemer, setIsCheckAllListRedeemer] = useState(0)
    const [lstValueRedeemer, setLstValueRedeemer] = useState([])

    //thoi gian
    const [fromNumDays, setFromNumDays] = useState("")
    const [toNumDays, settoNumDays] = useState("")
    const [isDay, setIsDay] = useState(0)
    const [weekDateList, setWeekDateList] = useState("")
    const [specialDayList, setSpecialDayList] = useState("")
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)
    const [timeFrom, setTimeFrom] = useState(null)
    const [timeTo, setTimeTo] = useState(null)
    const [dataDayInWeek, setDataDayInWeek] = useState([...dayOfInWeeks])
    const [dataDayLastWeek, setDataDayLastWeek] = useState([...dayOfLastWeeks])
    const [type, setType] = useState(0)

    //lợi ích
    const [lstProfileGift, setLstProfileGift] = useState([])
    const [minCartValue, setMinCartValue] = useState("")
    const [maxCartValue, setMaxCartValue] = useState("")
    const [evoucherValue, setEvoucherValue] = useState("")
    const [maxValueRedeemed, setMaxValueRedeemed] = useState("")

    useEffect(() => {
        console.log(location)
        if (location.state && location.state.objPackage) {
            const { objPackage } = location.state;
            setObjPackage(objPackage)
            setObjProfile(location.state.objProfile)
            if (location.state.objProfileValue) {//chỉnh sửa
                const { objProfileValue } = location.state;
                getInfo(objProfileValue)
                getListRedeemer(objPackage.packageId, objProfileValue.lstValueRedeemer)
                setLstValueRedeemer(objProfileValue.lstValueRedeemer)
            } else {//thêm mới
                getListRedeemer(objPackage.packageId, [])
            }
            if (listProvince.length === 0) {
                getProvinceList()
            } else {
                setProvinces(listProvince)
            }

            if (listCompanyBrand.length === 0) {
                getCompanyBrandList()
            } else {
                setCompanyBrands(listCompanyBrand)
            }

            if (listOutputType.length === 0) {
                getOutputTypeList()
            } else {
                setOutputTypes(listOutputType)
            }
        } else {
            history.push({
                pathname: "/evoucher-package"
            });
        }
    }, [])


    const getInfo = (obj) => {
        if (obj.packageProfileValueId > 0) {
            setProfileValueId(obj.packageProfileValueId)
        }
        setPackageProfileValueName(obj.packageProfileValueName)
        setFromNumDays(obj.fromNumDays)
        settoNumDays(obj.toNumDays)
        setTimeFrom(obj.timeFromString)
        setTimeTo(obj.timeToString)
        setWeekDateList(obj.weekDateList)
        setSpecialDayList(obj.specialDayList ? obj.specialDayList.replaceAll("-", "/") : "")
        setTimeStart(obj.timeStart ? new Date(obj.timeStart) : null)
        setTimeEnd(obj.timeEnd ? new Date(obj.timeEnd) : null)
        setMinCartValue(obj.minCartValue)
        setMaxCartValue(obj.maxCartValue)
        setLstProfileGift(obj.lstProfileGift)
        setType(obj.type)
        if (obj.weekDateList) {
            setIsDay(0)
            let termDataInWeek = [...dayOfInWeeks];
            let termDataLastWeek = [...dayOfLastWeeks]
            // console.log(obj.weekDateList)
            termDataInWeek.filter(x => obj.weekDateList.includes(x.id)).map(x => x.isChecked = 1);
            termDataLastWeek.filter(x => obj.weekDateList.includes(x.id)).map(x => x.isChecked = 1);
            // console.log(termDataInWeek)
            setDataDayInWeek(termDataInWeek)
            setDataDayLastWeek(termDataLastWeek)
        } else {
            setIsDay(1)
        }
    }

    const getListRedeemer = (packageId, lstRedeemer) => {
        setIsLoading(true)
        declarePackageAction.getListRedeemer(packageId)
            .then((res) => {
                console.log('res', res)
                console.log('lstRedeemer', lstRedeemer)
                let termData = [...res];
                if (lstRedeemer && lstRedeemer.length > 0) {
                    let listIdRedeemer = lstRedeemer.filter(x => !x.isDeleted || x.isDeleted === 0).map(x => x.redeemerId);
                    termData.filter(x => listIdRedeemer.indexOf(x.redeemerId) > - 1).map(x => x.isChecked = 1);
                    if (listIdRedeemer.length === termData.length) setIsCheckAllListRedeemer(1)
                }
                setDataRedeemer([...termData])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                toast.notifyError("Bộ điều kiện: " + err.msgError)
                setIsLoading(false)
            })
    }

    // //tỉnh thành
    const getProvinceList = () => {
        setIsLoading(true)
        getCache.getProvinceList()
            .then((res) => {
                // console.log(res)
                setProvinces(res)
                setIsLoading(false)
            })
            .catch((err) => {
                // console.log(err)
                toast.notifyError("Tỉnh thành: " + err.msgError)
                setProvinces([])
                setIsLoading(false)
            })
    }
    // //Thương hiệu
    const getCompanyBrandList = () => {
        setIsLoading(true)
        getCache.getCompanyBrandList()
            .then((res) => {
                // console.log(res)
                setCompanyBrands(res)
                setIsLoading(false)
            })
            .catch((err) => {
                // console.log(err)
                toast.notifyError("Thương hiệu: " + err.msgError)
                setCompanyBrands([])
                setIsLoading(false)
            })
    }
    // //hình thức xuất
    const getOutputTypeList = () => {
        setIsLoading(true)
        getCache.getOutputTypeList()
            .then((res) => {
                // console.log(res)
                setOutputTypes(res)
                setIsLoading(false)
            })
            .catch((err) => {
                toast.notifyError("Hình thức xuất: " + err.msgError)
                // console.log(err)
                setOutputTypes([])
                setIsLoading(false)
            })
    }

    const onDeclare = () => {
        if (!packageProfileValueName) {
            toast.notifyWarning('Vui lòng nhập tên cho bộ giá trị áp dụng!');
            return;
        }
        if (dataRedeemer.filter(x => x.isChecked === 1).length === 0) {
            toast.notifyWarning('Vui lòng chọn bộ điều kiện áp dụng!');
            return;
        }
        if (isDay === 0 && dataDayInWeek.filter(x => x.isChecked === 1).length === 0 && dataDayLastWeek.filter(x => x.isChecked === 1).length === 0) {
            toast.notifyWarning('Vui lòng chọn giá trị cho ngày trong tuần của thời gian áp dụng!');
            return;
        }
        if (isDay === 1 && !timeEnd && !timeStart && !specialDayList) {
            toast.notifyWarning('Vui lòng chọn giá trị cho ngày đặc biệt của thời gian áp dụng!');
            return;
        }
        if (id) {
            updateProfileValue()
        } else {
            addProfileValue()
        }
    }

    const updateProfileValue = () => {
        const {
            userData
        } = props;
        //map data check 
        let termDataRedeemer = dataRedeemer.filter(x => x.isChecked === 1);
        let listIdRedeemerCheck = termDataRedeemer.map(x => x.redeemerId);
        // console.log(lstValueRedeemer)
        let lstValueRedeemerTmp = [...lstValueRedeemer];
        listIdRedeemerCheck.forEach(x => {
            let index = lstValueRedeemerTmp.findIndex(m => m.redeemerId === x);
            if (index === -1) {
                let objValueRedeemer = {
                    valueRedeemerId: 0,
                    redeemerId: x,
                    isDeleted: 0
                };
                lstValueRedeemerTmp.push(objValueRedeemer);
            } else {
                if (lstValueRedeemerTmp[index].isDeleted === 1) {
                    lstValueRedeemerTmp[index].isDeleted = 0
                }
            }
        })
        lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) === -1 && x.valueRedeemerId > 0).map(x => x.isDeleted = 1);
        lstValueRedeemerTmp = lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) > -1 || x.isDeleted === 1);
        /////////lấy những ngày đã đc check
        let termDataWeek = [...dataDayInWeek];
        termDataWeek = termDataWeek.concat(dataDayLastWeek)
        let termWeekDateList = termDataWeek.filter(x => x.isChecked === 1).map(x => x.id).join();

        let objProfileTmp = objProfile;
        let index = objProfileTmp.lstProfileValues.findIndex(x => x.termId == id);
        let objProfileValueTmp = objProfileTmp.lstProfileValues[index];

        objProfileValueTmp.packageProfileValueName = packageProfileValueName;
        objProfileValueTmp.timeFromString = timeFrom;
        objProfileValueTmp.timeToString = timeTo;
        objProfileValueTmp.type = type;
        objProfileValueTmp.action = 1;
        objProfileValueTmp.weekDateList = termWeekDateList;
        objProfileValueTmp.specialDayList = specialDayList ? helper.replaceSpace(specialDayList).replaceAll("/", "-") : "";
        objProfileValueTmp.timeStart = timeStart ? FormatDate.getTimestamp(timeStart) : null
        objProfileValueTmp.timeEnd = timeEnd ? FormatDate.getTimestamp(timeEnd) : null
        objProfileValueTmp.fromNumDays = fromNumDays ? parseInt(fromNumDays) : "";
        objProfileValueTmp.toNumDays = toNumDays ? parseInt(toNumDays) : "";
        objProfileValueTmp.minCartValue = minCartValue ? parseInt(minCartValue) : null;
        objProfileValueTmp.maxCartValue = maxCartValue ? parseInt(maxCartValue) : null;
        // objProfileValueTmp.updateduser = userData.profile.Username + ' - ' + userData.profile.Fullname;
        if (profileValueId === 0) {
            objProfileValueTmp.createddate = FormatDate.getTimestamp(new Date());
        }
        objProfileValueTmp.lstValueRedeemer = lstValueRedeemerTmp;
        objProfileValueTmp.lstProfileGift = lstProfileGift

        objProfileTmp.lstProfileValues[index] = objProfileValueTmp;
        // console.log(objProfileTmp)
        if (objProfileTmp.packageProfileId > 0) {
            history.push({
                pathname: "/package-profile/" + objProfileTmp.packageProfileId,
                state: {
                    objPackage: objPackage,
                    objProfile: objProfileTmp
                }
            });
        } else {
            history.push({
                pathname: "/package-profile-add",
                state: {
                    objPackage: objPackage,
                    objProfile: objProfileTmp
                }
            });
        }
        toast.notifySuccess("Chỉnh sửa thành công!")
    }

    const addProfileValue = () => {
        setIsLoading(true)
        const {
            userData
        } = props;
        //map data check 
        let termDataRedeemer = dataRedeemer.filter(x => x.isChecked === 1);
        let listIdRedeemerCheck = termDataRedeemer.map(x => x.redeemerId);
        let lstValueRedeemerTmp = [...lstValueRedeemer];
        listIdRedeemerCheck.forEach(x => {
            let index = lstValueRedeemer.findIndex(m => m.redeemerId === x);
            if (index === -1) {
                let objValueRedeemer = {
                    valueRedeemerId: 0,
                    redeemerId: x,
                    isDeleted: 0
                };
                lstValueRedeemerTmp.push(objValueRedeemer);
            } else {
                if (lstValueRedeemerTmp[index].isDeleted === 1) {
                    lstValueRedeemerTmp[index].isDeleted = 0
                }
            }
        })
        lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) === -1 && x.valueRedeemerId > 0).map(x => x.isDeleted = 1);
        lstValueRedeemerTmp = lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) > -1 || x.isDeleted === 1);
        //lấy những ngày đã đc check
        let termDataWeek = [...dataDayInWeek];
        termDataWeek = termDataWeek.concat(dataDayLastWeek)
        let termWeekDateList = termDataWeek.filter(x => x.isChecked === 1).map(x => x.id).join();

        let obj = {
            packageProfileValueId: "",
            packageProfileValueName: packageProfileValueName,
            type: type,
            timeFromString: timeFrom,
            timeToString: timeTo,
            weekDateList: termWeekDateList,
            specialDayList: specialDayList ? helper.replaceSpace(specialDayList).replaceAll("/", "-") : "",
            termId: Math.floor((Math.random() * 1000000000) + 1),
            evoucherValue: 1,
            maxValueRedeemed: 0,
            fromNumDays: fromNumDays ? parseInt(fromNumDays) : "",
            toNumDays: toNumDays ? parseInt(toNumDays) : "",
            timeStart: timeStart ? FormatDate.getTimestamp(timeStart) : null,
            timeEnd: timeEnd ? FormatDate.getTimestamp(timeEnd) : null,
            minCartValue: minCartValue ? parseInt(minCartValue) : null,
            maxCartValue: maxCartValue ? parseInt(maxCartValue) : null,
            isDeleted: 0,
            action: 0,
            createddate: FormatDate.getTimestamp(new Date()),
            createduser: userData.profile.Username + ' - ' + userData.profile.Fullname,
            updateduser: null,
            updateddate: null,
            lstValueRedeemer: lstValueRedeemerTmp,
            lstProfileGift: lstProfileGift
        }

        let objProfileTmp = objProfile;
        objProfileTmp.lstProfileValues.push(obj);

        if (objProfileTmp.packageProfileId > 0) {
            history.push({
                pathname: "/package-profile/" + objProfileTmp.packageProfileId,
                state: {
                    objPackage: objPackage,
                    objProfile: objProfileTmp
                }
            });
        } else {
            history.push({
                pathname: "/package-profile-add",
                state: {
                    objPackage: objPackage,
                    objProfile: objProfileTmp
                }
            });
        }
        setIsLoading(false)
        toast.notifySuccess("Thêm mới thành công!")
    }

    const createObjProfileValue = () => {
        //map data check 
        let termDataRedeemer = dataRedeemer.filter(x => x.isChecked === 1);
        let listIdRedeemerCheck = termDataRedeemer.map(x => x.redeemerId);
        let lstValueRedeemerTmp = [...lstValueRedeemer];
        listIdRedeemerCheck.forEach(x => {
            let index = lstValueRedeemer.findIndex(m => m.redeemerId === x);
            if (index === -1) {
                let objValueRedeemer = {
                    valueRedeemerId: 0,
                    redeemerId: x,
                    isDeleted: 0
                };
                lstValueRedeemerTmp.push(objValueRedeemer);
            } else {
                if (lstValueRedeemerTmp[index].isDeleted === 1) {
                    lstValueRedeemerTmp[index].isDeleted = 0
                }
            }
        })
        lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) === -1 && x.valueRedeemerId > 0).map(x => x.isDeleted = 1);
        lstValueRedeemerTmp = lstValueRedeemerTmp.filter(x => listIdRedeemerCheck.indexOf(x.redeemerId) > -1 || x.isDeleted === 1);
        ////lấy những ngày đã đc check
        let termDataWeek = [...dataDayInWeek];
        termDataWeek = termDataWeek.concat(dataDayLastWeek)
        let termWeekDateList = termDataWeek.filter(x => x.isChecked === 1).map(x => x.id).join();

        return {
            packageProfileValueName: packageProfileValueName,
            type: 0,
            timeFromString: timeFrom,
            timeToString: timeTo,
            type: type,
            weekDateList: termWeekDateList,
            specialDayList: specialDayList ? helper.replaceSpace(specialDayList).replaceAll("/", "-") : "",
            evoucherValue: 1,
            maxValueRedeemed: 0,
            fromNumDays: fromNumDays ? parseInt(fromNumDays) : "",
            toNumDays: toNumDays ? parseInt(toNumDays) : "",
            timeStart: timeStart,
            timeEnd: timeEnd,
            minCartValue: minCartValue ? parseInt(minCartValue) : null,
            maxCartValue: maxCartValue ? parseInt(maxCartValue) : null,
            isDeleted: 0,
            action: 0,
            createddate: null,
            createduser: null,
            updateduser: null,
            updateddate: null,
            lstValueRedeemer: lstValueRedeemerTmp,
            lstProfileGift: lstProfileGift
        }
    }

    const goback = () => {
        if (objProfile.packageProfileId > 0) {
            history.push({
                pathname: "/package-profile/" + objProfile.packageProfileId,
                state: {
                    objPackage: objPackage,
                    objProfile: objProfile
                }
            });
            return;
        }
        history.push({
            pathname: "/package-profile-add",
            state: {
                objPackage: objPackage,
                objProfile: objProfile
            }
        });
    }

    const RenderTabs = ({ item }) => {
        return (
            <button
                onClick={() => setIdTab(item.id)}
                className={"item-tab" + (item.id === idTab ? " " + "active-btn" : "")}
            >
                <span>{item.name}</span>
            </button>
        )
    }

    return (
        <div className="deprofile-value-container">
            <EHeaderComponent title={'KHAI BÁO BỘ GIÁ TRỊ ÁP DỤNG'} goback={goback} />
            <div className="deprofile-value-header">
                <div className="col-md-12 profile-value-name">
                    <div>
                        <Input
                            value={packageProfileValueName}
                            type="text"
                            placeholder="Nhập tên bộ giá trị áp dụng (*)"
                            max={500}
                            onChange={(e) => setPackageProfileValueName(e.target.value)}
                        />
                        <span>{packageProfileValueName.length}/500</span>
                    </div>
                </div>
                <div className="col-md-12 profile-value-tabs">
                    {
                        buttonTabs.map((item, index) => {
                            return (
                                <RenderTabs key={index} item={item} />
                            )
                        })
                    }
                </div>
            </div>
            <ProfileValueShareDeclare
                goback={goback}
                onDeclare={onDeclare}
            // isDisableAll={isDisableAll}
            >
                {
                    idTab === 1 ?
                        <ListRedeemer
                            history={history}
                            // listIdRedeemer={listIdRedeemer}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            declarePackageAction={declarePackageAction}
                            notifyError={toast.notifyError}
                            objPackage={objPackage}
                            dataRedeemer={dataRedeemer}
                            setDataRedeemer={setDataRedeemer}
                            provinces={provinces}
                            companyBrands={companyBrands}
                            outputTypes={outputTypes}
                            isCheckAllListRedeemer={isCheckAllListRedeemer}
                            setIsCheckAllListRedeemer={setIsCheckAllListRedeemer}
                            profileValueId={id}
                            objProfile={objProfile}
                            createObjProfileValue={createObjProfileValue}
                        />
                        : null
                }
                {
                    idTab === 2 ?
                        <TimeApply
                            fromNumDays={fromNumDays}
                            setFromNumDays={setFromNumDays}
                            type={type}
                            setType={setType}
                            toNumDays={toNumDays}
                            settoNumDays={settoNumDays}
                            weekDateList={weekDateList}
                            setWeekDateList={setWeekDateList}
                            specialDayList={specialDayList}
                            setSpecialDayList={setSpecialDayList}
                            specialDayStart={timeStart}
                            setSpecialDayStart={setTimeStart}
                            specialDayEnd={timeEnd}
                            setSpecialDayEnd={setTimeEnd}
                            timeFrom={timeFrom}
                            setTimeFrom={setTimeFrom}
                            timeTo={timeTo}
                            setTimeTo={setTimeTo}
                            isDay={isDay}
                            setIsDay={setIsDay}
                            dataDayInWeek={dataDayInWeek}
                            setDataDayInWeek={setDataDayInWeek}
                            dataDayLastWeek={dataDayLastWeek}
                            setDataDayLastWeek={setDataDayLastWeek}
                            toast={toast}
                            objProfile={objProfile}
                        />
                        : null
                }
                {
                    idTab === 3 ?
                        <BenefitApply
                            lstProfileGift={lstProfileGift}
                            setLstProfileGift={setLstProfileGift}
                            minCartValue={minCartValue}
                            setMinCartValue={setMinCartValue}
                            maxCartValue={maxCartValue}
                            setMaxCartValue={setMaxCartValue}
                            evoucherValue={evoucherValue}
                            setEvoucherValue={setEvoucherValue}
                            maxValueRedeemed={maxValueRedeemed}
                            setMaxValueRedeemed={setMaxValueRedeemed}
                            objPackage={objPackage}
                            objProfile={objProfile}
                        />
                        : null
                }
            </ProfileValueShareDeclare>
            <LoadingComponent isLoading={isLoading} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.auth.infoUser.userData,
    listCompany: state.cache.company.data,
    listProvince: state.cache.province.data,
    listCompanyBrand: state.cache.companyBrand.data,
    listOutputType: state.cache.outputType.data,
})

const mapDispatchToProps = (dispatch) => ({
    getCache: bindActionCreators(getCache, dispatch),
    declarePackageAction: bindActionCreators(declarePackageAction, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DeclareProfileValue);

const buttonTabs = [
    {
        id: 1,
        name: "Bộ điều kiện áp dụng"
    },
    {
        id: 2,
        name: "Thời gian áp dụng"
    },
    {
        id: 3,
        name: "Lợi ích áp dụng"
    }
]


