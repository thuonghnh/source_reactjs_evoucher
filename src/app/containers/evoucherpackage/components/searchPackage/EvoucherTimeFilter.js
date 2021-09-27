import React from 'react';
import { get_string_current_date_custom } from '../../../../common/date';
import { DateControl } from '../../../../components';

export default function EvoucherTimeFilter(props) {
  const { body, setBody, pageSize, setToDate, setFromDate, toDate, fromDate, className } = props;
  const handleFromDateChange = (date) => {
    const strFromDate = get_string_current_date_custom(date);
    setFromDate(date);
    setBody({ ...body, fromDate: strFromDate, pageIndex: 1, pageSize: pageSize });
  };
  const handleToDateChange = (date) => {
    const strToDate = get_string_current_date_custom(date);
    setToDate(date);
    setBody({ ...body, toDate: strToDate, pageIndex: 1, pageSize: pageSize });
  };
  return (
    <div className={className}>
      <div style={{ paddingRight: '0.5rem' }}>Thời gian tạo</div>
      <div style={{marginRight: '0.5rem'}}>
        <DateControl value={fromDate} setValue={setFromDate} onChange={handleFromDateChange} maxDate={toDate} />
      </div>
      <div>
        <DateControl minDate={fromDate} value={toDate} setValue={setToDate} onChange={handleToDateChange} />
      </div>
    </div>
  );
}
