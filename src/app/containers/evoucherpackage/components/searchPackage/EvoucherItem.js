import React, { useState } from 'react';
import { useAuth } from 'oidc-react';
import { useHistory } from 'react-router';

import { Dialog, DialogTitle } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { toast } from '../../../../common';
import Button from '../../../../components/button/Button';

const EvoucherItem = (props) => {
  const { deleteGetEpackageMutil, body, setBody, epackage, isActivated, pageSize } = props;
  // const classes = useStyles();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const handleInfoClick = () => {
    if (active === 1) setActive(0);
    else setActive(1);
  };
  const auth = useAuth();
  const handleOpenDialogClick = () => {
    console.log('ID', epackage.packageId);
    if (epackage.isActived === 1) {
      toast.notifyWarning('Gói Evoucher ' + epackage.packageName + ' bạn không được phép xóa. Vui lòng kiểm tra lại!');
    } else setOpen(true);
  };
  const history = useHistory();
  const handleCopyClick = (item) => {
    history.push({
      pathname: '/evoucher-package-add',
      state: {
        objPackage: item,
        isCopy: true
      },
    });
  };
  const handleProfileClick = (item) => {
    history.push({
      pathname: '/package-profile',
      state: {
        objPackage: item,
      },
    });
  };
  const handleOpenDetailClick = (item) => {
    history.push({
      pathname: '/evoucher-package/' + epackage.packageId
    });
  };
  const handleAgreeClose = () => {
    setOpen(false);
    handleDeleteEpackage();
    setBody({
      ...body,
      isActivated: isActivated,
      pageIndex: 1,
      pageSize: pageSize,
    });
    toast.info('Xóa thành công!');
  };
  const handleDisagreeClose = () => {
    setOpen(false);
  };
  const style = {
    margin: {
      marginLeft: '0.5rem',
    },
    btnDelete: {
      backgroundColor: 'transparent',
      textTransform: 'none',
      color: '#E32D2D',
      flex: '1 1 auto',
      border: 'none',
    },
    btnDetail: {
      backgroundColor: 'transparent',
      textTransform: 'none',
      color: 'rgba(59, 184, 195, 1)',
      flex: '1 1 auto',
      marginRight: '0.5rem',
      border: 'none',
    },
  };

  const handleDeleteEpackage = (event) => {
    const { userData } = auth;
    const params = {
      packageId: epackage.packageId,
      deletedUser: userData.profile.Username,
    };
    deleteGetEpackageMutil(params);
  };
  return (
    <React.Fragment>
      <div className="evoucher-list__row" onClick={handleInfoClick}>
        <div className="evoucher-list__col--icon" style={{ width: '3%' }}>
          <input type="checkbox"></input>
        </div>
        <div className="evoucher-list__col" style={{ width: '11%' }}>
          <div>Mã gói Evoucher</div>
          <div style={{ fontWeight: 'bold' }}>{epackage.packageId}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '20%' }}>
          <div>Tên gói Evoucher</div>
          <div style={{ fontWeight: 'bold' }}>{epackage.packageName}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '11%' }}>
          <div>Loại Evoucher</div>
          <div style={{ fontWeight: 'bold' }}>{epackage.evoucherTypeId === 1 ? 'Single code' : 'Multi code '}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '11%' }}>
          <div>Loại ưu đãi</div>
          <div style={{ fontWeight: 'bold' }}>
            {epackage.offerType === 1 ? 'Thanh toán' : epackage.offerType === 2 ? 'Giảm giá' : 'Tặng quà'}
          </div>
        </div>
        <div className="evoucher-list__col" style={{ width: '11%' }}>
          <div>Nguồn phát hành</div>
          <div style={{ fontWeight: 'bold' }}> {epackage.evoucherSourceCode === 1 ? 'Đối tác ' : 'Tự phát hành'}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '11%', textAlign: 'center', padding: '0 10px' }}>
          <span>Trạng thái</span>
          {epackage.isActived === 0 ? (
            <span className="span-unactive">Chưa kích hoạt</span>
          ) : (
            <span className="span-active">Kích hoạt</span>
          )}
        </div>
        <div className="evoucher-list__col--btn" style={{ width: '22%' }}>
          <Button
            title={'Quản lý Profile'}
            icon={'fa fa-share-square'}
            onClick={() => handleProfileClick(epackage)}
          ></Button>
          <Button
            title={'Sao chép'}
            icon={'fa fa-clone'}
            styleBtn={style.margin}
            onClick={() => handleCopyClick(epackage)}
          ></Button>
        </div>
      </div>
      <div className={active === 1 ? 'evoucher-list__row--active' : 'evoucher-list__row--unactive'}>
        <div className="evoucher-list__col--icon" style={{ width: '10%' }}>
          <i className="fa fa-tags"></i>
        </div>
        <div className="evoucher-list__col" style={{ width: '15%' }}>
          <div>Người tạo</div>
          <div style={{ fontWeight: 'bold' }}>{epackage.createduser}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '15%' }}>
          <div>Thời Gian Tạo</div>
          <div style={{ fontWeight: 'bold' }}>
            {epackage.createddate !== null ? Intl.DateTimeFormat('en-US').format(epackage.createddate) : ''}
          </div>
        </div>
        <div className="evoucher-list__col" style={{ width: '15%' }}>
          <div>Người Cập Nhật Cuối</div>
          <div style={{ fontWeight: 'bold' }}>{epackage.updateduser}</div>
        </div>
        <div className="evoucher-list__col" style={{ width: '15%' }}>
          <div>Thời Điểm Cập nhật</div>
          <div style={{ fontWeight: 'bold' }}>
            {epackage.updateddate !== null ? Intl.DateTimeFormat('en-US').format(epackage.updateddate) : ''}
          </div>
        </div>
        <div className="evoucher-list__col--btn" style={{ width: '30%' }}>
          <div>
            <Button
              title={'Xem chi tiết'}
              icon={'fa fa-search'}
              styleBtn={style.btnDetail}
              onClick={() => handleOpenDetailClick(epackage)}
            ></Button>
            <Button
              title={'Xoá'}
              icon={'fa fa-trash'}
              styleBtn={style.btnDelete}
              onClick={handleOpenDialogClick}
            ></Button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleDisagreeClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Thông báo'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa các gói Evoucher đã chọn ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button title={'Đồng ý'} styleBtn={style.btnDetail} onClick={handleAgreeClose}></Button>
          <Button title={'Bỏ qua'} styleBtn={style.btnDetail} onClick={handleDisagreeClose}></Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EvoucherItem;
