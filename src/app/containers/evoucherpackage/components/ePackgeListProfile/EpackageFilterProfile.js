import React, { useEffect, useRef, useState } from 'react';
// import { Button, ButtonGroup, Container, Grid, makeStyles } from '@material-ui/core';
// import { InputLabel, FormControl, TextField, NativeSelect } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { ToolbarComponent } from '../../../../components';
const EpackageFilterProfile = () => {
  //const { body, setBody, keyWord, setKeyWord, isActivated, setIsActivated, pageSize, totalRow } = props;
  const [isActivated, setIsActivated] = useState();
  const [body, setBody] = useState();
  const [keyWord, setKeyWord] = useState();
  const pageSize = 5;
  const totalRow = 10;
  const [valueType, setValueType] = useState();
  const [discountType, setDiscountType] = useState();
  // const classes = useStyles();
  const refToolbar = useRef();
  useEffect(() => {
    refToolbar.current.setVisible(true, true, true, true);
    refToolbar.current.setDisable(false, false, false, false);
  }, [body]);
  function handleAllActivatedClick() {
    setIsActivated(-1);
    setBody({ ...body, isActivated: -1, pageIndex: 1, pageSize: pageSize });
  }
  function handleActivatedClick() {
    setIsActivated(1);
    setBody({ ...body, isActivated: 1, pageIndex: 1, pageSize: pageSize });
  }
  function handleUnActivatedClick() {
    setIsActivated(0);
    setBody({ ...body, isActivated: 0, pageIndex: 1, pageSize: pageSize });
  }
  function handleExpireClick() {
    setIsActivated(2);
    setBody({ ...body, isActivated: 2, pageIndex: 1, pageSize: pageSize });
  }
  function handleRealoadClick() {
    setIsActivated(-1);
    setBody({ ...body, isActivated: -1, pageIndex: 1, pageSize: pageSize });
  }
  const handleValueTypeChange = (e) => {
    setValueType(e.target.value);
  };
  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };
  const handleClearClick = () => {};
  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };
  const handleSearchClick = (event) => {};
  const add = () => {
    alert('Ch??a h??? tr??? !');
  };
  const exportExcel = () => {
    alert('Ch??a h??? tr??? !');
  };
  const importExcel = () => {
    alert('Ch??a h??? tr??? !');
  };
  const del = () => {
    alert('Ch??a h??? tr??? !');
  };
  return (
    <div></div>
    // <div>
    //   <Container className={classes.formSearch}>
    //     <Grid container>
    //       <Grid item>
    //         {' '}
    //         <FormControl className={classes.margin}>
    //           <TextField
    //             id="keyWord"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //             label="T??? kho??"
    //             value={keyWord}
    //             onChange={handleKeyWordChange}
    //           />
    //         </FormControl>
    //         <FormControl className={classes.formControl}>
    //           <InputLabel> Lo???i gi?? tr???</InputLabel>
    //           <NativeSelect value={valueType} onChange={handleValueTypeChange}>
    //             <option value={-1}> T???t c???</option>
    //             <option value={1}> S??? ti???n</option>
    //             <option value={2}> Linh ho???t</option>
    //             <option value={3}> Ph???n tr??m</option>
    //           </NativeSelect>
    //         </FormControl>
    //         <FormControl className={classes.formControl}>
    //           <InputLabel>Lo???i gi???m gi??</InputLabel>
    //           <NativeSelect value={discountType} onChange={handleDiscountTypeChange}>
    //             <option value={-1}> T???t c???</option>
    //             <option value={1}> Gi??? h??ng</option>
    //             <option value={2}> S???n ph???m</option>
    //             <option value={4}> S???n ph???m gi?? tr??? cao nh???t</option>
    //             <option value={3}> S???n ph???m gi?? tr??? th???p nh???t</option>
    //           </NativeSelect>
    //         </FormControl>
    //         <Button size="small" onClick={handleSearchClick} className={classes.button}>
    //           <SearchIcon></SearchIcon>
    //         </Button>
    //         <Button size="small" onClick={handleClearClick} className={classes.clear}>
    //           <ClearIcon> </ClearIcon>Clear
    //         </Button>
    //       </Grid>
    //       <Grid item>
    //         <ToolbarComponent
    //           ref={refToolbar}
    //           add={add}
    //           importExcel={importExcel}
    //           exportExcel={exportExcel}
    //           del={del}
    //         ></ToolbarComponent>
    //       </Grid>
    //     </Grid>
    //     <Grid container className={classes.root} justifyContent="space-between">
    //       <Grid item className={classes.item}>
    //         {' '}
    //         <ButtonGroup color="primary" aria-label=" outlined primary button group">
    //           <Button
    //             onClick={handleAllActivatedClick}
    //             className={isActivated === -1 ? classes.isActiveButton : classes.button}
    //           >
    //             T???t c???
    //           </Button>
    //           <Button
    //             onClick={handleActivatedClick}
    //             className={isActivated === 1 ? classes.isActiveButton : classes.button}
    //           >
    //             K??ch ho???t
    //           </Button>
    //           <Button
    //             onClick={handleUnActivatedClick}
    //             className={isActivated === 0 ? classes.isActiveButton : classes.button}
    //           >
    //             Ch??a k??ch ho???t
    //           </Button>
    //           <Button
    //             onClick={handleExpireClick}
    //             className={isActivated === 0 ? classes.isActiveButton : classes.button}
    //           >
    //             H???t h???n
    //           </Button>
    //         </ButtonGroup>
    //       </Grid>
    //       <Grid item className={classes.item}>
    //         {' '}
    //         <span> {totalRow} K???t qu??? ???????c t??m th???y</span>
    //       </Grid>
    //       <Grid item className={classes.item}>
    //         {' '}
    //         <Button size="small" className={classes.reloadButton} onClick={handleRealoadClick}>
    //           {' '}
    //           <ReplayIcon></ReplayIcon>Reload
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </div>
  );
};
// const useStyles = makeStyles((theme) => ({
//   formSearch: {
//     margin: 0,
//     padding: 0,
//   },
//   formControl: {
//     margin: theme.spacing(0),
//     minWidth: 120,
//     width: '200px',
//     fontSize: 'large',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   button: {
//     paddingTop: '12px',
//     height: '48px',
//     position: 'relative',
//     backgroundColor: '#3BB8C3',
//     border: '1px solid #ced4da',
//     borderRadius: '0px 8px 8px 0px',
//   },
//   clear: {
//     color: '#3BB8C3',
//     fontWeight: 'bold',
//     textTransform: 'none',
//     margin: '0 1rem',
//   },
// }));
export default EpackageFilterProfile;
