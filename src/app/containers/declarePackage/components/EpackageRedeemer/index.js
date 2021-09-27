import React, { useState, useRef, useEffect } from 'react'
import {
    ToolbarComponent,
    PaginationClient,
    LoadingComponent,
    SelectCustom,
    Input,
    TableResponsive,
    ContainerScreen,
    Button,
    Icon
} from "../../../../components";
import './style.css';
import { helper, date as FormatDate } from '../../../../common';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const EpackageRedeemer = (props) => {
    const {
        packageId,
        dataRedeemer,
        setDataRedeemer,
        getCache,
        isDisableAll,
        history,
        notifyError,
        createObjPackage,
        listProvince,
        listCompanyBrand,
        listOutputType,
    } = props;
    // console.log(props)
    const refToolbar = useRef();
    const [pageOfItems, setPageOfItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [keyWord, setKeyWord] = useState("");
    const [valueProvince, setValueProvince] = useState("")
    const [valueCompanyBrand, setValueCompanyBrand] = useState("")
    const [valueOutputType, setValueOutputType] = useState("")
    const [isCheckAll, setIsCheckAll] = useState(0)
    const [provinces, setProvinces] = useState([])
    const [companyBrands, setCompanyBrands] = useState([])
    const [outputTypes, setOutputTypes] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [pageSize, setPageSize] = useState(10)
    useEffect(() => {
        let termData = [...dataRedeemer];
        setDataSearch(dataRedeemer)
        setPageOfItems(termData.splice(0, 10));
        if(listProvince.length === 0){
            getProvinceList()
        }else{
            setProvinces(listProvince)
        }

        if(listCompanyBrand.length === 0){
            getCompanyBrandList()
        }else{
            setCompanyBrands(listCompanyBrand)
        }
        console.log('listOutputType', listOutputType)
        if(listOutputType.length === 0){
            getOutputTypeList()
        }else{
            setOutputTypes(listOutputType)
        }

        refToolbar.current.setVisible(true, true, true, true);
        refToolbar.current.setDisable(false, false, false, false);
    }, [])

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
                notifyError("Tỉnh thành: " + err.msgError)
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
                notifyError("Thương hiệu: " + err.msgError)
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
                notifyError("Hình thức xuất: " + err.msgError)
                // console.log(err)
                setOutputTypes([])
                setIsLoading(false)
            })
    }

    const clearSearch = () => {
        setKeyWord("")
        setValueProvince("")
        setValueCompanyBrand("")
        setValueOutputType("")
        evoucherRedeemerSearch("", "", "", "")
    }

    const add = () => {
        let obj = createObjPackage();
        if (packageId && parseInt(packageId) > 0) {
            obj.packageId = parseInt(packageId);
        }
        history.push({
            pathname: "/redeemer-add",
            state: {
                objPackage: obj
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
        let termData = [...dataRedeemer]
        let termDataFilter = termData.filter(x => x.isCheck === 1)
        let termDataSearchFilter = termDataSearch.filter(x => x.isCheck === 1)

        termDataFilter.forEach(x => {
            let index = termData.findIndex(y => y.termId == x.termId);
            if (termData[index].redeemerId) {
                termData[index].isDeleted = 1;
            } else {
                termData.splice(index, 1)
            }
        })

        termDataSearchFilter.forEach(x => {
            let indexSearch = termDataSearch.findIndex(y => y.termId == x.termId);
            if (termDataSearch[indexSearch].redeemerId) {
                termDataSearch[indexSearch].isDeleted = 1;
            } else {
                termDataSearch.splice(indexSearch, 1)
            }
        })
        // console.log(termDataSearch)
        // console.log(termData)
        setDataSearch([...termDataSearch])
        setDataRedeemer(termData)
        setPageOfItems(termDataSearch.splice(0, pageSize))
        setIsLoading(false)
    }

    const onChangePageClient = (pageOfItems, pageSize) => {
        // update state with new page of items
        setPageOfItems(pageOfItems)
        setPageSize(pageSize)
    }

    const setCheckAll = () => {
        if (isDisableAll) return;
        let termData = [...dataRedeemer];
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
        setDataSearch(termDataSearch)
        setDataRedeemer(termData)
    }

    const onCheckItem = (redeemerId) => {
        if (isDisableAll) return;
        let termData = [...dataRedeemer];
        let termDataSearch = [...dataSearch]
        let index = termData.findIndex(x => x.termId == redeemerId);
        let indexSearch = termDataSearch.findIndex(x => x.termId == redeemerId);
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
        setDataRedeemer(termData)
    }

    const evoucherRedeemerSearch = (keyWord, valueCompanyBrand, valueOutputType, valueProvince) => {
        setIsLoading(true)
        let textToLowerCase = keyWord.toLowerCase();
        let termData = [...dataRedeemer];
        let termDataFilter = termData.filter(x =>
            (x.termId.toString().toLowerCase().includes(textToLowerCase)
                || x.redeemerName.toLowerCase().includes(textToLowerCase))
            && helper.convertPropertyInArrToString(x.lstCritCompanyBrand, "companyBrandId").includes(valueCompanyBrand)
            && helper.convertPropertyInArrToString(x.lstCritOutPutType, "outputTypeId").includes(valueOutputType)
            && helper.convertPropertyInArrToString(x.lstCritProvinced, "provinceId").includes(valueProvince)
        );
        setDataSearch(termDataFilter)
        termData = [...termDataFilter]
        termData = termData.splice(0, pageSize);
        setPageOfItems(termData);
        setIsLoading(false)

    }

    const deleteItem = (Id) => {
        let termDataSearch = [...dataSearch]
        let termData = [...dataRedeemer]
        let index = termData.findIndex(x => x.termId == Id)
        let indexSearch = termDataSearch.findIndex(x => x.termId == Id)
        if (termData[index].redeemerId > 0) {
            termData[index].isDeleted = 1;
            termDataSearch[indexSearch].isDeleted = 1;
        } else {
            termData.splice(index, 1)
            termDataSearch.splice(indexSearch, 1)
        }
        console.log(termDataSearch)
        setDataSearch([...termDataSearch])
        setDataRedeemer(termData)
        setPageOfItems(termDataSearch.splice(0, pageSize))
    }

    const editRedeemer = (item) => {
        let obj = createObjPackage();
        if (packageId && parseInt(packageId) > 0) {
            obj.packageId = parseInt(packageId);
        }
        history.push({
            pathname: "/redeemer/" + item.termId,
            state: {
                objRedeemer: item,
                objPackage: obj
            }
        });
    }

    const RenderBody = ({ item }) => {
        if(item.isDeleted !== 1) {
            return (
                <tr className="item-redeemer">
                    <td className={isDisableAll ? "disabled" : ""}>
                        {
                            item.isCheck === 1 ?
                                <CheckBoxOutlinedIcon className="checked" style={styles.active} onClick={() => onCheckItem(item.termId)} />
                                :
                                <CheckBoxOutlineBlankOutlinedIcon className="checked" style={styles.active} onClick={() => onCheckItem(item.termId)} />
                        }
                    </td>
                    <td>{item.redeemerId}</td>
                    <td>{item.redeemerName}</td>
                    <td>{item.createdUser}</td>
                    <td>{item.createdDate ? FormatDate.get_string_current_date_full(new Date(item.createdDate)) : null}</td>
                    <td>{item.updatedUser}</td>
                    <td>{item.updatedDate ? FormatDate.get_string_current_date_full(new Date(item.updatedDate)) : null}</td>
                    <td className="table-action">
                        <Icon
                            onClick={() => editRedeemer(item)}
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
        <ContainerScreen className="redeemer-container">
            <div className="col-sm-12 col-md-12 col-xl-9 pd-botton">
                <div className="search-toolbar">
                    <div className="container-keyword">
                        <span>Từ khóa</span>
                        <Input
                            value={keyWord}
                            type="text"
                            className="input-keyword"
                            placeholder="Nhập Mã/Tên bộ điều kiện"
                            onChange={(e) => setKeyWord(e.target.value)}
                            maxLength={500}
                        />
                    </div>
                    <div className="container-select-search">
                        <span className="title-select">Tỉnh thành</span>
                        <SelectCustom
                            data={provinces}
                            value={"provinceId"}
                            display={"provinceName"}
                            top={10}
                            valueSelect={valueProvince}
                            setValueSelect={setValueProvince}
                            className="select-redeemer"
                        />
                    </div>
                    <div className="container-select-search">
                        <span className="title-select">Thương hiệu</span>
                        <SelectCustom
                            data={companyBrands}
                            value={"brandId"}
                            display={"brandfullName"}
                            top={10}
                            valueSelect={valueCompanyBrand}
                            setValueSelect={setValueCompanyBrand}
                            className="select-redeemer"
                        />
                    </div>
                    <div className="container-select-search">
                        <span className="title-select">Hình thức xuất</span>
                        <SelectCustom
                            data={outputTypes}
                            value={"outputTypeId"}
                            display={"outputtypeName"}
                            top={10}
                            valueSelect={valueOutputType}
                            setValueSelect={setValueOutputType}
                            className="select-redeemer"
                        />
                    </div>
                    <div className="container-searchorclear">
                        <Button
                            onClick={() => evoucherRedeemerSearch(keyWord, valueCompanyBrand, valueOutputType, valueProvince)}
                            classBtn="btn-search"
                            icon={'fa fa-search'}
                        />
                        <Button
                            onClick={clearSearch}
                            classBtn="btn-clear"
                            icon={'fa fa-times'}
                            title={'Clear'}
                        />
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3 toolbar">
                <ToolbarComponent
                    ref={refToolbar}
                    add={add}
                    exportExcel={exportExcel}
                    importExcel={importExcel}
                    del={del}
                    disabled={isDisableAll}
                />
            </div>
            <div className="col-md-12 pd-botton">
                <div className="evoucher-title">
                    <span>Danh sách các bộ điều kiện áp dụng</span>
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
                        <td>Tên bộ điều kiện</td>
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
            <LoadingComponent isLoading={isLoading} />
        </ContainerScreen>
    )
}

const styles = {
    active: {
        color: '#3BB8C3'
    },
    notActive: {
        color: '#E34E2D'
    }
}
export default EpackageRedeemer;

