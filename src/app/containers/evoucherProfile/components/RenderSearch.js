import React from 'react'

const RenderSearch = (props) => {
    const {
        className,
        keyWord,
        setKeyWord,
        valueType,
        setValueType,
        valueTypes,
        discountType,
        setDiscountType,
        discountTypes,
        search,
        clearSearch,
        Input,
        Select,
        Button
    } = props;
    return (
        <div className={className}>
            <div className="input-search">
                <span>Từ khóa</span>
                <Input
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                    placeholder={"Nhập Mã/Tên Profile"}
                    className="input-keyword"
                    type="text"
                    maxLength={500}
                />
            </div>
            <div className="select_search">
                <span>Loại giá trị</span>
                <Select
                    value={"id"}
                    display={"name"}
                    valueSelect={valueType}
                    setValueSelect={setValueType}
                    data={valueTypes}
                    className="select-value"
                />
            </div>
            <div className="select_search">
                <span>Loại giảm giá</span>
                <Select
                    value={"id"}
                    display={"name"}
                    valueSelect={discountType}
                    setValueSelect={setDiscountType}
                    data={discountTypes}
                    className="select-discount"
                />
            </div>
            <div className="btn_search">
                <Button
                    icon={'fa fa-search'}
                    onClick={search}
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
    )
}

export default RenderSearch
