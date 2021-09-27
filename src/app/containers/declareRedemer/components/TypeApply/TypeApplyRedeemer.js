import React, { useEffect, useState } from 'react';

import * as redeemerAction from '../../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../../components/button/Button';
import { LoadingComponent, MultiselectCustom, Icon } from '../../../../components';
import { getCache, helper, toast } from '../../../../common';

import './style.css';

const TypeApplyRedeemer = (props) => {
  const { redeemerAction, lstOutPutType, setlstOutPutType, getCache, listOutputType } = props;
  const [outputTypeSelectedID, setOutputTypeSelectedID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(lstOutPutType, 'lstOutPutType');
  //#region  Call API OutputTypeList
  const [outputTypesList, setOutputTypesList] = useState([]); // Danh sách hình thức xuất

  useEffect(() => {
    if (listOutputType.length === 0) {
      getOutputTypeList();
    } else {
      setOutputTypesList(listOutputType);
    }
    if (lstOutPutType.length > 0) {
      let strOutputTypeID = helper.convertPropertyInArrToString(lstOutPutType, 'outputTypeId');
      setOutputTypeSelectedID(strOutputTypeID);
      setlstOutPutType(lstOutPutType);
    } else {
      setOutputTypeSelectedID('');
      setlstOutPutType([]);
    }
  }, []);

  const getOutputTypeList = () => {
    setIsLoading(true);
    getCache
      .getOutputTypeList()
      .then((res) => {
        setOutputTypesList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setOutputTypesList([]);
        toast.notifyWarning('Lỗi lấy danh sách hình thức xuất. Vui lòng kiểm tra lại!');
        setIsLoading(false);
      });
  };
  //#endregion

  const handleCheckboxChange = (item, n) => {
    if (lstOutPutType.length > 0) {
      let index = lstOutPutType.findIndex((x) => x.outputTypeId === item.outputTypeId);
      let selectedOptions = [];
      if (index > -1) {
        if (lstOutPutType.length === 1) {
          lstOutPutType[0].isChecked = 0;
        } else {
          selectedOptions = lstOutPutType.slice(0, index).concat(lstOutPutType.slice(index + 1));
        }
        let selectedOptionsID = helper.convertPropertyInArrToString(
          lstOutPutType.slice(0, index).concat(lstOutPutType.slice(index + 1)),
          'outputTypeId'
        );
        console.log(index, 'index');
        setOutputTypeSelectedID(selectedOptionsID);
        setlstOutPutType(selectedOptions);
      }
    }
  };
  const handleOutputTypeChange = (value) => {
    setlstOutPutType(value);
  };
  //#region function chưa được sử dụng
  const handleSearchClick = () => {
    alert(' Hệ thông đang cập nhật . Vui lòng liên hệ IT ! ');
  };
  const handleClearClick = () => {
    alert('Hệ thống đang update . Vui lòng liên hệ IT');
  };
  const handleRealoadClick = () => {
    alert('Hệ thống đang update . Vui lòng liên hệ IT');
  };
  const handleButtonClick = () => {
    alert(' Hệ thông đang cập nhật . Vui lòng liên hệ IT ! ');
  };
  //#endregion
  return (
    <div className="type-apply__container">
      <LoadingComponent isLoading={isLoading} />
      <div className="row">
        <div className="col-md-12 type-apply__search">
          <MultiselectCustom
            value={'outputTypeId'}
            display={'outputtypeName'}
            data={outputTypesList}
            onChange={handleOutputTypeChange}
            top={10}
            valueSelect={outputTypeSelectedID}
            setValueSelect={setOutputTypeSelectedID}
            placeholder={'--Chọn hình thức xuất--'}
          />
        </div>
        <div className="col-sm-12 col-md-12 col-xl-6 output-type__header">
          <div className="type-apply__title">DANH SÁCH HÌNH THỨC XUẤT</div>
          <div className="type-apply__result">{lstOutPutType.length} Kết quả được tìm thấy</div>
          <Button title={'Reload'} classBtn={'btn-reload'} onClick={handleRealoadClick}></Button>
        </div>
        <div className="col-sm-12 col-md-12 col-xl-6 type-apply__excel">
          <Button
            icon={'fa fa-upload'}
            title={'Xuất Excel mẫu'}
            classBtn={'btn-excel'}
            onClick={handleRealoadClick}
          ></Button>
          <Button
            icon={'fa fa-download'}
            title={'Nhập Excel'}
            classBtn={'btn-excel'}
            onClick={handleRealoadClick}
          ></Button>
          <Button
            icon={'fa fa-file-excel'}
            title={'Xuất Excel'}
            classBtn={'btn-excel'}
            onClick={handleRealoadClick}
          ></Button>
        </div>
        <div className="col-sm-12 col-md-12 col-xl-12 type-apply__table">
          <div className="type-table__header">
            <span className="col-md-1">
              <input type="checkbox" />
            </span>

            <div className="col-md-5">Mã hình thức</div>
            <div className="col-md-6">Tên Hình thức</div>
          </div>
          <div>
            {lstOutPutType.length > 0
              ? lstOutPutType.map((item, index) => (
                  <div key={index} className="type-table__body">
                    <span className="col-md-1">
                      {item.isChecked === 1 ? (
                        <Icon
                          icon={'fa fa-check-square'}
                          onClick={() => handleCheckboxChange(item, 0)}
                          className={'btn-checkbox'}
                        />
                      ) : (
                        <Icon
                          icon={'far fa-square'}
                          onClick={() => handleCheckboxChange(item, 1)}
                          className={'btn-checkbox'}
                        />
                      )}
                    </span>
                    <div className="col-md-5">{item.outputTypeId}</div>
                    <div className="col-md-6">{item.outputtypeName}</div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  listOutputType: state.cache.outputType.data,
});
const mapDispatchToProps = (dispatch) => ({
  redeemerAction: bindActionCreators(redeemerAction, dispatch),
  getCache: bindActionCreators(getCache, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TypeApplyRedeemer);
