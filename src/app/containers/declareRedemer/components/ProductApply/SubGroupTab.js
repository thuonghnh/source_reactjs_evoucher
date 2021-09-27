import React, { useState } from 'react';
import { LoadingComponent, MultiselectCustom } from '../../../../components';

const SubGroupDeclareRedemer = (props) => {
  const { selectedSubGroupOptions, setSelectedSubGroupOptions, subGroup, isLoading } = props;
  const [selectedSubGroupID, setSelectedSubGroupID] = useState('');
  function handleSubGroupChange(value) {
    setSelectedSubGroupOptions(value);
  }
  return (
    <div className="product-apply__tab">
      <div className="product-apply__search">
        <div style={{ width: '50%' }}>
          <MultiselectCustom
            value={'subGroupId'}
            display={'subGroupName'}
            data={subGroup}
            onChange={handleSubGroupChange}
            top={20}
            valueSelect={selectedSubGroupID}
            setValueSelect={setSelectedSubGroupID}
            placeholder={'--Chọn nhóm hàng--'}
          />
        </div>
      </div>
      <div className="product-apply__table">
        <div className="product-table__header">
          <div className="col-md-1">
            <input type="checkbox" />
          </div>
          <div className="col-md-4">Mã Nhóm Hàng</div>
          <div className="col-md-4">Tên Nhóm Hàng</div>
        </div>
        <div>
          {selectedSubGroupOptions.length > 0
            ? selectedSubGroupOptions.map((item, index) => (
                <div key={index} className="product-table__body">
                  <div className="col-md-1">
                    <input type="checkbox" key={item.subGroupId} />
                  </div>
                  <div className="col-md-4">{item.subGroupId}</div>
                  <div className="col-md-4">{item.subGroupName}</div>
                </div>
              ))
            : ''}
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
};
export default SubGroupDeclareRedemer;
