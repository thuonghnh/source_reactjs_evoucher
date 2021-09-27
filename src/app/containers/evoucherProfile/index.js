import React, { useState, useEffect, useRef } from 'react'
import {
    ToolbarComponent,
    Select,
    Input,
    Button,
    Icon,
    DateControl,
    EHeaderComponent,
    TableResponsive,
    LoadingComponent,
    PaginationServer
} from '../../components';
import { toast, date as FormatDate } from '../../common';
import './styles/profileStyles.css';
import { useHistory, useLocation } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as packageProfileAction from "./action";
import { connect } from 'react-redux';
import RenderBtn from './components/RenderBtn';
import RenderSearch from './components/RenderSearch'

const today = new Date()

const EVoucherProfile = (props) => {
    const {
        userData,
        packageProfileAction
    } = props;
    const history = useHistory();
    const location = useLocation();
    const refToolbar = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [keyWord, setKeyWord] = useState("")
    const [valueType, setValueType] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [objPackage, setObjPackage] = useState({})
    const [activeBtn, setActiveBtn] = useState(0)
    const [fromDate, setFromDate] = useState(today)
    const [toDate, setToDate] = useState(FormatDate.getNext30Days(today))
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [isShowItem, setIsShowItem] = useState(false)
    const [idItemOnClick, setIdItemOnClick] = useState(0)
    const [listItemCheck, setListItemCheck] = useState([])
    const [dataProfile, setDataProfile] = useState([])
    useEffect(() => {
        if (location.state && location.state.objPackage) {
            const { objPackage } = location.state;
            setObjPackage(objPackage)
            let body = {
                packageId: objPackage.packageId,
                fromDate: FormatDate.getTimestamp(fromDate),
                toDate: FormatDate.getTimestamp(toDate),
                valueType: 0,
                discountType: 0,
                searchType: 0,
                keyWord: "",
                pageSize: pageSize,
                pageIndex: pageIndex
            }
            getListProfile(body)
        } else {
            history.push({
                pathname: "/evoucher-package"
            });
        }
        refToolbar.current.setVisible(true, true, true, true);
        refToolbar.current.setDisable(false, false, false, false);
    }, [])

    const getListProfile = (body) => {
        setIsLoading(true)
        packageProfileAction.getListProfile(body)
            .then((res) => {
                // console.log(res)
                let dataTmp = [...res];
                // console.log(listItemCheck)
                dataTmp.filter(x => listItemCheck.indexOf(x.packageProfileId) > -1).map(x => x.isChecked = 1);
                setDataProfile(dataTmp)
                setIsLoading(false)
            })
            .catch((error) => {
                toast.notifyError("Lấy danh sách: " + error.msgError)
                // console.log(error)
            });
    }

    const updateExpriedProfile = (body) => {
        let nowDate = FormatDate.getTimestamp(new Date())
        setIsLoading(true)
        packageProfileAction.updateExpriedProfile(body)
            .then((res) => {
                toast.notifySuccess("Kết thúc thành công Profile " + body.packageProfileId)
                // let termData = [...dataProfile];
                // let index = termData.findIndex(x => x.packageProfileId === body.packageProfileId);
                // termData[index].isExpired = 1;
                // termData[index].updateduser = body.updateUser + ' - ' + userData.profile.Fullname;
                // termData[index].updateddate = nowDate;
                // setDataProfile(termData)
                // setIsLoading(false)
                let params = {
                    packageId: objPackage.packageId,
                    fromDate: FormatDate.getTimestamp(fromDate),
                    toDate: FormatDate.getTimestamp(toDate),
                    valueType: valueType,
                    discountType: discountType,
                    searchType: activeBtn,
                    keyWord: keyWord,
                    pageSize: pageSize,
                    pageIndex: pageIndex
                }
                getListProfile(params)
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError("Kết thúc Profile: " + error.msgError)
                // console.log(error)
            });
    }

    const deleteProfile = (body) => {
        setIsLoading(true)
        packageProfileAction.deleteProfile(body)
            .then((res) => {
                toast.notifySuccess("Xóa thành công Profile " + body.packageProfileId)
                let params = {
                    packageId: objPackage.packageId,
                    fromDate: FormatDate.getTimestamp(fromDate),
                    toDate: FormatDate.getTimestamp(toDate),
                    valueType: valueType,
                    discountType: discountType,
                    searchType: activeBtn,
                    keyWord: keyWord,
                    pageSize: pageSize,
                    pageIndex: pageIndex
                }
                getListProfile(params)
            })
            .catch((error) => {
                setIsLoading(false)
                toast.notifyError("Xóa Profile: " + error.msgError)
                // console.log(error)
            });
    }

    const onCheckItem = () => {

    }

    const add = () => {
        history.push({
            pathname: "/package-profile-add",
            state: {
                objPackage: objPackage
            }
        });
    }
    const exportExcel = () => {
    }
    const importExcel = () => {
    }
    const del = () => {

    }

    const goback = () => {
        history.push('/evoucher-package')
    }

    const search = () => {
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(fromDate),
            toDate: FormatDate.getTimestamp(toDate),
            valueType: valueType,
            discountType: discountType,
            searchType: activeBtn,
            keyWord: keyWord,
            pageSize: pageSize,
            pageIndex: pageIndex
        }
        getListProfile(body)
    }

    const clearSearch = () => {
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(fromDate),
            toDate: FormatDate.getTimestamp(toDate),
            valueType: "",
            discountType: "",
            searchType: activeBtn,
            keyWord: "",
            pageSize: pageSize,
            pageIndex: pageIndex
        }
        getListProfile(body)
        setValueType("")
        setDiscountType("")
        setKeyWord("")
    }

    const setActiveBtnClick = (n) => {
        setActiveBtn(n)
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(fromDate),
            toDate: FormatDate.getTimestamp(toDate),
            valueType: valueType,
            discountType: discountType,
            searchType: n,
            keyWord: keyWord,
            pageSize: pageSize,
            pageIndex: pageIndex
        }
        getListProfile(body)
    }

    const changeFromDate = (date) => {
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(date),
            toDate: FormatDate.getTimestamp(toDate),
            valueType: valueType,
            discountType: discountType,
            searchType: activeBtn,
            keyWord: keyWord,
            pageSize: pageSize,
            pageIndex: pageIndex
        }
        getListProfile(body)
    }

    const changeToDate = (date) => {
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(fromDate),
            toDate: FormatDate.getTimestamp(date),
            valueType: valueType,
            discountType: discountType,
            searchType: activeBtn,
            keyWord: keyWord,
            pageSize: pageSize,
            pageIndex: pageIndex
        }
        getListProfile(body)
    }

    const onChangePageServer = (pager) => {
        // update state with new page of items
        const { currentPage, pageSize } = pager;
        let body = {
            packageId: objPackage.packageId,
            fromDate: FormatDate.getTimestamp(fromDate),
            toDate: FormatDate.getTimestamp(toDate),
            valueType: valueType,
            discountType: discountType,
            searchType: activeBtn,
            keyWord: keyWord,
            pageSize: pageSize,
            pageIndex: currentPage
        }
        getListProfile(body)
        setPageSize(pageSize)
        setPageIndex(currentPage)
    }

    const onClickItemTable = (item) => {
        if (idItemOnClick !== item.packageProfileId) {
            setIsShowItem(true)
        } else {
            setIsShowItem(!isShowItem)
        }
        setIdItemOnClick(item.packageProfileId)
    }

    const onCheckItemTable = (item, n) => {
        let termDataCheck = [...listItemCheck];
        let tmpData = [...dataProfile];
        let index = tmpData.findIndex(x => x.packageProfileId === item.packageProfileId);
        if (n == 0) {
            tmpData[index].isChecked = 0;
            let indexCheck = termDataCheck.findIndex(x => x === item.packageProfileId);
            termDataCheck.splice(indexCheck, 1)
        } else {
            tmpData[index].isChecked = 1;
            termDataCheck.push(item.packageProfileId)
        }
        setDataProfile(tmpData)
        setListItemCheck(termDataCheck)
        //xóa nhiều ở đây
    }

    const redirectEditProfile = (id) => {
        history.push({
            pathname: "/package-profile/" + id,
            state: {
                objPackage: objPackage
            }
        });
    }

    const deleteItemProfile = (item) => {
        if (item.isActived === 1) return;
        let body = {
            packageProfileId: item.packageProfileId,
            deletedUser: userData.profile.Username
        }
        deleteProfile(body)
    }

    const onClickUpdateExpriedProfile = (item) => {
        if (item.isExpired === 1) return;
        let body = {
            packageProfileId: item.packageProfileId,
            packageId: objPackage.packageId,
            updateUser: userData.profile.Username
        }
        updateExpriedProfile(body)
    }

    const onClickBtnCopy = (item) => {
        history.push({
            pathname: "/package-profile-add",
            state: {
                objPackage: objPackage,
                objProfile: item,
                isCopy: true
            }
        });
    }

    const RenderItemProfile = ({ item }) => {
        return (
            <React.Fragment>
                <div className="item-profile-show" onClick={() => onClickItemTable(item)}>
                    <div className="item-checked" >
                        {
                            item.isChecked === 1 ?
                                <Icon
                                    style={styles.iconActive}
                                    icon={"fa fa-check-square"}
                                    onClick={() => onCheckItemTable(item, 0)}
                                    className={item.isActived === 1 ? "disabled" : ""}
                                />
                                :
                                <Icon
                                    style={styles.iconActive}
                                    icon={"fa fa-square"}
                                    onClick={() => onCheckItemTable(item, 1)}
                                    className={item.isActived === 1 ? "disabled" : ""}
                                />
                        }
                    </div>
                    <div className="item-profile-grid profile-code" >
                        <span>Mã Profile</span>
                        <span className="boldspan">{item.packageProfileId}</span>
                    </div>
                    <div className="item-profile-grid profile-name">
                        <span>Tên Profile</span>
                        <span className="boldspan">{item.packageProfileName}</span>
                    </div>
                    <div className="item-profile-grid value-type" >
                        <span>Loại giá trị</span>
                        <span className="boldspan">{item.discountTypeValueString}</span>
                    </div>
                    <div className="item-profile-grid discount-type" >
                        <span>Loại giảm giá</span>
                        <span className="boldspan">{item.discountTypeString}</span>
                    </div>
                    <div className="item-profile-grid status" >
                        <span>Trạng thái</span>
                        {
                            item.isActived === 1 ?
                                <span className="span-active">
                                    <span>Kích hoạt</span>
                                </span>
                                :
                                <span className="span-notactive">
                                    <span>
                                        Chưa kích hoạt
                                    </span>
                                </span>
                        }
                    </div>
                    <div className="item-profile-grid expired">
                        <span>Hết hạn</span>
                        <Icon
                            icon={"fa fa-check"}
                            style={item.isExpired === 1 ? styles.iconActive : styles.iconNotActive}
                        />
                    </div>
                    <div className="item-profile-show-btn action">
                        <Button
                            icon={"fa fa-files-o"}
                            title="Sao chép"
                            onClick={() => onClickBtnCopy(item)}
                        />
                        <Button
                            icon={"fa fa-ban"}
                            title="Kết thúc"
                            disabled={item.isExpired === 1}
                            onClick={() => onClickUpdateExpriedProfile(item)}
                            classBtn={item.isExpired === 1 ? " " + "disabled" : ""}
                        />
                    </div>
                </div>
                <div className="item-profile-hide" style={isShowItem && idItemOnClick === item.packageProfileId ? { display: "flex" } : { display: "none" }}>
                    <div className="item-profile-grid-icon" style={{ minWidth: "5%" }}>
                        <Icon
                            icon={"fa fa-tags"}
                        />
                    </div>
                    <div className="item-profile-grid" style={{ minWidth: "20%" }}>
                        <span>Người tạo</span>
                        <span className="boldspan user">{item.createduser}</span>
                    </div>
                    <div className="item-profile-grid" style={{ minWidth: "15%" }}>
                        <span>Thời gian tạo</span>
                        <span className="boldspan">{FormatDate.get_string_current_date_custom(item.createddate)}</span>
                    </div>
                    <div className="item-profile-grid" style={{ minWidth: "20%" }}>
                        <span>Người cập nhật cuối</span>
                        <span className="boldspan user">{item.updateduser}</span>
                    </div>
                    <div className="item-profile-grid" style={{ minWidth: "15%" }}>
                        <span>Thời gian cập nhật</span>
                        <span className="boldspan">{FormatDate.get_string_current_date_custom(item.updateddate)}</span>
                    </div>
                    <div className="item-profile-hide-btn" style={{ minWidth: "25%" }}>
                        <Button
                            icon={"fa fa-search"}
                            title="Xem chi tiết"
                            classBtn="btn-view"
                            onClick={() => redirectEditProfile(item.packageProfileId)}
                        />
                        <Button
                            icon={"fa fa-trash"}
                            title="Xóa"
                            classBtn={"btn-delete" + (item.isActived === 1 ? " " + "disabled" : "")}
                            onClick={() => deleteItemProfile(item)}
                            disabled={item.isActived === 1}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <EHeaderComponent title={'KHAI BÁO PROFILE - ' + objPackage.packageId + ' - ' + objPackage.packageName} goback={goback} />
            <div className="package-profile-container">
                <div className="row">
                    <RenderSearch
                        className="col-md-12 col-xl-8 pd-botton profile-search"
                        keyWord={keyWord}
                        setKeyWord={setKeyWord}
                        valueType={valueType}
                        setValueType={setValueType}
                        valueTypes={valueTypes}
                        discountType={discountType}
                        setDiscountType={setDiscountType}
                        discountTypes={discountTypes}
                        search={search}
                        clearSearch={clearSearch}
                        Input={Input}
                        Select={Select}
                        Button={Button}
                    />
                    <div className="col-md-12 col-xl-4 pd-botton profile-toolbar">
                        <ToolbarComponent
                            ref={refToolbar}
                            add={add}
                            exportExcel={exportExcel}
                            importExcel={importExcel}
                            del={del}
                        />
                    </div>
                    <RenderBtn
                        className="col-md-12 pd-botton"
                        activeBtn={activeBtn}
                        styles={styles}
                        setActiveBtnClick={setActiveBtnClick}
                        Button={Button}
                    />
                    <div className="col-md-12 col-xl-5 pd-botton">
                        <div className="profile-title">
                            <span className="evoucher-title">Danh sách profile</span>
                            <Button
                                icon={'fa fa-undo'}
                                onClick={search}
                                classBtn={"reload-app"}
                                title={"Reload"}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-xl-7 pd-botton">
                        <div className="profile-formdate">
                            <span className="date-title">Thời gian áp dụng</span>
                            <DateControl
                                value={fromDate}
                                setValue={setFromDate}
                                onChange={changeFromDate}
                                maxDate={toDate}
                            />
                            <DateControl
                                minDate={fromDate}
                                value={toDate}
                                setValue={setToDate}
                                onChange={changeToDate}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-12">
                        <div className="item-profile-container">
                            {
                                dataProfile.map((item, index) => {
                                    return <RenderItemProfile key={index} item={item} />
                                })
                            }
                        </div>

                    </div>
                    <div className="col-md-12 pd-top">
                        {
                            dataProfile && dataProfile.length > 0 ?
                                <PaginationServer totalItems={dataProfile[0].totalRow} onChangePage={onChangePageServer} />
                                : null
                        }

                    </div>
                </div>
            </div>
            <LoadingComponent isLoading={isLoading} />
        </React.Fragment>
    )
}

const styles = {
    activeBtn: {
        backgroundColor: "#3BB8C8",
        color: "#fff"
    },
    iconActive: {
        color: "#3BB8C3",
        fontSize: "1.2rem"
    },
    iconNotActive: {
        color: '#EDEDED'
    },
    iconWhite: {
        color: "#fff",
        fontSize: "1.2rem"
    }
}

const mapStateToProps = (state) => ({
    userData: state.auth.infoUser.userData,
})

const mapDispatchToProps = (dispatch) => ({
    packageProfileAction: bindActionCreators(packageProfileAction, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EVoucherProfile);


const valueTypes = [
    {
        id: 1,
        name: "Số tiền"
    },
    {
        id: 2,
        name: "Linh hoạt"
    },
    {
        id: 3,
        name: "Phần trăm"
    }
]

const discountTypes = [
    {
        id: 1,
        name: "Giỏ hàng"
    },
    {
        id: 2,
        name: "Sản phẩm"
    },
    {
        id: 3,
        name: "Sản phẩm giá trị cao nhất"
    },
    {
        id: 4,
        name: "Sản phẩm giá trị thấp nhất"
    }
]