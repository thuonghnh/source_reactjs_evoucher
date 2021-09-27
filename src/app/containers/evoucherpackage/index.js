import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';
import * as epackageAction from './action';

import EvoucherSearch from './components/searchPackage/EvoucherSearch';
import EvoucherStatusFilter from './components/searchPackage/EvoucherStatusFilter';
import EvoucherTimeFilter from './components/searchPackage/EvoucherTimeFilter';
import EvoucherItem from './components/searchPackage/EvoucherItem';

import { EHeaderComponent, LoadingComponent, PaginationServer, ToolbarComponent } from '../../components';
import { get_string_current_date_custom } from '../../common/date';

const EVoucherPackage = (props) => {
  const { dataEpackage } = props;
  const history = useHistory();
  const strDate = get_string_current_date_custom(new Date());
  const [isLoading, setIsLoading] = useState(false);
  //#region Params Search
  const [keyWord, setKeyWord] = useState('');
  const [typeInput, setTypeInput] = useState(1);
  const [evoucherSourceCode, setEvoucherSourceCode] = useState(-1);
  const [offerType, setOfferType] = useState(-1);
  const [isActivated, setIsActivated] = useState(-1);
  const [evoucherTypeId, setEvoucherTypeId] = useState(-1);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  //#endregion
  const [body, setBody] = useState({
    keyWord: '',
    typeInput: 1,
    evoucherSourceCode: -1,
    offerType: -1,
    evoucherTypeId: -1,
    isActivated: -1,
    fromDate: strDate,
    toDate: strDate,
    pageIndex: 1,
    pageSize: 10,
  });
  useEffect(() => {
    console.log(body, 'BODY Search Package-Evoucher');
    console.log('PACKAGE', dataEpackage);
    getDataSearch(body);
  }, [body]);
  //#region ToolbarComponent
  const refToolbar = useRef();
  useEffect(() => {
    refToolbar.current.setVisible(true, true, true, true);
    refToolbar.current.setDisable(false, false, false, false);
  }, []);
  const add = () => {
    history.push('/evoucher-package-add');
  };
  const exportExcel = () => {
    alert('Hệ thống đang cập nhật . Vui lòng liên hệ IT !');
  };
  const importExcel = () => {
    alert('Hệ thống đang cập nhật . Vui lòng liên hệ IT !');
  };
  const del = () => {
    alert('Hệ thống đang cập nhật . Vui lòng liên hệ IT !');
  };
  //#endregion
  // Lấy danh sách package-evoucher
  const getDataSearch = (params) => {
    setIsLoading(true);
    const { authenActions } = props;
    authenActions
      .getListEpackage(params)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  // Xoá danh sách package-evoucher
  const deleteGetEpackageMutil = (params) => {
    setIsLoading(true);
    const { authenActions } = props;
    authenActions
      .deleteEpackageMutil(params)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  // Chuyển trang gọi lại API
  const onChangePageServer = (pager) => {
    const { currentPage, pageSize } = pager;
    setBody({
      ...body,
      pageIndex: currentPage,
      pageSize: pageSize,
    });
    setPageIndex(currentPage);
    setPageSize(pageSize);
  };
  return (
    <React.Fragment>
      <EHeaderComponent title={'KHAI BÁO EVOUCHER'} />
      <div className="package-evoucher__container">
        <div className="row">
          <EvoucherSearch
            className="col-sm-12 col-md-12 col-xl-9 pd-botton package-evoucher__search--left"
            body={body}
            setBody={setBody}
            keyWord={keyWord}
            setKeyWord={setKeyWord}
            evoucherSourceCode={evoucherSourceCode}
            setEvoucherSourceCode={setEvoucherSourceCode}
            typeInput={typeInput}
            setTypeInput={setTypeInput}
            offerType={offerType}
            setOfferType={setOfferType}
            evoucherTypeId={evoucherTypeId}
            setEvoucherTypeId={setEvoucherTypeId}
            pageSize={pageSize}
          ></EvoucherSearch>
          <div className="col-sm-12 col-md-12 col-xl-3 pd-botton package-evoucher__search--right">
            <ToolbarComponent
              ref={refToolbar}
              add={add}
              importExcel={importExcel}
              exportExcel={exportExcel}
              del={del}
            ></ToolbarComponent>
          </div>
          <div className="col-sm-12 col-md-12 col-xl-12 pd-botton package-evoucher__title">
            DANH SÁCH CÁC GÓI EVOUCHER
          </div>
          <EvoucherStatusFilter
            className="col-sm-12 col-md-12 col-xl-7 pd-botton package-evoucher__filter--left"
            body={body}
            setBody={setBody}
            isActivated={isActivated}
            setIsActivated={setIsActivated}
            pageSize={pageSize}
          ></EvoucherStatusFilter>
          <EvoucherTimeFilter
            className="col-sm-12 col-md-12 col-xl-5 pd-botton package-evoucher__filter--right"
            body={body}
            setBody={setBody}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            pageSize={pageSize}
          ></EvoucherTimeFilter>
          <div className="col-sm-12 col-md-12 col-xl-12  package-evoucher__list">
            {dataEpackage.map((epackage, index) => (
              <EvoucherItem
                key={index}
                epackage={epackage}
                deleteGetEpackageMutil={deleteGetEpackageMutil}
                setBody={setBody}
                body={body}
                isActivated={isActivated}
                pageSize={pageSize}
              ></EvoucherItem>
            ))}
          </div>
          <div className="col-md-12 pd-top">
            {dataEpackage && dataEpackage.length > 0 ? (
              <PaginationServer totalItems={dataEpackage[0].totalRow} onChangePage={onChangePageServer} />
            ) : null}
          </div>
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  dataEpackage: state.epackage.listEpackage.dataEpackage,
  deleteEpackage: state.epackage.deleteEpackage,
});

const mapDispatchToProps = (dispatch) => ({
  authenActions: bindActionCreators(epackageAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EVoucherPackage);
