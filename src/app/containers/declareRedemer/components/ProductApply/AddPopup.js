import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button/Button';

import BrandDeclareRedemer from './BrandTab';
import InventoryStatusDeclareRedemer from './InventoryStatusTab';
import MainGroupDeclareRedemer from './MainGroupTab';
import ProductDeclareRedemer from './ProductTab';
import SubGroupDeclareRedemer from './SubGroupTab';

import './style.css';
import { LoadingComponent } from '../../../../components';
import { toast } from '../../../../common';
const style = {
  btnButton: {
    backgroundColor: '#3BB8C3',
    margin: '1rem',
    height: '35px',
    width: '35px',
    borderRadius: '35px',
  },
  btnClear: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3BB8C3',
    outlineStyle: 'none',
    padding: 0,
    with: '70px',
    alignSelf: 'center',
    margin: ' 0 1rem',
  },
  btnUnAccept: {
    backgroundColor: 'transparent',
    border: '1px solid #3BB8C3',
    color: '#3BB8C3',
    outlineStyle: 'none',
    padding: 0,
    with: '150px',
    alignSelf: 'center',
    height: '38px',
    minWith: '75px',
    width: '150px',
    margin: '1rem',
  },
  btnAccept: {
    border: 'none',
    outlineStyle: 'none',
    width: '150px',
    height: '38px',
    margin: '1rem',
  },
  btnSearch: {
    border: 'none',
    outlineStyle: 'none',
    width: 'auto',
    height: '38px',
    minWith: '75px',
  },
  btnDelete: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#E32D2D',
    outlineStyle: 'none',
    padding: 0,
    with: '70px',
    alignSelf: 'center',
    margin: ' 0 1rem',
  },
  active: {
    border: 'none',
    outlineStyle: 'none',
    width: 'auto',
    height: '38px',
    minWith: '75px',
  },
  grbtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1rem ',
  },
};

