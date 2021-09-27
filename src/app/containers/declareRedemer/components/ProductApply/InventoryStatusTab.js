import React from 'react';

const InventoryStatusDeclareRedemer = (props) => {
  const { inventoryStatus, selectedInventoryStatusOptions, setSelectedInventoryStatusOptions } = props;

  const handleCheckboxChange = (item) => {
    if (selectedInventoryStatusOptions.length > 0) {
      let index = selectedInventoryStatusOptions.findIndex((x) => x.inventoryStatusId === item.inventoryStatusId);
      if (index > -1) {
        let selectedOptions = selectedInventoryStatusOptions
          .slice(0, index)
          .concat(selectedInventoryStatusOptions.slice(index + 1));
        setSelectedInventoryStatusOptions(selectedOptions);
      } else setSelectedInventoryStatusOptions([...selectedInventoryStatusOptions, item]);
    } else setSelectedInventoryStatusOptions([...selectedInventoryStatusOptions, item]);
  };
  return (
    <div>
      <div className="product-apply__list">
        <input type="checkbox" />
        <div className="inventory-itemm__1">
          <div>Trạng thái tồn kho</div>
        </div>
      </div>
      <div>
        {inventoryStatus.map((item, index) => (
          <div key={index} className="product-apply__list">
            <input
              key={item.inventoryStatusId}
              id={item.inventoryStatusId}
              type="checkbox"
              onClick={() => handleCheckboxChange(item)}
            />

            <div className="inventory-itemm__1">
              <div
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryStatusDeclareRedemer;
