import React, { useState, useEffect, useRef } from 'react'
import './styles/multiSelectStyle.css'
import { helper } from '../../common';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    top: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    valueSelect: PropTypes.string.isRequired,
    setValueSelect: PropTypes.func.isRequired,
}

const MultiselectCustom = (props) => {
    const {
        value,
        display,
        data,
        onChange,
        top,
        valueSelect,
        setValueSelect,
        disabled,
        className,
        placeholder,
        hideClearIcon
    } = props;
    const ref = useRef();
    const refPopup = useRef();

    const [isShowPopup, setIsShowPopup] = useState(false)
    const [isSelectAll, setIsSelectAll] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [keyWord, setKeyWord] = useState("")

    useEffect(() => {
        let termData = [...data]
        if (valueSelect) {
            let arr = valueSelect.split(",")
            termData.filter(x => arr.indexOf(x[value].toString()) > -1).map(x => x.isChecked = 1)
            termData.filter(x => arr.indexOf(x[value].toString()) < 0).map(x => x.isChecked = 0)
            // setKeyWord("")
            changeKeyWord(keyWord)
        } else {
            setDataSource(data)
            setDataSearch(termData.splice(0, top))
        }
        document.addEventListener("mousedown", moveDiv);
        return () => {
            document.removeEventListener("mousedown", moveDiv);
        };
    }, [data, valueSelect]);
    const moveDiv = e => {
        if (ref.current.contains(e.target)) {
            return;
        }
        //Nếu click vào chính Box thì không làm gì cả và return kết thúc hàm
        if (refPopup.current.contains(e.target)) return;
        //Ngược lại thì thực hiện việc thay đổi state
        setIsShowPopup(false);
    };

    const selectItem = (item) => {
        let dataTerm;
        if(dataSource.length === 0){
            dataTerm = [...data]
        }else{
            dataTerm = [...dataSource]
        }
        let dataSearchTerm = [...dataSearch]
        let index = dataTerm.findIndex(x => x[value] == item[value])
        let indexSearch = dataSearchTerm.findIndex(x => x[value] == item[value])
        if (dataTerm[index].isChecked === 1) {
            dataTerm[index].isChecked = 0
            dataSearchTerm[indexSearch].isChecked = 0
        } else {
            dataTerm[index].isChecked = 1
            dataSearchTerm[indexSearch].isChecked = 1
        }
        let dataCheck = dataTerm.filter(x => x.isChecked === 1);
        if (dataSearchTerm.filter(x => x.isChecked === 1).length === top) {
            setIsSelectAll(1)
        } else {
            setIsSelectAll(0)
        }
        setDataSource(dataTerm)
        setDataSearch(dataSearchTerm)
        if (onChange)
            onChange(dataCheck)

        setValueSelect(helper.convertPropertyInArrToString(dataCheck, value))
    }

    const RenderItem = ({ item }) => {
        return (
            <div onClick={() => selectItem(item)} className="item-popup">
                {
                    item.isChecked === 1 ?
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        :
                        <i className="fa fa-square-o" aria-hidden="true"></i>
                }
                <span>{item[value] + ' - ' + item[display]}</span>
            </div>
        )
    }

    const setShowPopup = () => {
        if (isShowPopup) setIsShowPopup(false)
        else setIsShowPopup(true)
    }

    const selectAll = () => {
        let dataTerm;
        if(dataSource.length === 0){
            dataTerm = [...data]
        }else{
            dataTerm = [...dataSource]
        }
        let dataSearchTerm = [...dataSearch]
        if (isSelectAll === 1) {
            setIsSelectAll(0)
            dataSearchTerm.map(x => x.isChecked = 0)
            let strValueSearch = helper.convertPropertyInArrToList(dataSearchTerm, value)
            dataTerm.filter(x => strValueSearch.indexOf(x[value]) > -1).map(x => x.isChecked = 0)
        } else {
            setIsSelectAll(1)
            dataSearchTerm.map(x => x.isChecked = 1)
            let strValueSearch = helper.convertPropertyInArrToList(dataSearchTerm, value)
            dataTerm.filter(x => strValueSearch.indexOf(x[value]) > -1).map(x => x.isChecked = 1)
        }
        let dataCheck = dataTerm.filter(x => x.isChecked == 1);
        setDataSource(dataTerm)
        setDataSearch(dataSearchTerm)
        if (onChange)
            onChange(dataCheck)
        setValueSelect(helper.convertPropertyInArrToString(dataCheck, value))
    }

    const changeKeyWord = (text) => {
        setKeyWord(text)
        let dataSearchTerm;
        if(dataSource.length === 0){
            dataSearchTerm = [...data]
        }else{
            dataSearchTerm = [...dataSource]
        }
        if (text) {
            let textToLowerCase = text.toLowerCase();
            dataSearchTerm = dataSearchTerm.filter(x => x[value].toString().toLowerCase().includes(textToLowerCase) || x[display].toLowerCase().includes(textToLowerCase))
        }
        let dataTmp = dataSearchTerm.splice(0, top);
        //dataSource.filter(x => !x.isChecked || x.isChecked === 0).length > 0 && 
        if (dataTmp.filter(x => !x.isChecked || x.isChecked === 0).length > 0 || dataTmp.length === 0) {
            setIsSelectAll(0)
        } else {
            setIsSelectAll(1)
        }
        setDataSearch(dataTmp)
    }

    const clearData = () => {
        setKeyWord("")
        setIsSelectAll(0)
        setValueSelect("")
        if (onChange)
            onChange([])
        let termData = [...data]
        termData.map(x => x.isChecked = 0)
        setDataSource([...termData])
        setDataSearch(termData.splice(0, top))
    }

    return (
        <div className={"multiselect-custom-container" + (className ? " " + className : "")}>
            <div className="multiselect-container">
                <button style={!hideClearIcon && valueSelect ? styles.pdRight : null} disabled={disabled} ref={ref} onClick={setShowPopup} className="multiselect-btn">
                    {
                        valueSelect ?
                            <span className="multiselect-value">{valueSelect}</span>
                            :
                            <span className="multiselect-value">{placeholder ? placeholder : '--Vui lòng chọn--'}</span>
                    }
                    {
                        isShowPopup ?
                            <i style={disabled ? styles.disabled : null} className="fa fa-caret-down" aria-hidden="true"></i>
                            :
                            <i style={disabled ? styles.disabled : null} className="fa fa-caret-up" aria-hidden="true"></i>
                    }
                </button>
                {
                    !hideClearIcon && valueSelect ?
                        <button disabled={disabled} className="clear-data" onClick={clearData}>
                            <i style={disabled ? styles.disabled : null} className="fa fa-times" aria-hidden="true"></i>
                        </button>
                        :
                        null
                }

            </div>
            <div ref={refPopup} style={isShowPopup ? { display: 'block' } : null} className="multiselect-custom-popup">
                <div className="search-popup" >
                    <input
                        value={keyWord}
                        placeholder="Nhập từ khóa"
                        onChange={(e) => changeKeyWord(e.target.value)}
                    />
                </div>
                <div onClick={selectAll} className="item-popup">
                    {
                        isSelectAll === 1 ?
                            <i className="fa fa-check-square" aria-hidden="true"></i>
                            :
                            <i className="fa fa-square-o" aria-hidden="true"></i>
                    }
                    <span>Chọn tất cả</span>
                </div>
                {
                    dataSearch.map((item, index) => {
                        return (
                            <RenderItem key={index} item={item} />
                        )
                    })
                }

            </div>
        </div >

    )
}

const styles = {
    pdRight: {
        paddingRight: "2rem"
    },
    disabled: {
        opacity: 0.5
    }
}
MultiselectCustom.propTypes = propTypes;
export default MultiselectCustom
