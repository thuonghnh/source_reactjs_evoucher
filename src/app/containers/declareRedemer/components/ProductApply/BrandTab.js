import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button/Button';
import { Input, LoadingComponent } from '../../../../components';

const BrandDeclareRedemer = (props) => {
  const { selectedBrandOptions, setSelectedBrandOptions, brand, isLoading, getBrandList, setBrand } = props;
  const [selectedBrandID, setSelectedBrandID] = useState([]);
  const [localBrandOptions, setLocalBrandOptions] = useState([]);
  const [keyWord, setKeyWord] = useState('');

  useEffect(() => {
    if (selectedBrandID.length > 0)
      selectedBrandID.forEach((element) => {
        let index = brand.findIndex((x) => x.brandId === element);
        if (index > -1) document.getElementById(element).checked = true;
      });
  });
  useEffect(() => {
    if (selectedBrandOptions.length > 0) {
      setLocalBrandOptions(selectedBrandOptions);
      setSelectedBrandID(selectedBrandOptions.map((x) => x.brandId));
    }
    if (brand.length === 0) {
      getBrandList({
        keyWord: '',
        pageIndex: 1,
        pageSize: 10,
      });
    } else {
      setBrand(brand);
    }
  }, []);
  const handleSearchClick = () => {
    getBrandList({ keyWord: keyWord, pageIndex: 1, pageSize: 20 });
  };
  useEffect(() => {
    setSelectedBrandOptions(localBrandOptions);
  }, [localBrandOptions]);

  const handleClearClick = () => {
    setKeyWord('');
    getBrandList({ keyWord: '', pageIndex: 1, pageSize: 20 });
  };
  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleBrandChange = (item) => {
    if (selectedBrandID.length > 0) {
      let index = selectedBrandID.findIndex((x) => x === item.brandId);
      if (index > -1) {
        item.checked = 0;
        let selectedOptions = localBrandOptions.slice(0, index).concat(localBrandOptions.slice(index + 1));
        setLocalBrandOptions(selectedOptions);
        let selectedOptionsID = selectedBrandID.slice(0, index).concat(selectedBrandID.slice(index + 1));
        setSelectedBrandID(selectedOptionsID);
      } else {
        item.checked = 1;
        setLocalBrandOptions([...localBrandOptions, item]);
        setSelectedBrandID([...selectedBrandID, item.brandId]);
      }
    } else {
      item.checked = 1;

      setLocalBrandOptions([...localBrandOptions, item]);
      setSelectedBrandID([...selectedBrandID, item.brandId]);
    }
  };
  const handleBrandDeleteClick = (item) => {
    let index = localBrandOptions.findIndex((x) => x.brandId === item.brandId);
    if (index > -1) {
      item.checked = 0;
      let localProductNew = localBrandOptions.slice(0, index).concat(localBrandOptions.slice(index + 1));
      setLocalBrandOptions(localProductNew);
      let selectedOptionsID = selectedBrandID.slice(0, index).concat(selectedBrandID.slice(index + 1));
      setSelectedBrandID(selectedOptionsID);
      document.getElementById(item.brandId).checked = false;
    }
  };
  return (
    <div className="product-apply__tab">
      <div className="product-apply__search">
        <Input
          value={keyWord}
          onChange={handleKeyWordChange}
          className="maingroup-input"
          placeholder={'Nhập Mã/Tên nhà sản xuất'}
        ></Input>
        <Button icon={'fa fa-search'} classBtn={'btnSearch'} onClick={handleSearchClick}></Button>
        <Button title={'Clear'} icon={'fa fa-times'} classBtn={'btnClear'} onClick={handleClearClick}></Button>
      </div>
      <div className="product-apply__table">
        <div className="product-table__header">
          <div className="col-md-1">
            <input type="checkbox" />
          </div>
          <div className="col-md-4">Mã Nhà Sản Xuất</div>
          <div className="col-md-7">Tên Nhà Sản Xuất</div>
        </div>
        <div>
          {brand.length > 0
            ? brand.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-1">
                    <input
                      type="checkbox"
                      key={item.brandId}
                      id={item.brandId}
                      onClick={() => handleBrandChange(item)}
                    ></input>
                  </div>
                  <div className="col-md-4">{item.brandId}</div>
                  <div className="col-md-7">{item.brandName}</div>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="product-apply__table">
        <div className="product-table__header">
          <div className="col-md-4">Mã Nhà Sản Xuất</div>
          <div className="col-md-6">Tên Nhà Sản Xuất</div>
          <div className="col-md-2">Hành động</div>
        </div>
        <div>
          {localBrandOptions.length > 0
            ? localBrandOptions.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-4">{item.brandId}</div>
                  <div className="col-md-6">{item.brandName}</div>
                  <div className="col-md-2">
                    <Button
                      icon={'fa fa-trash'}
                      classBtn={'btnDelete'}
                      onClick={() => handleBrandDeleteClick(item)}
                    ></Button>
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
};

export default BrandDeclareRedemer;
