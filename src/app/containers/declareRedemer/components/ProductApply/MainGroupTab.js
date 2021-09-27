import React, { useState } from 'react';
import { LoadingComponent, MultiselectCustom } from '../../../../components';
const MainGroupDeclareRedemer = (props) => {
  const { setSelectedMainGroupOptions, selectedMainGroupOptions, mainGroup, isLoading } = props;
  const [selectedMainGroupID, setSelectedMainGroupID] = useState('');
  function handleMainGroupChange(value) {
    setSelectedMainGroupOptions(value);
  }
  return (
    <div className="product-apply__tab">
      <div className="product-apply__search">
        <div style={{ width: '50%' }}>
          <MultiselectCustom
            value={'mainGroupId'}
            display={'mainGroupName'}
            data={mainGroup}
            onChange={handleMainGroupChange}
            top={10}
            valueSelect={selectedMainGroupID}
            setValueSelect={setSelectedMainGroupID}
            placeholder={'--Chọn nhành hàng--'}
          />
        </div>
      </div>
      <div className="product-apply__table">
        <div className="product-table__header">
          <div className="col-md-1">
            <input type="checkbox" />
          </div>
          <div className="col-md-4">Mã ngành Hàng</div>
          <div className="col-md-7">Tên Ngành Hàng</div>
        </div>
        <div>
          {selectedMainGroupOptions.length > 0
            ? selectedMainGroupOptions.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-1">
                    <input type="checkbox" />
                  </div>
                  <div className="col-md-4">{item.mainGroupId}</div>
                  <div className="col-md-7">{item.mainGroupName}</div>
                </div>
              ))
            : ''}
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
};

export default MainGroupDeclareRedemer;
