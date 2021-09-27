import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/button/Button';
import { LoadingComponent, ToolbarComponent } from '../../../../components';
import ProductApplyRedemerAdd from './AddPopup';

import { bindActionCreators } from 'redux';
import * as redeemerAction from '../../action';
import { connect } from 'react-redux';
import { getCache } from '../../../../common';

import './style.css';

const ProductApplyRedeemer = (props) => {
  const {
    redeemerAction,
    selectedMainGroup,
    setSelectedMainGroup,
    selectedSubGroup,
    setSelectedSubGroup,
    selectedBrand,
    setSelectedBrand,
    selectedInventoryStatus,
    setSelectedInventoryStatus,
    selectedProductApply,
    setSelectedProductApply,
    selectedProductUnApply,
    setSelectedProductUnApply,
    getCache,
    listBrand,
    listInventoryStatus,
    listMainGroup,
    listProduct,
    listSubGroup,
    lstMainGroup,
    lstSubGroup,
    lstBrand,
    lstInventoryStatus,
    lstProductExclude,
    lstProductInclude,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const titleList = [
    {
      currentTab: 1,
      title: 'Danh Sách Ngành Hàng',
      total: selectedMainGroup.length,
    },
    {
      currentTab: 2,
      title: 'Danh Sách Nhóm Hàng',
      total: selectedSubGroup.length,
    },
    {
      currentTab: 3,
      title: 'Danh Sách NSX Áp Dụng',
      total: selectedBrand.length,
    },
    {
      currentTab: 4,
      title: 'Danh Sách Sản Phẩm',
      total: selectedProductApply.length,
    },
    {
      currentTab: 5,
      title: 'Danh Sách Trạng Thái',
      total: selectedInventoryStatus.length,
    },
    {
      currentTab: 6,
      title: 'Danh Sách Sản Phẩm',
      total: selectedProductUnApply.length,
    },
  ];

  useEffect(() => {
    refToolbar.current.setVisible(true, true, true, true);
    refToolbar.current.setDisable(false, false, false, false);
    if (lstMainGroup.length > 0) {
      setSelectedMainGroup(lstMainGroup);
    }
    if (lstSubGroup.length > 0) {
      setSelectedSubGroup(lstSubGroup);
    }
    if (lstBrand.length > 0) {
      setSelectedBrand(lstBrand);
    }
    if (lstInventoryStatus.length > 0) {
      setSelectedInventoryStatus(lstInventoryStatus);
    }
    if (lstProductInclude.length > 0) {
      setSelectedProductApply(lstProductInclude);
    }
    if (lstProductExclude.length > 0) {
      setSelectedProductUnApply(lstProductExclude);
    }
  }, []);
  const handleMainGroupDeleteClick = (item) => {
    let index = selectedMainGroup.findIndex((x) => x.mainGroupId === item.mainGroupId);
    if (index >= 0) {
      let selectedOptions = selectedMainGroup.slice(0, index).concat(selectedMainGroup.slice(index + 1));
      setSelectedMainGroup(selectedOptions);
    }
  };
  const handleSubGroupDeleteClick = (item) => {
    let index = selectedSubGroup.findIndex((x) => x.subGroupId === item.subGroupId);
    if (index >= 0) {
      let selectedOptions = selectedSubGroup.slice(0, index).concat(selectedSubGroup.slice(index + 1));
      setSelectedSubGroup(selectedOptions);
    }
  };
  const handleProductAppplyDeleteClick = (item) => {
    let index = selectedProductApply.findIndex((x) => x.productId === item.productId);
    if (index >= 0) {
      let selectedOptions = selectedProductApply.slice(0, index).concat(selectedProductApply.slice(index + 1));
      setSelectedProductApply(selectedOptions);
    }
  };
  const handleProductUnAppplyDeleteClick = (item) => {
    let index = selectedProductUnApply.findIndex((x) => x.productId === item.productId);
    if (index >= 0) {
      let selectedOptions = selectedProductUnApply.slice(0, index).concat(selectedProductUnApply.slice(index + 1));
      setSelectedProductUnApply(selectedOptions);
    }
  };
  const handleInventoryStatusDeleteClick = (item) => {
    let index = selectedInventoryStatus.findIndex((x) => x.inventoryStatusId === item.inventoryStatusId);
    if (index > -1) {
      let selectedOptions = selectedInventoryStatus.slice(0, index).concat(selectedInventoryStatus.slice(index + 1));
      setSelectedInventoryStatus(selectedOptions);
    }
  };
  const handleBrandDeleteClick = (item) => {
    let index = selectedBrand.findIndex((x) => x.bRANDID === item.inventoryStatusId);
    if (index >= 0) {
      let selectedOptions = selectedBrand.slice(0, index).concat(selectedBrand.slice(index + 1));
      setSelectedBrand(selectedOptions);
    }
  };
  const [buttonAdd, setButtonAdd] = useState(false);
  //#region func for TabMenu
  const [currentTab, setCurrentTab] = useState(1);
  const [currentProductTab, setCurrentProductTab] = useState(0);
  const handleTabClick = (n) => {
    if (n !== 4) setCurrentProductTab(0);
    else setCurrentProductTab(1);
    setCurrentTab(n);
  };
  const handleProductTabClick = (n) => {
    setCurrentProductTab(n);
  };
  //#endregion

  //#region Func for ToolbarComponent
  const refToolbar = useRef();

  const add = () => {
    setButtonAdd(true);
  };
  const exportExcel = () => {
    alert('Chưa hỗ trợ !');
  };
  const importExcel = () => {
    alert('Chưa hỗ trợ !');
  };
  const del = () => {
    alert('Chưa hỗ trợ !');
  };
  //#endregion
  return (
    <div className="product-apply__container">
      <div className="row">
        <div className="col-md-12 col-ms-12 col-xl-9 product-apply__paper--left">
          <div className="product-apply__paper--header">
            <div className="product-apply__title ">
              {titleList.filter((current) => current.currentTab === currentTab)[0].title}
            </div>
            <div className="product-apply__result  ">
              <span>{titleList.filter((current) => current.currentTab === currentTab)[0].total}</span>
              <span> Kết quả được tìm thấy</span>
            </div>
            <div className="product-apply__excel">
              <Button title={'Xuất excel mẫu'} icon={'fa fa-upload'} classBtn={'btnExcel'} onClick={add}></Button>
            </div>
            <div className="product-apply__toolbar">
              <ToolbarComponent
                ref={refToolbar}
                add={add}
                importExcel={importExcel}
                exportExcel={exportExcel}
                del={del}
              ></ToolbarComponent>
            </div>
          </div>
          {currentTab === 1 ? (
            <div className="product-apply__table">
              <div className="product-table__header">
                <span className="col-md-1">
                  <input type="checkbox" disabled={true} />
                </span>
                <div className="col-md-4">Mã ngành Hàng</div>
                <div className="col-md-4">Tên Ngành Hàng</div>
                <div className="col-md-3">Hành Động</div>
              </div>
              <div style={{ overflow: 'auto' }}>
                {selectedMainGroup.length > 0
                  ? selectedMainGroup.map((item, index) => (
                      <div key={index} className="product-table__body">
                        <span className="col-md-1">
                          <input type="checkbox" />
                        </span>
                        <div className="col-md-4">{item.mainGroupId}</div>
                        <div className="col-md-4">{item.mainGroupName}</div>
                        <div className="col-md-3">
                          <Button
                            icon={'fa fa-trash'}
                            classBtn={'btnDelete'}
                            onClick={() => handleMainGroupDeleteClick(item)}
                          ></Button>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          ) : null}
          {currentTab === 2 ? (
            <div className="product-apply__table">
              <div className="product-table__header">
                <span className="col-md-1">
                  <input type="checkbox" disabled={true} />
                </span>
                <div className="col-md-4">Mã Nhóm Hàng</div>
                <div className="col-md-4">Tên Nhóm Hàng</div>
                <div className="col-md-4">Hành Động</div>
              </div>
              <div>
                {selectedSubGroup.map((item, index) => (
                  <div key={index} className="product-table__body">
                    <span className="col-md-1">
                      <input type="checkbox" />
                    </span>
                    <div className="col-md-4">{item.subGroupId}</div>
                    <div className="col-md-4">{item.subGroupName}</div>
                    <div className="col-md-3">
                      <Button
                        icon={'fa fa-trash'}
                        classBtn={'btnDelete'}
                        onClick={() => handleSubGroupDeleteClick(item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {currentTab === 3 ? (
            <div className="product-apply__table">
              <div className="product-table__header">
                <span className="col-md-1">
                  <input type="checkbox" disabled={true} />
                </span>
                <div className="col-md-4">Mã Nhà Sản Xuất</div>
                <div className="col-md-4">Tên Nhà Sản Xuất</div>
                <div className="col-md-3">Hành Động</div>
              </div>
              <div>
                {selectedBrand.map((item, index) => (
                  <div key={index} className="product-table__body">
                    <span className="col-md-1">
                      <input type="checkbox" />
                    </span>
                    <div className="col-md-4">{item.brandId}</div>
                    <div className="col-md-4">{item.brandName}</div>
                    <div className="col-md-3">
                      <Button
                        icon={'fa fa-trash'}
                        classBtn={'btnDelete'}
                        onClick={() => handleBrandDeleteClick(item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {currentProductTab === 1 ? (
            <div className="product-apply__table">
              <div className="product-table__header">
                <span className="col-md-1">
                  <input type="checkbox" disabled={true} />
                </span>
                <div className="col-md-4">Mã Sản Phẩm</div>
                <div className="col-md-4">Tên Sản Phẩm</div>
                <div className="col-md-3">Hành Động </div>
              </div>
              <div>
                {selectedProductApply.map((item, index) => (
                  <div key={index} className="product-table__body">
                    <span className="col-md-1">
                      <input type="checkbox" />
                    </span>
                    <div className="col-md-4">{item.productId}</div>
                    <div className="col-md-4">{item.productName}</div>
                    <div className="col-md-3">
                      <Button
                        icon={'fa fa-trash'}
                        classBtn={'btnDelete'}
                        onClick={() => handleProductAppplyDeleteClick(item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {currentProductTab === 2 ? (
            <div className="product-apply__table">
              <div className="product-table__header">
                <span className="col-md-1">
                  <input type="checkbox" disabled={true} />
                </span>
                <div className="col-md-4">Mã Sản Phẩm</div>
                <div className="col-md-4">Tên Sản Phẩm</div>
                <div className="col-md-3">Hành Động</div>
              </div>
              <div>
                {selectedProductUnApply.map((item, index) => (
                  <div key={index} className="product-table__body">
                    <span className="col-md-1">
                      <input type="checkbox" />
                    </span>
                    <div className="col-md-4">{item.productId}</div>
                    <div className="col-md-4">{item.productName}</div>
                    <div className="col-md-3">
                      <Button
                        icon={'fa fa-trash'}
                        classBtn={'btnDelete'}
                        onClick={() => handleProductUnAppplyDeleteClick(item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {currentTab === 5 ? (
            <div>
              <div>
                <div className="product-apply__list">
                  <input type="checkbox" disabled={true} />
                  <div className="col-md-3">Trạng thái tồn kho</div>
                  <div className="col-md-3">Hành động</div>
                </div>
                {selectedInventoryStatus.map((item, index) => (
                  <div key={index} className="product-apply__list">
                    <input key={item.inventoryStatusId} type="checkbox" id={item.inventoryStatusId} />
                    <div
                      className="col-md-3"
                      style={{
                        color: '#3BB8C3',
                        fontWeight: '500',
                        fontSize: '14px',
                        style: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {item.inventoryStatusId} - {item.inventoryStatusName}
                    </div>
                    <div className="col-md-3">
                      <Button
                        icon={'fa fa-trash'}
                        classBtn={'btnDelete'}
                        onClick={() => handleInventoryStatusDeleteClick(item)}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-md-12 col-ms-12 col-xl-3 product-apply__paper--right">
          <div className="product-apply__title col-md-12">Danh sách sản phẩm</div>
          <div className="product-apply-menu ">
            <Button
              title={'1'}
              classBtn={currentTab === 1 ? 'btnNumberTab--active' : 'btnNumberTab'}
              onClick={() => handleTabClick(1)}
            ></Button>
            <Button title={'Ngành hàng'} classBtn={'btnNameTab'} onClick={() => handleTabClick(1)}></Button>
          </div>
          <div className="product-apply-menu">
            <Button
              title={'2'}
              classBtn={currentTab === 2 ? 'btnNumberTab--active' : 'btnNumberTab'}
              onClick={() => handleTabClick(2)}
            ></Button>
            <Button title={'Nhóm hàng'} classBtn={'btnNameTab'} onClick={() => handleTabClick(2)}></Button>
          </div>
          <div className="product-apply-menu">
            <Button
              title={'3'}
              classBtn={currentTab === 3 ? 'btnNumberTab--active ' : 'btnNumberTab'}
              onClick={() => handleTabClick(3)}
            ></Button>
            <Button title={'Nhà sản xuất'} classBtn={'btnNameTab'} onClick={() => handleTabClick(3)}></Button>
          </div>
          <div className="product-apply-menu">
            <Button
              title={'4'}
              classBtn={currentTab === 4 ? 'btnNumberTab--active' : 'btnNumberTab'}
              onClick={() => handleTabClick(4)}
            ></Button>
            <Button title={'Sản phẩm'} classBtn={'btnNameTab'} onClick={() => handleTabClick(4)}></Button>
          </div>
          {currentProductTab !== 0 ? (
            <div className="product-apply-menu" style={{ display: 'block', marginLeft: '0.5rem' }}>
              <div className="col-md-12" style={{ margin: '1rem 1rem', display: 'inline-flex' }}>
                <Button
                  icon={'fa fa-tasks'}
                  classBtn={currentProductTab === 1 ? 'btnNameTab btnNameTab--actvie' : ' btnNameTab'}
                  onClick={() => handleProductTabClick(1)}
                ></Button>
                <Button
                  title={' Sản phẩm áp dụng'}
                  classBtn={currentProductTab === 1 ? 'btnNameTab btnNameTab--actvie' : ' btnNameTab'}
                  onClick={() => handleProductTabClick(1)}
                ></Button>
              </div>
              <div className="col-md-12" style={{ margin: '1rem 1rem', display: 'inline-flex' }}>
                <Button
                  icon={'fa fa-tasks'}
                  classBtn={currentProductTab === 2 ? 'btnNameTab btnNameTab--actvie' : ' btnNameTab'}
                  onClick={() => handleProductTabClick(2)}
                ></Button>
                <Button
                  title={' Sản phẩm không áp dụng'}
                  classBtn={currentProductTab === 2 ? 'btnNameTab btnNameTab--actvie' : ' btnNameTab'}
                  onClick={() => handleProductTabClick(2)}
                ></Button>
              </div>
            </div>
          ) : null}
          <div className="product-apply-menu" style={{ display: 'inline-flex', textAlign: 'left', order: 5 }}>
            <Button
              title={'5'}
              classBtn={currentTab === 5 ? 'btnNumberTab--active' : 'btnNumberTab'}
              onClick={() => handleTabClick(5)}
            ></Button>
            <Button title={'Trạng thái sản phẩm'} classBtn={'btnNameTab'} onClick={() => handleTabClick(5)}></Button>
          </div>
        </div>
      </div>
      <div>
        <ProductApplyRedemerAdd
          getCache={getCache}
          listBrand={listBrand}
          listInventoryStatus={listInventoryStatus}
          listMainGroup={listMainGroup}
          listProduct={listProduct}
          listSubGroup={listSubGroup}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          triger={buttonAdd}
          setButtonAdd={setButtonAdd}
          selectedMainGroup={selectedMainGroup}
          setSelectedMainGroup={setSelectedMainGroup}
          selectedSubGroup={selectedSubGroup}
          setSelectedSubGroup={setSelectedSubGroup}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedInventoryStatus={selectedInventoryStatus}
          setSelectedInventoryStatus={setSelectedInventoryStatus}
          selectedProductApply={selectedProductApply}
          setSelectedProductApply={setSelectedProductApply}
          selectedProductUnApply={selectedProductUnApply}
          setSelectedProductUnApply={setSelectedProductUnApply}
        ></ProductApplyRedemerAdd>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  listBrand: state.cache.brand.data,
  listInventoryStatus: state.cache.inventoryStatus.data,
  listMainGroup: state.cache.maingroup.data,
  listOutputType: state.cache.outputType.data,
  listProduct: state.cache.product.data,
  listSubGroup: state.cache.subgroup.data,
});
const mapDispatchToProps = (dispatch) => ({
  redeemerAction: bindActionCreators(redeemerAction, dispatch),
  getCache: bindActionCreators(getCache, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductApplyRedeemer);
