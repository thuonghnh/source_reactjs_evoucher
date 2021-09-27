import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button/Button';
import { MultiselectCustom, Input } from '../../../../components';
const ProductDeclareRedemer = (props) => {
  const {
    brand,
    getProductList,
    mainGroup,
    subGroup,
    product,
    productParams,
    setProductParams,
    localProduct,
    setLocalProduct,
    localUnApplyProduct,
    setLocalUnApplyProduct,
  } = props;
  const [selectedMainGroupID, setSelectedMainGroupID] = useState(''); // danh sách MainGroup được chọn (string)
  const [selectedSubGroupID, setSelectedSubGroupID] = useState(''); // danh sách SubGroup được chọn (string)
  const [selectedBrandID, setSelectedBrandID] = useState(''); // danh sách Brand được chọn (string)
  const [localSelectedApplyProduct, setLocalSelectedApplyProduct] = useState([]); // danh sách Product được chọn (object)
  const [localSelectedUnApplyProduct, setLocalSelectedUnApplyProduct] = useState([]); // danh sách Product được chọn (object)

  const [keyWord, setKeyWord] = useState('');
  const [isApply, setIsApply] = useState(1); // Sản phẩm Áp dụng ( default = 1 - Áp dụng)
  const [lstIsChecked, setLstIsChecked] = useState([]);
  const [lstProductUnApplyIsChecked, setLstProductUnApplyIsChecked] = useState([]);
  const handleSearchClick = () => {
    getProductList({
      ...productParams,
      keyWord: keyWord,
      mainGroupId: selectedMainGroupID,
      subGroupId: selectedSubGroupID,
      brandId: selectedBrandID,
      pageIndex: 1,
      pageSize: 10,
    });
  };
  useEffect(() => {
    if (localProduct.length > 0) {
      setLocalSelectedApplyProduct(localProduct);
      setLstIsChecked(localProduct.map((x) => x.productId));
    }
    if (localUnApplyProduct.length > 0) {
      setLocalSelectedUnApplyProduct(localUnApplyProduct);
      setLstProductUnApplyIsChecked(localUnApplyProduct.map((x) => x.productId));
    }
  }, []);
  useEffect(() => {
    if (isApply === 1) {
      if (lstIsChecked.length > 0)
        lstIsChecked.forEach((element) => {
          let index = product.findIndex((x) => x.productId === element);
          if (index > -1) document.getElementById(element).checked = true;
        });
    } else {
      if (lstProductUnApplyIsChecked.length > 0)
        lstProductUnApplyIsChecked.forEach((element) => {
          let index = product.findIndex((x) => x.productId === element);
          if (index > -1) document.getElementById(element).checked = true;
        });
    }
  });

  useEffect(() => {
    setLocalProduct(localSelectedApplyProduct);
  });
  useEffect(() => {
    setLocalUnApplyProduct(localSelectedUnApplyProduct);
  });
  const handleClearClick = () => {
    setKeyWord('');
    setSelectedBrandID('');
    setSelectedMainGroupID('');
    setSelectedSubGroupID('');
  };
  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };
  const handleFilterProductClick = (n) => {
    setIsApply(n);
    getProductList({
      keyWord: '',
      mainGroupId: 0,
      subGroupId: 0,
      brandId: 0,
      pageIndex: 1,
      pageSize: 10,
    });
    setLocalUnApplyProduct(localSelectedUnApplyProduct);
    setLocalProduct(localSelectedApplyProduct);
    console.log(localSelectedApplyProduct, 'localProduct');
    console.log(localSelectedUnApplyProduct, 'localUnApplyProduct');
  };
  const handleProductUnApplyDeleteClick = (item) => {
    item.checked = 0;
    let index = localSelectedUnApplyProduct.findIndex((x) => x.productId === item.productId);
    if (index >= 0) {
      let localProductNew = localSelectedUnApplyProduct
        .slice(0, index)
        .concat(localSelectedUnApplyProduct.slice(index + 1));
      let lstIsCheckedNew = lstProductUnApplyIsChecked
        .slice(0, index)
        .concat(lstProductUnApplyIsChecked.slice(index + 1));
      setLocalSelectedUnApplyProduct(localProductNew);
      setLstProductUnApplyIsChecked(lstIsCheckedNew);
      document.getElementById(item.productId).checked = false;
    }
  };
  const handleProductApplyDeleteClick = (item) => {
    let index = localSelectedApplyProduct.findIndex((x) => x.productId === item.productId);
    if (index >= 0) {
      let localProductNew = localSelectedApplyProduct
        .slice(0, index)
        .concat(localSelectedApplyProduct.slice(index + 1));
      let lstIsCheckedNew = lstIsChecked.slice(0, index).concat(lstIsChecked.slice(index + 1));
      setLocalSelectedApplyProduct(localProductNew);
      setLstIsChecked(lstIsCheckedNew);
      document.getElementById(item.productId).checked = false;
    }
  };

  const checkbox = (item) => {
    let isExist = false;
    if (lstIsChecked.length > 0) {
      lstIsChecked.forEach((x) => {
        if (item.productId === x) {
          isExist = true;
          document.getElementById(item.productId).checked = true;
        }
      });
      if (isExist === false) {
        setLocalSelectedApplyProduct([...localSelectedApplyProduct, item]);
        setLocalProduct([...localProduct, item]);
        setLstIsChecked([...lstIsChecked, item.productId]);
      }
    } else {
      setLocalProduct([...localProduct, item]);
      setLocalSelectedApplyProduct([...localSelectedApplyProduct, item]);
      setLstIsChecked([...lstIsChecked, item.productId]);
    }
  };
  const checkboxNo = (item) => {
    let isExist = false;

    if (lstProductUnApplyIsChecked.length > 0) {
      lstProductUnApplyIsChecked.forEach((x) => {
        if (item.productId === x) {
          isExist = true;
          document.getElementById(item.productId).checked = true;
        }
      });
      if (isExist === false) {
        setLocalUnApplyProduct([...localUnApplyProduct, item]);
        setLstProductUnApplyIsChecked([...lstProductUnApplyIsChecked, item.productId]);
        setLocalSelectedUnApplyProduct([...localSelectedUnApplyProduct, item]);
      }
    } else {
      setLocalUnApplyProduct([...localUnApplyProduct, item]);
      setLstProductUnApplyIsChecked([...lstProductUnApplyIsChecked, item.productId]);
      setLocalSelectedUnApplyProduct([...localSelectedUnApplyProduct, item]);
    }
  };
  return (
    <div className="product-apply__tab" style={{ paddingTop: '1rem' }}>
      <div className="btn-group pd-botton " role="group" aria-label="Basic outlined example">
        <button
          type="button"
          className={`${isApply === 1 ? 'btn__product--active' : 'btn__product'}`}
          style={{ borderRadius: '5px 0 0 5px' }}
          onClick={() => {
            handleFilterProductClick(1);
          }}
        >
          Áp dụng
        </button>
        <button
          type="button"
          className={`${isApply === 0 ? 'btn__product--active ' : 'btn__product'}`}
          style={{ borderRadius: ' 0 5px 5px 0' }}
          onClick={() => {
            handleFilterProductClick(0);
          }}
        >
          Không áp dụng
        </button>
      </div>
      <div className="product-apply__search">
        <Input
          value={keyWord}
          onChange={handleKeyWordChange}
          className="maingroup-input"
          placeholder={'Nhập Mã/Tên sản phẩm'}
        ></Input>
        <div style={{ width: '160px', borderLeft: 'none' }}>
          <MultiselectCustom
            value={'mainGroupId'}
            display={'mainGroupName'}
            data={mainGroup}
            top={10}
            valueSelect={selectedMainGroupID}
            setValueSelect={setSelectedMainGroupID}
            placeholder={'--Chọn ngành hàng--'}
          />
        </div>
        <div style={{ width: '160px', borderLeft: 'none ' }}>
          <MultiselectCustom
            value={'subGroupId'}
            display={'subGroupName'}
            data={subGroup}
            top={10}
            valueSelect={selectedSubGroupID}
            setValueSelect={setSelectedSubGroupID}
            placeholder={'--Chọn nhóm hàng--'}
          />
        </div>
        <div style={{ width: '160px', borderLeft: 'none' }}>
          <MultiselectCustom
            value={'brandId'}
            display={'brandName'}
            data={brand}
            top={10}
            valueSelect={selectedBrandID}
            setValueSelect={setSelectedBrandID}
            placeholder={'--Chọn Nhà sản xuất--'}
          />
        </div>
        <Button icon={'fa fa-search'} classBtn={'btnSearch'} onClick={handleSearchClick}></Button>
        <Button title={'Clear'} icon={'fa fa-times'} classBtn={'btnClear'} onClick={handleClearClick}></Button>
      </div>
      <div className="product-apply__table" style={{ marginTop: '1rem' }}>
        <div className="product-table__header">
          <div className="col-md-1">
            <input type="checkbox" />
          </div>
          <div className="col-md-4">Mã Sản Phẩm</div>
          <div className="col-md-7"> Tên Sản Phẩm</div>
        </div>
        <div>
          {product.length > 0
            ? product.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-1">
                    {isApply === 1 ? (
                      <input
                        key={item.productId + '1'}
                        id={item.productId}
                        type="checkbox"
                        onClick={() => checkbox(item)}
                      />
                    ) : (
                      <input
                        key={item.productId + '0'}
                        id={item.productId}
                        type="checkbox"
                        onClick={() => checkboxNo(item)}
                      />
                    )}
                  </div>
                  <div className="col-md-4">{item.productId}</div>
                  <div className="col-md-7">{item.productName}</div>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="product-apply__table" style={{ marginTop: '1rem' }}>
        <div className="product-table__header">
          <div className="col-md-4">Mã Sản Phẩm</div>
          <div className="col-md-5"> Tên Sản Phẩm</div>
          <div className="col-md-3"> Hành động</div>
        </div>
        <div>
          {isApply === 1
            ? localSelectedApplyProduct.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-4">{item.productId}</div>
                  <div className="col-md-5">{item.productName}</div>
                  <div className="col-md-3">
                    <Button
                      icon={'fa fa-trash'}
                      classBtn={'btnDelete'}
                      onClick={() => handleProductApplyDeleteClick(item)}
                    ></Button>
                  </div>
                </div>
              ))
            : localSelectedUnApplyProduct.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-4">{item.productId}</div>
                  <div className="col-md-5">{item.productName}</div>
                  <div className="col-md-3">
                    <Button
                      icon={'fa fa-trash'}
                      classBtn={'btnDelete'}
                      onClick={() => handleProductUnApplyDeleteClick(item)}
                    ></Button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDeclareRedemer;
