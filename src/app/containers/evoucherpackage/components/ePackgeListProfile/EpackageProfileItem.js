// import { Grid, makeStyles, Button, Checkbox, Dialog, DialogTitle, Typography, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from 'oidc-react';
import BlockIcon from '@material-ui/icons/Block';
import 'react-toastify/dist/ReactToastify.css';

const EvoucherItemProflie = (props) => {
  const { deleteGetEpackageMutil, epackage } = props;
  // const classes = useStyles();
  const [active, setActive] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleInfoClick = () => {
    if (active === 1) setActive(0);
    else setActive(1);
  };
  const handleOpenDialogClick = () => {
    if (epackage.isActived === 1) {
      toast.warning('Gói Evoucher ' + epackage.packageName + 'bạn không được phép xóa. Vui lòng kiểm tra lại!');
    } else setOpen(true);
  };
  const handleCopyClick = () => {
    alert('Hệ thống đang update ! Vui lòng liên hệ IT !');
  };
  const handleProfileClick = () => {
    alert('Hệ thống đang update ! Vui lòng liên hệ IT !');
  };
  const handleOpenDetailClick = () => {
    alert('Hệ thống đang update ! Vui lòng liên hệ IT !');
  };
  const handleAgreeClose = () => {
    setOpen(false);
    handleDeleteEpackage();
  };
  const handleDisagreeClose = () => {
    setOpen(false);
  };
  const auth = useAuth();
  const handleDeleteEpackage = (event) => {
    const { userData } = auth;
    const params = {
      packageId: epackage.packageId,
      deletedUser: userData.profile.Username,
    };
    deleteGetEpackageMutil(params);
  };
  return (
    <div></div>
    // <div className={classes.root}>
    //   <Paper className={classes.paper} onClick={handleInfoClick}>
    //     <Grid container wrap="nowrap" spacing={2} justifyContent="space-between">
    //       <Grid item>
    //         <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Mã Profile</Typography>
    //         <Typography noWrap>{epackage.packageId}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Tên Profile</Typography>
    //         <Typography noWrap>{epackage.packageName}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Tên Profile</Typography>
    //         <Typography noWrap>{epackage.packageName}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Loại Giá trị</Typography>
    //         <Typography noWrap>{epackage.evoucherTypeId === 1 ? 'Single code' : 'Multi code '}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Loại giảm giá</Typography>
    //         <Typography noWrap>{epackage.evoucherTypeId === 1 ? 'Single code' : 'Multi code '}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Trang thái</Typography>
    //         <Typography noWrap>{epackage.evoucherTypeId === 1 ? 'Single code' : 'Multi code '}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Hết hạn</Typography>
    //         <Typography noWrap> {true ? 'Chưa kích hoạt' : ' Kích hoạt'}</Typography>
    //       </Grid>
    //       <Grid item className={classes.rightButton}>
    //         <div className={classes.rightButton}>
    //           <Button className={classes.buttonItem} size="small" onClick={handleCopyClick}>
    //             <FileCopyIcon></FileCopyIcon>Sao chép
    //           </Button>
    //           <Button className={classes.buttonItem} size="small" onClick={handleProfileClick}>
    //             <BlockIcon></BlockIcon>Kết Thúc
    //           </Button>
    //         </div>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    //   <Paper elevation={0}>
    //     <Grid
    //       container
    //       wrap="nowrap"
    //       justifyContent="space-between"
    //       spacing={2}
    //       className={active === 0 ? classes.unActive : classes.active}
    //     >
    //       <Grid item style={{ marginLeft: '40px', alignSelf: 'center' }}>
    //         <LocalOfferIcon></LocalOfferIcon>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Người tạo</Typography>
    //         <Typography style={{ fontWeight: 'bold' }} noWrap>
    //           {epackage.createduser}
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Thời Gian Tạo</Typography>
    //         <Typography style={{ fontWeight: 'bold' }} noWrap>
    //           {epackage.createddate !== null ? Intl.DateTimeFormat('en-US').format(epackage.createddate) : ''}
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Người Cập Nhật Cuối</Typography>
    //         <Typography style={{ fontWeight: 'bold' }} noWrap>
    //           {epackage.updateduser}
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography noWrap>Thời Điểm Cập nhật</Typography>
    //         <Typography style={{ fontWeight: 'bold' }} noWrap>
    //           {epackage.updateddate !== null ? Intl.DateTimeFormat('en-US').format(epackage.updateddate) : ''}
    //         </Typography>
    //       </Grid>
    //       <div className={classes.rightButton}>
    //         <Button size="small" className={classes.buttonItemSearch} onClick={handleOpenDetailClick}>
    //           <SearchIcon></SearchIcon>Xem chi tiết
    //         </Button>
    //         <Button size="small" className={classes.buttonItemDelete} onClick={handleOpenDialogClick}>
    //           <DeleteIcon></DeleteIcon>Xoá
    //         </Button>
    //         <Dialog
    //           open={open}
    //           onClose={handleDisagreeClose}
    //           aria-labelledby="alert-dialog-title"
    //           aria-describedby="alert-dialog-description"
    //         >
    //           <DialogTitle id="alert-dialog-title">{'Thông báo'}</DialogTitle>
    //           <DialogContent>
    //             <DialogContentText id="alert-dialog-description">
    //               Bạn có chắc muốn xóa các gói Evoucher đã chọn ?
    //             </DialogContentText>
    //           </DialogContent>
    //           <DialogActions>
    //             <Button onClick={handleAgreeClose} color="primary" autoFocus>
    //               Đồng ý
    //             </Button>
    //             <Button onClick={handleDisagreeClose} color="primary">
    //               Bỏ qua
    //             </Button>
    //           </DialogActions>
    //         </Dialog>
    //       </div>
    //       <ToastContainer />
    //     </Grid>
    //   </Paper>
    // </div>
  );
};
// const useStyles = makeStyles((theme) => ({
//   root: {
//     minWidth: '1150px',
//     padding: theme.spacing(0, 3),
//   },
//   paper: {
//     width: '100%',
//     margin: `${theme.spacing(1)}px auto`,
//     padding: theme.spacing(2),
//     backgroundColor: '#EDEDED',
//     cursor: 'pointer',
//   },
//   active: {
//     flex: '1 1 auto',
//     maxWidth: '100%',
//     margin: `${theme.spacing(2)}px auto`,
//   },
//   unActive: {
//     display: 'none',
//   },
//   buttonItem: {
//     textTransform: 'none',
//     backgroundColor: '#3BB8C3',
//     opacity: '80%',
//     borderRadius: '8px',
//     marginRight: '8px',
//     boxShadow: '0 8px 8px 0 rgba(103, 151, 255, .11), 0 12px 18px 0 rgba(103, 151, 255, .11)',
//   },
//   buttonItemSearch: {
//     textTransform: 'none',
//     opacity: '80%',
//     color: '#3BB8C3',
//   },
//   buttonItemDelete: {
//     textTransform: 'none',
//     opacity: '80%',
//     color: '#E32D2D',
//     flex: '1 1 auto',
//   },
//   EditEvoucher: {
//     flexWrap: 'nowrap',
//   },
//   rightButton: {
//     padding: 0,
//     flexShrink: '3',
//     alignSelf: 'center',
//     width: '250px',
//   },
// }));
export default EvoucherItemProflie;
