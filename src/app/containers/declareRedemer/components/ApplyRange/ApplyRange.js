import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './style.css';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import * as redeemerAction from '../../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCache, toast } from '../../../../common';
import { PaginationClient, LoadingComponent, PaginationServer } from '../../../../components';
import { SelectCustom } from '../../../../components';
import { MultiselectCustom } from '../../../../components';
import { helper } from '../../../../common';
const ApplyRange = (props) => {
  const {
    isDisableAll,
    redeemerAction,
    BrandBy,
    ProvinceBy,
    storeBy,
    lstCompanyBrand,
    setlstCompanyBrand,
    lstProvinced,
    setlstProvinced,
    lstStore,
    setlstStore,
    ObjRedeemer,
    setObjRedeemer,
    getCache,
    listProvince,
    listCompanyBrand,
    listArea,
    listStore,
    lstStoreId,
    setLstStoreId,
  } = props;
  console.log(getCache, 'getCache');
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [Province, setProvince] = useState([]); //chọn tỉnh
  const [ProvinceValue, setProvinceValue] = useState('');
  const [Area, setArea] = useState([]); //chọn khu vực
  const [AreaValue, setAreaValue] = useState('');
  const [Brand, setBrand] = useState([]); //chọn thương hiệu
  const [BrandValue, setBrandValue] = useState('');
  const [Store, setStore] = useState([]); //chọn kho
  const [StoreValue, setStoreValue] = useState('');
  const [StoreisCheckAll, setStoreIsCheckAll] = useState(0); //check all Store
  const [BrandisCheckAll, setBrandIsCheckAll] = useState(0); //check all Brand
  const [ProvinceisCheckAll, setProvinceIsCheckAll] = useState(0); //check all Province
  const [dataProvinceSearch, setDataProvinceSearch] = useState([]);
  const [dataProvince, setDataProvince] = useState([]); //dataProvince
  const [dataBrandSearch, setDataBrandSearch] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [idPage, setidPage] = useState(1);
  const [BrandpageOfItems, setBrandPageOfItems] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const [dataStoreSearch, setDataStoreSearch] = useState([]);
  const [ProvincepageOfItems, setProvincePageOfItems] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [ProvinceItems, setProvinceItems] = useState([]);
  const [brandpageOfItemsID, setBrandpageOfItemsID] = useState([]);
  const [term, setTerm] = useState([]);
  // useEffect(() => {

  //   //  if (lstCompanyBrand.length>0) {
  //   //   //setDataBrandSearch(lstCompanyBrand)
  //   //   //setDataBrandSearch(lstCompanyBrand)
  //   // //dataBrandSearch.push(lstCompanyBrand)
  //   //  }
  //   //  else
  //    console.log("brandpageOfItemsID",BrandpageOfItems)
  //     //
  //   if (brandpageOfItemsID.length > 0)
  //     brandpageOfItemsID.forEach((element) => {
  //       let index = BrandpageOfItems.findIndex((x) => x.brandId === element);
  //       if (index > -1) BrandpageOfItems[index].isCheck = 1;
  //     });
  // });
  const handleSearchClick = () => {
    alert(' Hệ thông đang cập nhật . Vui lòng liên hệ IT ! ');
  };
  useEffect(() => {
    // lấy từ redux
    if (listCompanyBrand.length === 0) {
      getCompanyBrandList();
    } else {
      setListCompanyBrand(listCompanyBrand);
    }
    if (listProvince.length === 0) {
      getProvinceList();
    } else {
      setListProvince(listProvince);
    }
    if (listArea.length === 0) {
      getAreaList();
    } else {
      setAreaList(listArea);
    }
    if (listStore.length === 0) {
      let body = {
        storeId: '',
        brandId: '',
        areaId: '',
        pageSize: 10,
        pageIndex: 1,
      };
      getStoreList(body);
      let termData = [...dataStore];
      setPageIndex(termData.splice(0, 10));
      setDataStoreSearch(dataStore);
    } else {
      setStoreList(listStore);
    }
    // set dữ liệu cho chexbox thương hiệu
    if (location.state.objRedeemer) {
      let term = location.state.objRedeemer.lstCritCompanyBrand;
      if (term.length > 0) {
        setidPage(2);
        setDataBrandSearch(term);
      }
    }
  }, []);
  // useEffect(() =>{
  //   if (location.state.objRedeemer) {
  //   let termStore = location.state.objRedeemer.lstCritStore
  //   if (termStore.length > 0){
  //     setidPage(3)
  //     setDataStoreSearch(termStore)
  //   }
  //   console.log("location.state.objRedeemer.lstCritStore",location.state.objRedeemer.lstCritStore)
  // }})
  useEffect(() => {
    setProvinceValue(helper.convertPropertyInArrToString(lstProvinced, 'provinceId'));
    setProvinceItems(lstProvinced);
    if (helper.convertPropertyInArrToString(lstProvinced, 'provinceId')) {
      setidPage(1);
    }
  }, [lstProvinced]);

  const onChangePageServer = (pager) => {
    const { currentPage, pageSize } = pager;
    let body = {
      packageId: 12,
      keyWord: '',
      provinceIdList: '',
      companyBrandIdList: '',
      outputtypeIdList: '',
      profileValueId: -1,
      pageSize: pageSize,
      pageIndex: currentPage,
    };
    getStoreList(body);
    setPageIndex(currentPage);
    setPageSize(pageSize);
  };
  const onChangePageClient = (pageOfItems, pageSize) => {
    setBrandPageOfItems(pageOfItems);
    setPageSize(pageSize);
  };
  const setStoreList = (res) => {
    let index = res.findIndex((x) => x.storeId == storeBy);
    if (index > -1) {
      res[index].isCheck = 1;
    }
    res.map((x) => (x.totalRows = 51)); //xóa dòng này
    setDataStore(res);
    setDataStoreSearch(res);
    setStore(res);
  };
  const getStoreList = (parms) => {
    setIsLoading(true);
    getCache
      .getStoreList(parms)
      .then((res) => {
        res.filter((x) => lstStoreId.indexOf(x.storeId) > -1).map((x) => (x.isCheck = 1));
        setStoreList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err)
        setDataStore([]);
        setDataStoreSearch([]);
        toast.notifyError('chọn kho: ' + err.msgError);
        setStore([]);
        setIsLoading(false);
      });
  };
  const setAreaList = (res) => {
    setArea(res);
  };
  const getAreaList = () => {
    setIsLoading(true);
    getCache
      .getAreaList()
      .then((res) => {
        setAreaList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.notifyError('area: ' + err.msgError);
        setArea([]);
        setIsLoading(false);
      });
  };

  const setListProvince = (res) => {
    let index = res.findIndex((x) => x.provinceId == ProvinceBy);
    if (index > -1) {
      res[index].isCheck = 1;
    }
    setDataProvince(res);
    setDataProvinceSearch(res);
    let termData = [...res];
    setProvincePageOfItems(termData.splice(0, 10));
    setProvince(res);
  };

  const getProvinceList = () => {
    setIsLoading(true);
    getCache
      .getProvinceList()
      .then((res) => {
        setListProvince(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setDataBrand([]);
        setDataBrandSearch([]);
        setProvince([]);
        setIsLoading(false);
      });
  };
  const getCompanyBrandList = () => {
    setIsLoading(true);
    getCache
      .getCompanyBrandList()
      .then((res) => {
        setListCompanyBrand(res);
        setIsLoading(false);

        setDataBrandSearch(lstCompanyBrand);
      })
      .catch((err) => {
        setDataBrand([]);
        setDataBrandSearch([]);
        toast.notifyError('Thương hiệu: ' + err.msgError);
        setBrand([]);
      });
  };
  const setListCompanyBrand = (res) => {
    let index = res.findIndex((x) => x.brandId == BrandBy);
    if (index > -1) {
      res[index].isCheck = 1;
    }
    setDataBrand(res);
    setDataBrandSearch(res);
    let termData = [...res];
    setBrandPageOfItems(termData.splice(0, 10));
    setBrand(res);
  };
  const ClickApplicationRange = (n) => {
    setidPage(n);
    if (helper.convertPropertyInArrToList(lstProvinced, 'provinceId').length != 0) {
      toast.notifyWarning('Đang chọn phạm vi tỉnh xóa để chọn phạm vi khác');
      setidPage(1);
    }
    if (
      lstCompanyBrand.filter(function (e) {
        return e.isCheck === 1;
      }).length != 0
    ) {
      toast.notifyWarning('Đang chọn phạm vi thương hiệu xóa để chọn phạm vi khác');
      setidPage(2);
    }
    // if(lstStoreId.filter(function (e) {
    //   return e.isCheck === 1
    // }).length != 0){
    //   toast.notifyWarning("Đang chọn phạm vi kho xóa để chọn phạm vi khác")
    //   setidPage(3)
    // }
  };
  const Reload = () => {
    let body = {
      packageId: 12,
      keyWord: 'test',
      provinceIdList: '',
      companyBrandIdList: '',
      outputtypeIdList: '',
      profileValueId: -1,
      pageSize: 10,
      pageIndex: 1,
    };
    getStoreList(body);
    getProvinceList();
    setDataStoreSearch(dataStoreSearch);
  };
  const StoreSearch = (StoreValue, BrandValue, AreaValue) => {
    setIsLoading(true);
    let termData = [...dataStoreSearch];
    let termDataFilter = termData.filter(function (e, f, g) {
      return f.areaId === AreaValue || g.brandId === BrandValue || e.storeId === StoreValue;
    });
    setDataStoreSearch(termDataFilter);
    console.log('data search', termDataFilter);
    termData = [...termDataFilter];
    termData = termData.splice(0, pageSize);
    setPageIndex(termData);
    setIsLoading(false);
  };
  const setStoreCheckAll = () => {
    if (isDisableAll) return;
    let termData = [...dataStore];
    let termDataStoreSearch = [...dataStoreSearch];
    if (StoreisCheckAll === 1) {
      setStoreIsCheckAll(0);
      termData.map((x) => (x.isCheck = 0));
      termDataStoreSearch.map((x) => (x.isCheck = 0));
    } else {
      setStoreIsCheckAll(1);
      termData.map((x) => (x.isCheck = 1));
      termDataStoreSearch.map((x) => (x.isCheck = 1));
    }
    setDataStoreSearch(termDataStoreSearch);
    setDataStore(termData);
  };
  const setBrandCheckAll = () => {
    if (isDisableAll) return;
    let termData = [...dataBrand];
    let termDataBrandSearch = [...dataBrandSearch];
    if (BrandisCheckAll === 1) {
      setBrandIsCheckAll(0);
      termData.map((x) => (x.isCheck = 0));
      termDataBrandSearch.map((x) => (x.isCheck = 0));
    } else {
      setBrandIsCheckAll(1);
      termData.map((x) => (x.isCheck = 1));
      termDataBrandSearch.map((x) => (x.isCheck = 1));
    }

    setDataBrandSearch(termDataBrandSearch);
    setDataBrand(termData);
  };
  const clearSearch = () => {
    setProvinceValue('');
    setBrandValue('');
    setStoreValue('');
    setAreaValue('');
    setProvinceValue('');
    console.log('clear', ProvinceItems);
  };

  const onCheckItemStore = (storeId) => {
    if (isDisableAll) return;
    let termData = [...dataStoreSearch];
    let term = [...lstStoreId];
    let index = termData.findIndex((x) => x.storeId == storeId);
    if (termData[index].isCheck == 1) {
      let indexId = lstStoreId.findIndex((x) => x == storeId);
      term.splice(indexId, 1);
      termData[index].isCheck = 0;
      setStoreIsCheckAll(0);
    } else {
      termData[index].isCheck = 1;
      term.push(termData[index].storeId);
      let tmp = termData.filter((x) => !x.isCheck || x.isCheck == 0).length;
      if (tmp == 0) setStoreIsCheckAll(1);
    }
    setLstStoreId(term);
    setDataStoreSearch(termData);
    setlstStore(termData);
    console.log('lststore', lstStore);
  };
  const ProvinceChange = (ProvinceValue) => {
    setProvinceItems(ProvinceValue);
    setlstProvinced(ProvinceValue);
    setObjRedeemer(ProvinceValue);
  };
  const onCheckItemBrand = (brandId) => {
    let termData = [...dataBrandSearch];
    let termDataBrand = [...dataBrand];
    // brandpageOfItemsID setBrandpageOfItemsID
    let selectedOption = [];
    let index = termData.findIndex((x) => x.brandId == brandId);
    let indexData = termDataBrand.findIndex((x) => x.brandId == brandId);
    for (let index = 0; index < termDataBrand.length; index++) {
      if (index === helper.convertPropertyInArrToList(lstCompanyBrand, 'brandId')) {
        termDataBrand[indexData].isCheck = 1;
        alert('a');
      }
    }
    console.log(brandpageOfItemsID, 'brandpageOfItemsID');
    if (termData[index].isCheck == 1) {
      termData[index].isCheck = 0;
      termDataBrand[indexData].isCheck = 0;
      setBrandIsCheckAll(0);
    } else {
      termData[index].isCheck = 1;
      termDataBrand[indexData].isCheck = 1;
      let tmp = termData.filter((x) => !x.isCheck || x.isCheck == 0).length;
      if (tmp == 0) setBrandIsCheckAll(1);
    }
    setBrandpageOfItemsID([...brandpageOfItemsID, brandId]);
    console.log(brandpageOfItemsID, 'brandpageOfItemsID');
    // setDataBrand(termDataBrand);
    setDataBrandSearch(termData);
    //setlstCompanyBrand(termData);
    setlstCompanyBrand(termData);
    console.log('lstCompanyBrand', lstCompanyBrand);

    //let checkdata = [...lstCompanyBrand]
    //checkdata.map(t => t.isCheck === 1)
    //setDataBrandSearch(checkdata)
  };

  const StoreRenderBody = ({ item }) => {
    return (
      <tr className="item-redeemer">
        <td className="checked">
          {item.isCheck === 1 ? (
            <CheckBoxOutlinedIcon style={styles.active} onClick={() => onCheckItemStore(item.storeId)} />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon style={styles.active} onClick={() => onCheckItemStore(item.storeId)} />
          )}
        </td>
        <td>{item.areaId}</td>
        <td>{item.storeId}</td>
        <td style={{ textAlign: 'left' }}>{item.storeName}</td>
      </tr>
    );
  };
  const BrandRenderBody = ({ item }) => {
    return (
      <tr className="item-redeemer">
        <td className="checked">
          {item.isCheck === 1 ? (
            <CheckBoxOutlinedIcon style={styles.active} onClick={() => onCheckItemBrand(item.brandId)} />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon style={styles.active} onClick={() => onCheckItemBrand(item.brandId)} />
          )}
        </td>
        <td>{item.brandId}</td>
        <td style={{ textAlign: 'left' }}>{item.brandName}</td>
      </tr>
    );
  };
  const ProvinceRenderBody = ({ item }) => {
    return (
      <tr className="item-redeemer">
        <td style={{ textAlign: '' }}>{item.provinceId}</td>
        <td></td>
        <td style={{ textAlign: 'left' }}>{item.provinceName}</td>
      </tr>
    );
  };
  return (
    <div className="applirange-container">
      <div className="row">
        <div className="col-md-12 choose pd-botton">
          <button
            style={idPage == 1 ? styles.activechoose : null}
            onClick={() => ClickApplicationRange(1)}
            className="col-md-2 provincebtn"
          >
            <b>Theo tỉnh thành</b>
          </button>
          <button
            style={idPage == 2 ? styles.activechoose : null}
            onClick={() => ClickApplicationRange(2)}
            className="col-md-2 brandbtn"
          >
            <b>Theo thương hiệu</b>
          </button>
          <button
            style={idPage == 3 ? styles.activechoose : null}
            onClick={() => ClickApplicationRange(3)}
            className="col-md-2 storebtn"
          >
            <b>Theo kho</b>
          </button>
        </div>
        {idPage == 1 ? (
          <React.Fragment>
            <div>
              <div className="col-md-12 pd-botton">
                <div className="SearchToolbar">
                  <MultiselectCustom
                    data={Province}
                    valueSelect={ProvinceValue}
                    setValueSelect={setProvinceValue}
                    value={'provinceId'}
                    display={'provinceName'}
                    top={10}
                    placeholder={'Chọn tỉnh thành'}
                    className="provincesel"
                    onChange={ProvinceChange}
                  />
                </div>
                <br></br>
                <div className="title">
                  <span>Danh sách tỉnh thành </span>
                  &emsp;
                  <button>
                    <a className="col-md-0 fa fa-repeat fa-flip-horizontal" aria-hidden="true" onClick={Reload}></a>{' '}
                    Reload
                  </button>
                  <button>
                    <a className="col-md-0 fa fa-upload" aria-hidden="true" onClick={handleSearchClick} /> Xuất Excel
                    mẫu
                  </button>
                  <button>
                    <a className="col-md-0 fa fa-download" aria-hidden="true" onClick={handleSearchClick} /> Nhập Excel
                  </button>
                  <button>
                    <a className="col-md-0 fa fa-file-excel-o" aria-hidden="true" onClick={handleSearchClick} /> Xuất
                    Excel
                  </button>
                </div>
                <br></br>
              </div>
            </div>
            <div className="col-md-12">
              <div className="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td style={{ width: '20%', textAlign: 'center' }}>Mã tỉnh thành</td>
                      <td></td>
                      <td style={{ width: '50%', textAlign: 'left' }}>Tên tỉnh thành</td>
                    </tr>
                  </thead>
                  <tbody>
                    {ProvinceItems.map((item, index) => {
                      return <ProvinceRenderBody key={index} item={item} />;
                    })}
                  </tbody>
                </table>
                <br></br>
                <div className="col-md-12">
                  {
                    //     dataProvinceSearch && dataProvinceSearch.length > 0 ?
                    //       <PaginationClient items={dataProvinceSearch} totalItems={dataProvinceSearch.length} onChangePage={ProvinceonChangePageClient} />
                    //     : null
                  }
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
        {idPage == 2 ? (
          <React.Fragment>
            <div className="col-md-12 pd-botton">
              <div className="title">
                <span>Danh sách thương hiệu</span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td className="checked">
                        {BrandisCheckAll === 1 ? (
                          <CheckBoxOutlinedIcon style={styles.active} onClick={setBrandCheckAll} />
                        ) : (
                          <CheckBoxOutlineBlankOutlinedIcon style={styles.active} onClick={setBrandCheckAll} />
                        )}
                      </td>
                      <td style={{ width: '40%' }}>Mã thương hiệu</td>
                      <td style={{ width: '50%', textAlign: 'left' }}>Tên thương hiệu</td>
                    </tr>
                  </thead>
                  <tbody>
                    {BrandpageOfItems.map((item, index) => {
                      return <BrandRenderBody key={index} item={item} />;
                    })}
                  </tbody>
                </table>
                <br></br>
                {dataBrandSearch && dataBrandSearch.length > 0 ? (
                  <PaginationClient
                    items={dataBrandSearch}
                    totalItems={dataBrandSearch.length}
                    onChangePage={onChangePageClient}
                  />
                ) : null}
              </div>
            </div>
          </React.Fragment>
        ) : null}
        {idPage == 3 ? (
          <React.Fragment>
            <div>
              <div className="col-md-12 pd-botton">
                <div className="SearchToolbar">
                  <SelectCustom
                    valueSelect={AreaValue}
                    setValueSelect={setAreaValue}
                    data={Area}
                    value={'areaId'}
                    display={'areaName'}
                    top={10}
                    placeholder={'Chọn khu vực'}
                    className="areasel"
                  />
                  <SelectCustom
                    valueSelect={BrandValue}
                    setValueSelect={setBrandValue}
                    data={Brand}
                    value={'brandId'}
                    display={'brandName'}
                    top={10}
                    placeholder={'Chọn thương hiệu'}
                    className="brandsel"
                  />
                  <SelectCustom
                    valueSelect={StoreValue}
                    setValueSelect={setStoreValue}
                    data={Store}
                    value={'storeId'}
                    display={'storeName'}
                    top={10}
                    placeholder={'Chọn kho'}
                    className="storesel"
                  />
                  <button
                    onClick={() => StoreSearch(StoreValue, BrandValue, AreaValue)}
                    className="searchbtnStore fa fa-search"
                    aria-hidden="true"
                  ></button>
                  <button onClick={clearSearch} className="col-md-0 clearStorebtn fa fa-times" aria-hidden="true">
                    <span> Clear</span>
                  </button>
                </div>
              </div>
              <div className="col-md-12 pd-botton">
                <div className="title">
                  <span>Danh sách kho &emsp;</span>
                  <button>
                    <a className="col-md-0 fa fa-repeat fa-flip-horizontal" aria-hidden="true" onClick={Reload}></a>{' '}
                    Reload
                  </button>
                  <button>
                    {' '}
                    <a className="col-md-0 fa fa-upload" aria-hidden="true" onClick={handleSearchClick} /> Xuất Excel
                    mẫu
                  </button>
                  <button>
                    <a className="col-md-0 fa fa-download" aria-hidden="true" onClick={handleSearchClick} /> Nhập Excel
                  </button>
                  <button>
                    {' '}
                    <a className="col-md-0 fa fa-file-excel-o" aria-hidden="true" onClick={handleSearchClick} /> Xuất
                    Excel
                  </button>
                </div>
              </div>
              <br></br>
            </div>
            <div className="col-md-12 pd-botton">
              <div className="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td className="checked">
                        {StoreisCheckAll === 1 ? (
                          <CheckBoxOutlinedIcon style={styles.active} onClick={setStoreCheckAll} />
                        ) : (
                          <CheckBoxOutlineBlankOutlinedIcon style={styles.active} onClick={setStoreCheckAll} />
                        )}
                      </td>
                      <td>Mã khu vực</td>
                      <td style={{ width: '40%' }}>Mã chi nhánh</td>
                      <td style={{ width: '30%', textAlign: 'left' }}>Tên chi nhánh</td>
                    </tr>
                  </thead>
                  <tbody>
                    {dataStoreSearch.map((item, index) => {
                      return <StoreRenderBody key={index} item={item} />;
                    })}
                  </tbody>
                </table>
                <br></br>
                {dataStoreSearch && dataStoreSearch.length > 0 ? (
                  <PaginationServer totalItems={dataStoreSearch[0].totalRows} onChangePage={onChangePageServer} />
                ) : null}
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>

      <LoadingComponent isLoading={isLoading} />
    </div>
  );
};
const styles = {
  activechoose: {
    color: 'white',
    background: '#3BB8C3',
  },
  active: {
    color: '#3BB8C3',
  },
};
const mapStateToProps = (state) => ({
  listRedeemer: state.redeemer.lstRedeemer.dataRedeemer,
  listProvince: state.cache.province.data,
  listCompanyBrand: state.cache.companyBrand.data,
  listArea: state.cache.area.data,
  listStore: state.cache.store.data,
});

const mapDispatchToProps = (dispatch) => ({
  redeemerAction: bindActionCreators(redeemerAction, dispatch),
  getCache: bindActionCreators(getCache, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplyRange);
