import React from 'react';
import './style.css';
import Button from '../../../../components/button/Button';
import { Select, Input } from '../../../../components';
const EvoucherSearch = (props) => {
  const {
    className,
    body,
    setBody,
    keyWord,
    setKeyWord,
    evoucherSourceCode,
    setEvoucherSourceCode,
    typeInput,
    setTypeInput,
    offerType,
    setOfferType,
    evoucherTypeId,
    setEvoucherTypeId,
    pageSize,
  } = props;
  //#region Data Select
  const typeInputOptions = [
    {
      value: 1,
      label: ' Mã chương trình',
    },
    {
      value: 2,
      label: ' Tên chương trình',
    },
    {
      value: 3,
      label: 'Mã nhân viên tạo',
    },
    {
      value: 4,
      label: ' Tên nhân viên tạo',
    },
  ];
  const evoucherSourceCodeOptions = [
    {
      value: 1,
      label: ' Đối tác',
    },
    {
      value: 2,
      label: ' Tự phát hành',
    },
  ];
  const offerTypeOptions = [
    {
      value: 1,
      label: ' Thanh toán',
    },
    {
      value: 2,
      label: ' Giảm giám',
    },
    {
      value: 3,
      label: 'Tặng quà',
    },
  ];
  const evoucherTypeOptions = [
    {
      value: 1,
      label: 'Single code',
    },
    {
      value: 2,
      label: 'Mutil code',
    },
  ];
  //#endregion
  const handleClearClick = () => {
    setTypeInput(1);
    setEvoucherSourceCode(-1);
    setOfferType(-1);
    setEvoucherTypeId(-1);
  };
  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };
  const handleSearchClick = (event) => {
    setBody({
      ...body,
      keyWord: keyWord,
      typeInput: typeInput,
      evoucherSourceCode: evoucherSourceCode,
      offerType: offerType,
      evoucherTypeId: evoucherTypeId,
      pageIndex: 1,
      pageSize: pageSize,
    });
  };
  return (
    <div className={className}>
      <div className="evoucher-search__item--double">
        <div className="evoucher-search__label">Từ khoá</div>
        <div style={{ display: 'flex' }}>
          <Input value={keyWord} onChange={handleKeyWordChange} placeholder={'Nhập từ khoá'}></Input>
          <Select
            value={'value'}
            display={'label'}
            data={typeInputOptions}
            valueSelect={typeInput}
            setValueSelect={setTypeInput}
          />
        </div>
      </div>
      <div className="evoucher-search__item">
        <div className="evoucher-search__label">Nguồn phát hành</div>
        <Select
          value={'value'}
          display={'label'}
          data={evoucherSourceCodeOptions}
          valueSelect={evoucherSourceCode}
          setValueSelect={setEvoucherSourceCode}
          placeholder={'Tất cả'}
        />
      </div>
      <div className="evoucher-search__item">
        <div className="evoucher-search__label">Loại ưu đãi</div>
        <Select
          value={'value'}
          display={'label'}
          data={offerTypeOptions}
          valueSelect={offerType}
          setValueSelect={setOfferType}
          placeholder={'Tất cả'}
        />
      </div>
      <div className="evoucher-search__item">
        <div className="evoucher-search__label">Loại Evoucher</div>
        <Select
          value={'value'}
          display={'label'}
          data={evoucherTypeOptions}
          valueSelect={evoucherTypeId}
          setValueSelect={setEvoucherTypeId}
          placeholder={'Tất cả'}
        />
      </div>
      <div className="evoucher-search__btn">
        <Button icon={'fa fa-search'} classBtn={'btn-search'} onClick={handleSearchClick}></Button>
        <Button title={'Clear'} icon={'fa fa-times'} classBtn={'btn-clear'} onClick={handleClearClick}></Button>
      </div>
    </div>
  );
};
export default EvoucherSearch;