const ProductApplyRedemerAdd = (props) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedMainGroupOptions, setSelectedMainGroupOptions] = useState([]);
  const [selectedSubGroupOptions, setSelectedSubGroupOptions] = useState([]);
  const [selectedProductApplyOptions, setSelectedProductApplyOptions] = useState([]);
  const [selectedProductUnApplyOptions, setSelectedProductUnApplyOptions] = useState([]);
  const [selectedInventoryStatusOptions, setSelectedInventoryStatusOptions] = useState([]);
  const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
  const {
    getCache,
    listBrand,
    listInventoryStatus,
    listMainGroup,
    listProduct,
    listSubGroup,
    isLoading,
    setIsLoading,
    // Ngành hàng
    selectedMainGroup,
    setSelectedMainGroup,
    // Nhóm hàng
    selectedSubGroup,
    setSelectedSubGroup,
    // Nhà sản xuất
    selectedBrand,
    setSelectedBrand,
    // Trạng thái sản phẩm
    selectedInventoryStatus,
    setSelectedInventoryStatus,
    // Sản phẩm
    selectedProductApply,
    setSelectedProductApply,
    selectedProductUnApply,
    setSelectedProductUnApply,
  } = props;
  const haddleTabClick = (n) => {
    setCurrentTab(n);
  };

  const [mainGroup, setMainGroup] = useState([]);
  const [subGroup, setSubGroup] = useState([]);
  const [brand, setBrand] = useState([]);
  const [product, setProduct] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState([]);
  const [productParams, setProductParams] = useState({
    keyWord: '',
    mainGroupId: 0,
    subGroupId: 0,
    brandId: 0,
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (listMainGroup.length === 0) {
      getMaingroupList({ keyWord: '', languageId: 0 });
    } else {
      setMainGroup(listMainGroup);
    }
    if (listSubGroup.length === 0) {
      getSubgroupList({ keyWord: '', mainGroupId: -1 });
    } else {
      setSubGroup(listSubGroup);
    }
    if (listInventoryStatus.length === 0) {
      getInventoryList();
    } else {
      setInventoryStatus(listInventoryStatus);
    }
    return () => {
      setSelectedMainGroupOptions([]);
      setSelectedSubGroupOptions([]);
      setSelectedInventoryStatusOptions([]);
    };
  }, []);

  useEffect(() => {
    if (listBrand.length === 0) {
      getBrandList({
        keyWord: '',
        pageIndex: 1,
        pageSize: 10,
      });
    } else {
      setBrand(listBrand);
    }
    return () => setSelectedBrandOptions([]);
  }, []);

  useEffect(() => {
    if (listProduct.length === 0) {
      getProductList(productParams);
    } else {
      setProduct(listProduct);
    }
    console.log(productParams, 'PRODUCT_PARAMS');
    return () => {
      setSelectedProductApplyOptions([]);
      setSelectedProductUnApplyOptions([]);
    };
  }, []);

  const getMaingroupList = (mainGroupParams) => {
    setIsLoading(true);
    getCache
      .getMaingroupList(mainGroupParams)
      .then((res) => {
        setMainGroup(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setMainGroup([]);
        toast.notifyError('Lỗi lấy danh sách ngành hàng. Vui lòng kiểm tra lại !');
        setIsLoading(false);
      });
  };
  const getSubgroupList = (subGroupParams) => {
    setIsLoading(true);
    getCache
      .getSubgroupList(subGroupParams)
      .then((res) => {
        setSubGroup(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setSubGroup([]);
        toast.notifyError('Lỗi lấy danh sách nhóm hàng . Vui lòng kiểm tra lại !');
        setIsLoading(false);
      });
  };
  const getBrandList = (brandParams) => {
    setIsLoading(true);
    getCache
      .getBrandList(brandParams)
      .then((res) => {
        setBrand(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setBrand([]);
        toast.notifyError('Lỗi lấy danh sách nhà sản xuất');
        setIsLoading(false);
      });
  };
  const getProductList = (produtParams) => {
    setIsLoading(true);
    getCache
      .getProductList(produtParams)
      .then((res) => {
        setProduct(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setProduct([]);
        toast.notifyError('Lỗi lấy danh sách sản phẩm . vui lòng kiểm tra lại !');
        setIsLoading(false);
      });
  };
  const getInventoryList = () => {
    setIsLoading(true);
    getCache
      .getInventoryStatusList({
        languageId: 2,
      })
      .then((res) => {
        setInventoryStatus(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setInventoryStatus([]);
        toast.notifyError('Lỗi lấy danh sách trạng thái sản phẩm . Vui lòng kiểm tra lại');
        setIsLoading(false);
      });
  };
  const handleUpdateChange = () => {
    props.setButtonAdd(false);
    if (selectedMainGroup.length > 0) {
      let lstSelectedOptions = [];
      selectedMainGroupOptions.forEach((element) => {
        let index = selectedMainGroup.findIndex((x) => x.mainGroupId === element.mainGroupId);
        if (index < 0) lstSelectedOptions.push(element);
      });
      setSelectedMainGroup([...selectedMainGroup, ...lstSelectedOptions]);
    } else setSelectedMainGroup(selectedMainGroupOptions);

    if (selectedSubGroup.length > 0) {
      let lstSelectedOptions = [];
      selectedSubGroupOptions.forEach((element) => {
        let index = selectedSubGroup.findIndex((x) => x.subGroupId === element.subGroupId);
        if (index < 0) lstSelectedOptions.push(element);
      });
      setSelectedSubGroup([...selectedSubGroup, ...lstSelectedOptions]);
    } else setSelectedSubGroup(selectedSubGroupOptions);

    if (selectedProductApply.length) {
      let lstSelectedOptions = [];
      selectedProductApplyOptions.forEach((element) => {
        let index = selectedProductApply.findIndex((x) => x.productId === element.productId);
        if (index < 0) {
          lstSelectedOptions.push(element);
        }
      });
      setSelectedProductApply([...selectedProductApply, ...lstSelectedOptions]);
    } else setSelectedProductApply(selectedProductApplyOptions);

    if (selectedProductUnApply.length > 0) {
      let lstSelectedOptions = [];
      selectedProductUnApplyOptions.forEach((element) => {
        let index = selectedProductUnApply.findIndex((x) => x.productId === element.productId);
        if (index < 0) {
          lstSelectedOptions.push(element);
        }
      });
      setSelectedProductUnApply([...selectedProductUnApply, ...lstSelectedOptions]);
    } else setSelectedProductUnApply(selectedProductUnApplyOptions);

    if (selectedInventoryStatus.length > 0) {
      let lstSelectedOptions = [];
      selectedInventoryStatusOptions.forEach((element) => {
        let index = selectedInventoryStatus.findIndex((x) => x.inventoryStatusId === element.inventoryStatusId);
        if (index < 0) {
          lstSelectedOptions.push(element);
        }
      });
      setSelectedInventoryStatus([...selectedInventoryStatus, ...lstSelectedOptions]);
    } else setSelectedInventoryStatus(selectedInventoryStatusOptions);

    if (selectedBrand.length > 0) {
      let lstSelectedOptions = [];
      selectedBrandOptions.forEach((element) => {
        let index = selectedBrand.findIndex((x) => x.brandId === element.brandId);
        if (index < 0) {
          lstSelectedOptions.push(element);
        }
      });
      setSelectedBrand([...selectedBrand, ...lstSelectedOptions]);
    } else setSelectedBrand(selectedBrandOptions);

    selectedMainGroupOptions.map((x) => (x.isChecked = 0));
    selectedSubGroupOptions.map((x) => (x.isChecked = 0));
    selectedBrandOptions.map((x) => (x.checked = 0));
    selectedProductApplyOptions.map((x) => (x.checked = 0));
    selectedProductUnApplyOptions.map((x) => (x.checked = 0));
    selectedInventoryStatusOptions.map((x) => (x.checked = 0));
    setSelectedMainGroupOptions([]);
    setSelectedSubGroupOptions([]);
    setSelectedProductApplyOptions([]);
    setSelectedProductUnApplyOptions([]);
    setSelectedInventoryStatusOptions([]);
    setSelectedBrandOptions([]);

    console.log('selectedMainGroupOptions', selectedMainGroupOptions);
    console.log('selectedBrandOptions', selectedBrandOptions);
    console.log('selectedSubGroupOptions', selectedSubGroupOptions);
    console.log('selectedProductApplyOptions', selectedProductApplyOptions);
    console.log('selectedProductUnApplyOptions', selectedProductUnApplyOptions);
    console.log('selectedInventoryStatusOptions', selectedInventoryStatusOptions);
  };
  const handleCancelChange = () => {
    props.setButtonAdd(false);
    selectedMainGroupOptions.map((x) => (x.isChecked = 0));
    selectedSubGroupOptions.map((x) => (x.isChecked = 0));
    selectedBrandOptions.map((x) => (x.checked = 0));
    selectedProductApplyOptions.map((x) => (x.checked = 0));
    selectedProductUnApplyOptions.map((x) => (x.checked = 0));
    selectedInventoryStatusOptions.map((x) => (x.checked = 0));
    setSelectedMainGroupOptions([]);
    setSelectedSubGroupOptions([]);
    setSelectedProductApplyOptions([]);
    setSelectedProductUnApplyOptions([]);
    setSelectedInventoryStatusOptions([]);
    setSelectedBrandOptions([]);
  };
  return props.triger ? (
    <div className="product-apply__popup">
      <div className="product-apply__popup-inner">
        <div className="product-apply__title">
          <i className="fa fa-plus-circle"></i> DANH SÁCH SẢN PHẨM - THÊM MỚI
        </div>
        <div>
          <div className="tab-addpropduct">
            <Button
              title={'NGÀNH HÀNG '}
              onClick={() => haddleTabClick(1)}
              classBtn={currentTab !== 1 ? 'tablinks' : 'tablinks--active'}
            ></Button>
            <Button
              title={'NHÓM HÀNG'}
              onClick={() => haddleTabClick(2)}
              classBtn={currentTab !== 2 ? 'tablinks' : 'tablinks--active'}
            ></Button>
            <Button
              title={'NHÀ SẢN XUẤT'}
              onClick={() => haddleTabClick(3)}
              classBtn={currentTab !== 3 ? 'tablinks' : 'tablinks--active'}
            ></Button>
            <Button
              title={'SẢN PHẨM'}
              onClick={() => haddleTabClick(4)}
              classBtn={currentTab !== 4 ? 'tablinks' : 'tablinks--active'}
            ></Button>
            <Button
              title={'TRẠNG THÁI'}
              onClick={() => haddleTabClick(5)}
              classBtn={currentTab !== 5 ? 'tablinks' : 'tablinks--active'}
            ></Button>
          </div>
        </div>
        <div>
          {currentTab === 1 ? (
            <MainGroupDeclareRedemer
              getCache={getCache}
              isLoading={isLoading}
              mainGroup={mainGroup}
              selectedMainGroupOptions={selectedMainGroupOptions}
              setSelectedMainGroupOptions={setSelectedMainGroupOptions}
            ></MainGroupDeclareRedemer>
          ) : null}
          {currentTab === 2 ? (
            <SubGroupDeclareRedemer
              getCache={getCache}
              isLoading={isLoading}
              subGroup={subGroup}
              selectedSubGroupOptions={selectedSubGroupOptions}
              setSelectedSubGroupOptions={setSelectedSubGroupOptions}
            ></SubGroupDeclareRedemer>
          ) : null}
          {currentTab === 3 ? (
            <BrandDeclareRedemer
              getCache={getCache}
              isLoading={isLoading}
              setBrand={setBrand}
              brand={brand}
              getBrandList={getBrandList}
              setSelectedBrand={setSelectedBrand}
              selectedBrandOptions={selectedBrandOptions}
              setSelectedBrandOptions={setSelectedBrandOptions}
            ></BrandDeclareRedemer>
          ) : null}
          {currentTab === 4 ? (
            <ProductDeclareRedemer
              brand={brand}
              isLoading={isLoading}
              mainGroup={mainGroup}
              subGroup={subGroup}
              product={product}
              getProductList={getProductList}
              productParams={productParams}
              setProductParams={setProductParams}
              localProduct={selectedProductApplyOptions}
              setLocalProduct={setSelectedProductApplyOptions}
              localUnApplyProduct={selectedProductUnApplyOptions}
              setLocalUnApplyProduct={setSelectedProductUnApplyOptions}
            ></ProductDeclareRedemer>
          ) : null}
          {currentTab === 5 ? (
            <InventoryStatusDeclareRedemer
              inventoryStatus={inventoryStatus}
              selectedInventoryStatusOptions={selectedInventoryStatusOptions}
              setSelectedInventoryStatusOptions={setSelectedInventoryStatusOptions}
            ></InventoryStatusDeclareRedemer>
          ) : null}
        </div>
        <div className="grbtn">
          <Button title={'Bỏ qua'} styleBtn={style.btnUnAccept} onClick={handleCancelChange}></Button>
          <Button title={'Thêm mới'} styleBtn={style.btnSearch} onClick={handleUpdateChange}></Button>
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  ) : (
    ''
  );
};

export default ProductApplyRedemerAdd;
