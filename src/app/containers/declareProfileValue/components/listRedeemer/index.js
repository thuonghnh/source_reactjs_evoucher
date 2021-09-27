import React, { useState, useEffect } from 'react'
import {
    ContainerScreen,
    Input,
    SelectCustom,
    Button,
    TableResponsive,
    Icon,
    PaginationClient
} from '../../../../components';
import { helper, date as FormatDate } from '../../../../common';
import './style.css'
const ListRedeemer = (props) => {
    const {
        isLoading,
        setIsLoading,
        history,
        // listIdRedeemer,
        notifyError,
        isDisableAll,
        objPackage,
        dataRedeemer,
        setDataRedeemer,
        provinces,
        companyBrands,
        outputTypes,
        isCheckAllListRedeemer,
        setIsCheckAllListRedeemer,
        profileValueId,
        objProfile,
        createObjProfileValue
    } = props;

    const [pageOfItems, setPageOfItems] = useState([])
    const [keyWord, setKeyWord] = useState("");
    const [valueProvince, setValueProvince] = useState("")
    const [valueCompanyBrand, setValueCompanyBrand] = useState("")
    const [valueOutputType, setValueOutputType] = useState("")


    const [dataSearch, setDataSearch] = useState([])
    const [pageSize, setPageSize] = useState(10)


    useEffect(() => {
        if (dataRedeemer.length > 0) {
            let termData = [...dataRedeemer]
            setDataSearch([...termData])
            setPageOfItems(termData.splice(0, 10));
        }
    }, [dataRedeemer])

    const clearSearch = () => {
        setKeyWord("")
        setValueProvince("")
        setValueCompanyBrand("")
        setValueOutputType("")
        evoucherRedeemerSearch("", "", "", "")
    }

    const evoucherRedeemerSearch = (keyWord, valueCompanyBrand, valueOutputType, valueProvince) => {
        setIsLoading(true)
        let textToLowerCase = keyWord.toLowerCase();
        let termData = [...dataRedeemer];
        let termDataFilter = termData.filter(x =>
            (x.redeemerId.toString().toLowerCase().includes(textToLowerCase)
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

    const setCheckAll = () => {
        if (isDisableAll) return;
        let termData = [...dataRedeemer];
        let termDataSearch = [...dataSearch]
        if (isCheckAllListRedeemer === 1) {
            setIsCheckAllListRedeemer(0)
            termData.map(x => x.isChecked = 0)
            termDataSearch.map(x => x.isChecked = 0)
        }
        else {
            setIsCheckAllListRedeemer(1)
            termData.map(x => x.isChecked = 1)
            termDataSearch.map(x => x.isChecked = 1)
        }
        setDataSearch(termDataSearch)
        setDataRedeemer(termData)
    }

    const onCheckItem = (redeemerId) => {
        if (isDisableAll) return;
        let termData = [...dataRedeemer];
        let termDataSearch = [...dataSearch]
        let index = termData.findIndex(x => x.redeemerId == redeemerId);
        let indexSearch = termDataSearch.findIndex(x => x.redeemerId == redeemerId);
        if (termData[index].isChecked === 1) {
            termData[index].isChecked = 0;
            termDataSearch[indexSearch].isChecked = 0;
            setIsCheckAllListRedeemer(0)
        } else {
            termData[index].isChecked = 1;
            termDataSearch[indexSearch].isChecked = 1;
            let tmp = termData.filter(x => !x.isChecked || x.isChecked === 0).length;
            if (tmp === 0) setIsCheckAllListRedeemer(1)
        }
        setDataSearch(termDataSearch)
        setDataRedeemer(termData)
    }

    const onChangePageClient = (pageOfItems, pageSize) => {
        // update state with new page of items
        setPageOfItems(pageOfItems)
        setPageSize(pageSize)
    }

    const editRedeemer = (item) => {
        let obj = createObjProfileValue();
        if (profileValueId && parseInt(profileValueId) > 0) {
            obj.packageProfileValueId = parseInt(profileValueId);
        }
        history.push({
            pathname: "/redeemer/" + item.redeemerId,
            state: {
                objPackage: objPackage,
                objProfile: objProfile,
                objProfileValue: obj
            }
        });
    }

    const RenderBody = ({ item }) => {
        return (
            <tr className="item-redeemer">
                <td className={isDisableAll ? "disabled" : ""}>
                    {
                        item.isChecked === 1 ?
                            <Icon
                                style={styles.iconActive}
                                icon={"fa fa-check-square"}
                                onClick={() => onCheckItem(item.redeemerId)}
                            />
                            :
                            <Icon
                                style={styles.iconActive}
                                icon={"fa fa-square"}
                                onClick={() => onCheckItem(item.redeemerId)}
                            />
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
                        className="icon-table"
                    />
                </td>
            </tr>
        )
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
            <div className="col-md-12 pd-botton">
                <div className="evoucher-title">
                    <span>Danh sách các bộ điều kiện</span>
                </div>
            </div>
            <TableResponsive className="col-md-12 pd-botton deprofile-value-table">
                <thead>
                    <tr>
                        <td className={isDisableAll ? "disabled" : ""}>
                            {
                                isCheckAllListRedeemer === 1 ?
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-check-square"}
                                        onClick={setCheckAll}
                                        className="icon-table"
                                    />
                                    :
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-square"}
                                        onClick={setCheckAll}
                                        className="icon-table"
                                    />
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
                        <PaginationClient items={dataSearch} totalItems={dataSearch.length} onChangePage={onChangePageClient} />
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
    iconActive: {
        color: "#3BB8C3",
        fontSize: "1.2rem"
    },
    iconWhite: {
        color: "#3BB8C3",
        fontSize: "1.2rem"
    }
}

export default ListRedeemer
