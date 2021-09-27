import React, { useState, useEffect, useRef } from 'react'
import './styles/selectCustomStyle.css';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    top: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    setValueSelect: PropTypes.func.isRequired,
}

const SelectCustom = (props) => {
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
    // console.log(data)
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [dataSearch, setDataSearch] = useState([])
    const [keyWord, setKeyWord] = useState("")
    const [itemSelect, setItemSelect] = useState(null)

    useEffect(() => {
        if (valueSelect || valueSelect == 0) {
            let obj = data.find(x => x[value] == valueSelect)
            if (obj){
                setItemSelect(obj)
            }else{
                setItemSelect(null)
            }
        }else{
            setItemSelect(null)
        }
        setKeyWord("")
        let termData = [...data]
        setDataSearch(termData.splice(0, top))
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
        let dataSearchTerm = [...dataSearch]
        let obj = dataSearchTerm.find(x => x[value] == item[value])
        setItemSelect(obj)
        if (onChange) {
            onChange(obj)
        }

        setValueSelect(obj[value])
        setIsShowPopup(false);
    }

    const RenderItem = ({ item }) => {
        return (
            <div onClick={() => selectItem(item)} className="item-popup">
                <span>{item[display]}</span>
            </div>
        )
    }

    const setShowPopup = () => {
        if (isShowPopup) setIsShowPopup(false)
        else setIsShowPopup(true)
    }

    const changeKeyWord = (text) => {
        setKeyWord(text)
        let dataSearchTerm = [...data]
        if (text) {
            let textToLowerCase = text.toLowerCase();
            dataSearchTerm = dataSearchTerm.filter(x => x[display].toLowerCase().includes(textToLowerCase))
        }
        let dataTmp = dataSearchTerm.splice(0, top);
        setDataSearch(dataTmp)
    }

    const clearData = () => {
        setItemSelect(null)
        setKeyWord("")
        setValueSelect("")
        if (onChange) {
            onChange(null)
        }
        let termData = [...data]
        setDataSearch(termData.splice(0, top))
    }

    return (
        <div className={"select-custom-container" + (className ? " " + className : "")}>
            <div className="select-container">
                <button style={!hideClearIcon && itemSelect ? styles.pdRight : null} disabled={disabled} ref={ref} onClick={setShowPopup} className="select-btn">
                    {
                        itemSelect ?
                            <span className="select-value">{itemSelect[display]}</span>
                            :
                            <span className="select-value">{placeholder ? placeholder : '--Vui lòng chọn--'}</span>
                    }
                    {
                        isShowPopup ?
                            <i style={disabled ? styles.disabled : null} className="fa fa-caret-down" aria-hidden="true"></i>
                            :
                            <i style={disabled ? styles.disabled : null} className="fa fa-caret-up" aria-hidden="true"></i>
                    }
                </button>
                {
                    !hideClearIcon && itemSelect ?
                        <button disabled={disabled} className="clear-data" onClick={clearData}>
                            <i style={disabled ? styles.disabled : null} className="fa fa-times" aria-hidden="true"></i>
                        </button>
                        :
                        null
                }

            </div>
            <div ref={refPopup} style={isShowPopup ? { display: 'block' } : null} className="select-custom-popup">
                <div className="search-popup" >
                    <input
                        value={keyWord}
                        placeholder="Nhập từ khóa"
                        onChange={(e) => changeKeyWord(e.target.value)}
                    />
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
SelectCustom.propTypes = propTypes;
export default SelectCustom
