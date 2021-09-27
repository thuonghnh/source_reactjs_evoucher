import React from 'react';
import Button from '../../../../components/button/Button';
import './style.css';

const EvoucherStatusFilter = (props) => {
  const { body, setBody, isActivated, setIsActivated, pageSize, className } = props;

  const handleActivatedChange = (n) => {
    setIsActivated(n);
    setBody({ ...body, isActivated: n, pageIndex: 1, pageSize: pageSize });
  };
  const handleRealoadClick = () => {
    setIsActivated(-1);
    setBody({ ...body, isActivated: -1, pageIndex: 1, pageSize: pageSize });
  };
  return (
    <div className={className}>
      <div className="evoucher-filter__btn-group">
        <Button
          title={'Tất cả'}
          styleBtn={style.btnRadiusLeft}
          classBtn={isActivated === -1 ? 'btn__package--active ' : 'btn__package'}
          onClick={() => handleActivatedChange(-1)}
        ></Button>
        <Button
          title={'Kích hoạt'}
          classBtn={isActivated === 1 ? 'btn__package--active ' : 'btn__package'}
          onClick={() => handleActivatedChange(1)}
        ></Button>
        <Button
          title={'Chưa kích hoạt'}
          styleBtn={style.btnRadiusRight}
          classBtn={isActivated === 0 ? 'btn__package--active ' : 'btn__package'}
          onClick={() => handleActivatedChange(0)}
        ></Button>
      </div>
      <Button title={'Reload'} icon={'fa fa-undo'} classBtn={'btn-reload'} onClick={handleRealoadClick}></Button>
    </div>
  );
};
const style = {
  btnRadiusLeft: {
    borderRadius: '5px 0 0 5px',
  },
  btnRadiusRight: {
    borderRadius: '0 5px 5px 0',
  },
};
export default EvoucherStatusFilter;
