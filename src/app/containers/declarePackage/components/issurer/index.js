import React, { useState, useEffect } from 'react'
import {
    PaginationClient,
    LoadingComponent,
    Input,
    TableResponsive,
    ContainerScreen
} from "../../../../components";
import './style.css';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const Issurer = (props) => {
    const {
        getCache,
        issueBy,
        setIssueBy,
        isDisableAll,
        setIsLoading,
        listCompany
    } = props;
    const [keyWord, setKeyWord] = useState("")
    const [pageOfItems, setPageOfItems] = useState([])
    const [dataIssuer, setDataIssuer] = useState([])
    const [dataIssuerSearch, setDataIssuerSearch] = useState([])
    const [pageSize, setPageSize] = useState(10)
    useEffect(() => {
        // console.log(listCompany)
        // console.log(dataIssuer)
        if (listCompany.length === 0){
            getCompanyList()
        }else{
            mapDataIssuer(listCompany)
        }
    }, [])

    const mapDataIssuer = (listCompany) => {
        let index = listCompany.findIndex(x => x.companyId == issueBy);
        if (index > -1) {
            listCompany[index].isCheck = 1;
        }
        setDataIssuer(listCompany)
        setDataIssuerSearch(listCompany)
        let termData = [...listCompany];
        setPageOfItems(termData.splice(0, 10));
    }

    const getCompanyList = () => {
        setIsLoading(true)
        getCache.getCompanyList()
            .then((res) => {
                mapDataIssuer(res);
                // console.log(res)
                setIsLoading(false)
            })
            .catch((err) => {
                setDataIssuer([])
                setDataIssuerSearch([])
                console.log(err)
                setIsLoading(false)
            })
    }

    const onChangePageClient = (pageOfItems, pageSize) => {
        // update state with new page of items
        // console.log('pageOfItems', pageOfItems)
        // console.log('dataIssuerSearch', dataIssuerSearch)
        setPageOfItems(pageOfItems)
        setPageSize(pageSize)
    }

    const onCheckItem = (companyId) => {
        if (isDisableAll) return;
        let termData = [...dataIssuerSearch];
        let termDataIssuer = [...dataIssuer];
        let index = termData.findIndex(x => x.companyId === companyId)
        let indexData = termDataIssuer.findIndex(x => x.companyId === companyId)
        if (termData[index].isCheck === 1) {
            termData[index].isCheck = 0;
            termDataIssuer[indexData].isCheck = 0;
            setIssueBy("")
        } else {
            termData.filter(x => x.isCheck === 1).map(x => x.isCheck = 0);
            termDataIssuer.filter(x => x.isCheck === 1).map(x => x.isCheck = 0);
            termDataIssuer[indexData].isCheck = 1;
            termData[index].isCheck = 1;
            setIssueBy(companyId)
        }
        setDataIssuer(termDataIssuer)
        setDataIssuerSearch(termData)
    }

    const RenderBody = ({ item }) => {
        return (
            <tr className="item-redeemer">
                <td className={"checked" + (isDisableAll ? " " + "disabled" : "")} style={{ width: "10%" }}>
                    {
                        item.isCheck === 1 ?
                            <CheckBoxOutlinedIcon style={styles.active} onClick={() => onCheckItem(item.companyId)} />
                            :
                            <CheckBoxOutlineBlankOutlinedIcon style={styles.active} onClick={() => onCheckItem(item.companyId)} />
                    }
                </td>
                <td style={{ width: "30%" }}>{item.companyId}</td>
                <td style={{ width: "60%", textAlign: "left" }}>{item.companyName}</td>
            </tr>
        )
    }

    const onchangeKeyword = (e) => {
        let text = e.target.value;
        setKeyWord(text)
        searchData(text)
    }

    const searchData = (text) => {
        let textToLowerCase = text.toLowerCase();
        let termData = [...dataIssuer];
        let termDataFilter = termData.filter(x => x.companyId.toString().toLowerCase().includes(textToLowerCase) || x.companyName.toLowerCase().includes(textToLowerCase));
        setDataIssuerSearch(termDataFilter)
        termData = [...termDataFilter]
        termData = termData.splice(0, pageSize);
        // console.log(termData)
        setPageOfItems(termData);

    }

    return (
        <ContainerScreen className="issuer-container">
            <div className="col-sm-12 col-md-6 col-xl-4 pd-botton">
                <Input
                    value={keyWord}
                    type="text"
                    className="input-keyword"
                    placeholder="Nhập Mã/Tên nhà phát hành"
                    onChange={onchangeKeyword}
                    maxLength={100}
                />
            </div>
            <TableResponsive>
                <thead>
                    <tr>
                        <td style={{ width: "10%" }}></td>
                        <td style={{ width: "30%" }}>Mã nhà phát hành</td>
                        <td style={{ width: "60%", textAlign: "left" }}>Tên nhà phát hành</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageOfItems.map((item, index) => {
                            return <RenderBody key={index} item={item} />
                        })
                    }
                </tbody>
            </TableResponsive>
            <div className="col-md-12">
                {
                    dataIssuerSearch && dataIssuerSearch.length > 0 ?
                        <PaginationClient items={dataIssuerSearch} totalItems={dataIssuerSearch.length} onChangePage={onChangePageClient} />
                        : null
                }
            </div>
        </ContainerScreen>
    )
}

const styles = {
    active: {
        color: '#3BB8C3'
    }
}

export default Issurer;
