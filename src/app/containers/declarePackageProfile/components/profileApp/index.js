import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import {
    ToolbarComponent,
    Button,
    DateControl,
    PaginationClient,
    Input,
    TableResponsive,
    ContainerScreen,
    Icon
} from '../../../../components'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { helper, date as FormatDate } from '../../../../common';

const today = new Date()

const ProfileApp = (props) => {
    const {
        history,
        isDisableAll,
        listValueApp,
        setListValueApp,
        packageProfileId,
        setIsLoading,
        objPackage,
        createObjProfile
    } = props;

    const refToolbar = useRef();
    const [isCheckAll, setIsCheckAll] = useState(0)
    const [dataSearch, setDataSearch] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [pageOfItems, setPageOfItems] = useState([])

    const [keyWord, setKeyWord] = useState("")
    const [fromDate, setFromDate] = useState(today)
    const [toDate, setToDate] = useState(FormatDate.getNext30Days(today))

    useEffect(() => {
        search(keyWord, fromDate, toDate)
        refToolbar.current.setVisible(true, true, true, true);
        refToolbar.current.setDisable(false, false, false, false);
    }, [])

    const add = () => {
        let obj = createObjProfile();
        if (!obj) return;
        if (packageProfileId > 0) {
            obj.packageProfileId = packageProfileId;
        }
        history.push({
            pathname: "/profile-value-add",
            state: {
                objPackage: objPackage,
                objProfile: obj
            }
        });
    }
    const exportExcel = () => {
    }
    const importExcel = () => {
    }
    const del = () => {
        setIsLoading(true)
        let termDataSearch = [...dataSearch]
        let termData = [...listValueApp]
        let termDataFilter = termData.filter(x => x.isCheck === 1)
        let termDataSearchFilter = termDataSearch.filter(x => x.isCheck === 1)

        termDataFilter.forEach(x => {
            let index = termData.findIndex(y => y.termId == x.termId);
            if (termData[index].packageProfileValueId) {
                termData[index].isDeleted = 1;
            } else {
                termData.splice(index, 1)
            }
        })

        termDataSearchFilter.forEach(x => {
            let indexSearch = termDataSearch.findIndex(y => y.termId == x.termId);
            if (termDataSearch[indexSearch].packageProfileValueId) {
                termDataSearch[indexSearch].isDeleted = 1;
            } else {
                termDataSearch.splice(indexSearch, 1)
            }
        })
        // console.log(termDataSearch)
        // console.log(termData)
        setDataSearch([...termDataSearch])
        setListValueApp(termData)
        setPageOfItems(termDataSearch.splice(0, pageSize))
        setIsLoading(false)
    }

    const search = (keyWord, fromDt, toDt) => {
        setIsLoading(true)
        //lấy đầu ngày
        let formdt = FormatDate.getTimestamp(new Date(FormatDate.formatDateFirstMMDDYYYY(fromDt)))
        //lấy cuối ngày
        let todt = FormatDate.getTimestamp(new Date(FormatDate.formatDateLastMMDDYYYY(toDt)))
        let textToLowerCase = keyWord.toLowerCase();
        let termData = [...listValueApp];
        // console.log(listValueApp)
        let termDataFilter = termData.filter(x =>
            (x.termId.toString().toLowerCase().includes(textToLowerCase)
                || x.packageProfileValueName.toLowerCase().includes(textToLowerCase))
            && (x.createddate >= formdt
                && x.createddate <= todt)
        );
        // console.log(termDataFilter)
        setDataSearch(termDataFilter)
        termData = [...termDataFilter]
        termData = termData.splice(0, pageSize);
        setPageOfItems(termData);
        setIsLoading(false)
    }

    const clearSearch = () => {
        setKeyWord("")
        search("", fromDate, toDate)
    }

    const onChangePageClient = (pageOfItems, pageSize) => {
        // update state with new page of items
        setPageOfItems(pageOfItems)
        setPageSize(pageSize)
    }

    const setCheckAll = () => {
        if (isDisableAll) return;
        let termData = [...listValueApp];
        let termDataSearch = [...dataSearch]
        if (isCheckAll === 1) {
            setIsCheckAll(0)
            termData.map(x => x.isCheck = 0)
            termDataSearch.map(x => x.isCheck = 0)
        }
        else {
            setIsCheckAll(1)
            termData.map(x => x.isCheck = 1)
            termDataSearch.map(x => x.isCheck = 1)
        }
        // console.log(termData)
        setDataSearch(termDataSearch)
        setListValueApp(termData)
    }

    const onCheckItem = (termId) => {
        if (isDisableAll) return;
        let termData = [...listValueApp];
        let termDataSearch = [...dataSearch]
        let index = termData.findIndex(x => x.termId == termId);
        let indexSearch = termDataSearch.findIndex(x => x.termId === termId);
        if (termData[index].isCheck === 1) {
            termData[index].isCheck = 0;
            termDataSearch[indexSearch].isCheck = 0;
            setIsCheckAll(0)
        } else {
            termData[index].isCheck = 1;
            termDataSearch[indexSearch].isCheck = 1;
            let tmp = termData.filter(x => !x.isCheck || x.isCheck === 0).length;
            if (tmp === 0) setIsCheckAll(1)
        }
        setDataSearch(termDataSearch)
        setListValueApp(termData)
    }

    const deleteItem = (termId) => {
        let termDataSearch = [...dataSearch]
        let termData = [...listValueApp]
        let index = termData.findIndex(x => x.termId == termId)
        let indexSearch = termDataSearch.findIndex(x => x.termId == termId)
        console.log(indexSearch)
        console.log(index)
        if (termData[index].packageProfileValueId > 0) {
            termData[index].isDeleted = 1;
            termDataSearch[indexSearch].isDeleted = 1;
        } else {
            termData.splice(index, 1)
            termDataSearch.splice(indexSearch, 1)
        }
        console.log([...termDataSearch])
        setDataSearch([...termDataSearch])
        setListValueApp(termData)
        setPageOfItems(termDataSearch.splice(0, pageSize))
    }

    const changeFromDate = (date) => {
        search("", date, toDate)
    }

    const changeToDate = (date) => {
        search("", date, toDate)
    }

    const redirectDeclareProfileValue = (item) => {
        let obj = createObjProfile();
        if (!obj) return;
        if (packageProfileId > 0) {
            obj.packageProfileId = packageProfileId;
        }
        history.push({
            pathname: "/profile-value/" + item.termId,
            state: {
                objPackage: objPackage,
                objProfile: obj,
                objProfileValue: item
            }
        });
    }

    const RenderBody = ({ item }) => {
        if (item.isDeleted !== 1) {
            return (
                <tr className="item-profilevalue">
                    <td className={isDisableAll ? "disabled" : ""}>
                        {
                            item.isCheck === 1 ?
                                <CheckBoxOutlinedIcon className="checked" style={styles.active} onClick={() => onCheckItem(item.termId)} />
                                :
                                <CheckBoxOutlineBlankOutlinedIcon className="checked" style={styles.active} onClick={() => onCheckItem(item.termId)} />
                        }
                    </td>
                    <td>{item.packageProfileValueId}</td>
                    <td>{item.packageProfileValueName}</td>
                    <td>{item.createduser}</td>
                    <td>{item.createddate ? FormatDate.get_string_current_date_full(new Date(item.createddate)) : null}</td>
                    <td>{item.updateduser}</td>
                    <td>{item.updateddate ? FormatDate.get_string_current_date_full(new Date(item.updateddate)) : null}</td>
                    <td className="table-action">
                        <Icon
                            onClick={() => redirectDeclareProfileValue(item)}
                            style={styles.active}
                            disabled={isDisableAll}
                            icon={"fa fa-pencil"}
                        />
                        <Icon
                            onClick={() => deleteItem(item.termId)}
                            style={styles.notActive}
                            disabled={isDisableAll}
                            icon={"fa fa-trash"}
                        />
                    </td>
                </tr>
            )
        }
        return null;
    }

    return (
        <ContainerScreen className="profile-app-container">
            <div className="col-md-8 col-xl-6 pd-botton">
                <div className="search-container">
                    <Input
                        value={keyWord}
                        type="text"
                        className="input-keyword"
                        placeholder="Nhập Mã/Tên bộ giá trị"
                        onChange={(e) => setKeyWord(e.target.value)}
                        maxLength={500}
                    />
                    <Button
                        icon={'fa fa-search'}
                        onClick={(e) => search(keyWord, fromDate, toDate)}
                        classBtn={"search-app"}
                    />
                    <Button
                        icon={'fa fa-times'}
                        onClick={clearSearch}
                        classBtn={"clear-app"}
                        title={"Clear"}
                    />
                </div>
            </div>
            <div className="col-md-12 col-xl-6 pd-botton profile-app-toolbar">
                <ToolbarComponent
                    ref={refToolbar}
                    add={add}
                    exportExcel={exportExcel}
                    importExcel={importExcel}
                    del={del}
                    disabled={isDisableAll}
                />
            </div>
            <div className="col-md-12 col-xl-5 pd-botton">
                <div className="evoucher-title">
                    <span>Danh sách bộ giá trị áp dụng</span>
                </div>
            </div>
            <div className="col-md-11 col-lg-9 col-xl-7 pd-botton">
                <div className="proapp-formdate">
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
            <TableResponsive>
                <thead>
                    <tr>
                        <td className={isDisableAll ? "disabled" : ""}>
                            {
                                isCheckAll === 1 ?
                                    <CheckBoxOutlinedIcon className="checked" style={styles.active} onClick={setCheckAll} />
                                    :
                                    <CheckBoxOutlineBlankOutlinedIcon className="checked" style={styles.active} onClick={setCheckAll} />
                            }
                        </td>
                        <td>Mã</td>
                        <td>Tên bộ giá trị</td>
                        <td>Người tạo</td>
                        <td>Thời gian tạo</td>
                        <td>Người cập nhật cuối</td>
                        <td>Thời gian cập nhật</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataSearch && dataSearch.length > 0 ?
                            pageOfItems.map((item, index) => {
                                return <RenderBody key={index} item={item} />
                            })
                            : null
                    }
                </tbody>
            </TableResponsive>
            <div className="col-md-12">
                {
                    dataSearch && dataSearch.length > 0 ?
                        <PaginationClient items={dataSearch.filter(x => !x.isDeleted || x.isDeleted === 0)} totalItems={dataSearch.filter(x => !x.isDeleted || x.isDeleted === 0).length} onChangePage={onChangePageClient} />
                        : null
                }

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
    disabled: {
        opacity: 0.6
    }
}


export default ProfileApp


