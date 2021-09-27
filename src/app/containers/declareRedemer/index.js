import React, { useState, useEffect } from 'react';
import { EHeaderComponent } from '../../components';
import './style.css';
import DeclareRedeemerShare from './components/declareRedeemerShare/DeclareRedeemerShare';
import DeclareRedeemerShareBig from './components/declareRedeemerShare/DeclareRedeemerShareBig';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ProductApplyRedeemer from './components/ProductApply';
import TypeApplyRedeemer from './components/TypeApply/TypeApplyRedeemer';
import ApplyRange from './components/ApplyRange/ApplyRange';
import { Input } from '../../components';
import * as redeemerAction from './action';
import { helper } from '../../common';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoadingComponent } from '../../components';
import { toast } from '../../common';
import { date as FormatDate } from '../../common';
const RegulationDeclare = (props) => {
  const { redeemerAction } = props;
  const { dataRedeemer, BrandpageOfItems } = props;
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [redeemerName, setRedeemerName] = useState(""); //tên gói
  const [idPage, setidPage] = useState(1);
  const [objRedeemer, setObjRedeemer] = useState({});
  const { id } = useParams();
  const [nameOfRedeemer, setNameOfRedeemer] = useState('');
  const [lstBrand, setlstBrand] = useState([]);
  const [lstCompanyBrand, setlstCompanyBrand] = useState([]);
  const [lstInventoryStatus, setlstInventoryStatus] = useState([]);
  const [lstMainGroup, setlstMainGroup] = useState([]);
  const [lstOutPutType, setlstOutPutType] = useState([]);
  const [lstProductExclude, setlstProductExclude] = useState([]);
  const [lstProductInclude, setlstProductInclude] = useState([]);
  const [lstProvinced, setlstProvinced] = useState([]);
  const [lstStore, setlstStore] = useState([]);
  const [lstSubGroup, setlstSubGroup] = useState([]);
  const [lstRedeemer, setlstRedeemer] = useState([]);
  const [redeemerId, setredeemerId] = useState('');
  const [selectedMainGroup, setSelectedMainGroup] = useState([]);
  const [selectedSubGroup, setSelectedSubGroup] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedInventoryStatus, setSelectedInventoryStatus] = useState([]);
  const [selectedProductApply, setSelectedProductApply] = useState([]);
  const [selectedProductUnApply, setSelectedProductUnApply] = useState([]);
  const [outputTypesSelected, setOutputTypesSelected] = useState([]);
  const [objPackage, setObjPackage] = useState({})
  const [objTerm, setObjectTerm] = useState({})
  const [termId, setTermId] = useState("");
  const [lstStoreId, setLstStoreId] = useState([])
  useEffect(() => {

    if (location.state && location.state.objPackage) {
      setObjPackage(location.state.objPackage);
      console.log(location.state.objRedeemer)
      if (location.state.objRedeemer) {
        //ở trên này nhũng thằng nào isDelete !== 1 mới lấy ra để show lên lưới
        const { objRedeemer } = location.state
        setObjRedeemer(objRedeemer);
        setredeemerId(objRedeemer.redeemerId);
        setRedeemerName(objRedeemer.redeemerName);
        setlstBrand(objRedeemer.lstCritBrand);//location.state.objRedeemer.lstCritBrand.filter(x=> x.isDeleteted !== 1)
        setlstCompanyBrand(objRedeemer.lstCritCompanyBrand);
        setlstInventoryStatus(objRedeemer.lstCritInventoryStatus);
        setlstMainGroup(objRedeemer.lstCritMainGroup);
        setlstOutPutType(objRedeemer.lstCritOutPutType);
        setlstProductExclude(objRedeemer.lstCritProductExclude);
        setlstProductInclude(objRedeemer.lstCritProductInclude);
        setlstProvinced(objRedeemer.lstCritProvinced);
        setlstStore(objRedeemer.lstCritStore);
        setlstSubGroup(objRedeemer.lstCritSubGroup);
        setLstStoreId(objRedeemer.lstCritStore.map(x => x.storeId))
      }
    }
    else {
      history.push({
        pathname: '/evoucher-package'
      });
    }

  }, []);



  const onDeclare = () => {
    if (redeemerName === "") {
      toast.notifyWarning('Vui lòng nhập tên bộ điều kiện áp dụng!');
      return;
    }
    if (lstProvinced.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0 && lstCompanyBrand.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0 && lstStoreId.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn 1 trong 3 loại phạm vi áp dụng!');
      return;
    }
    if (selectedMainGroup.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn ngành hàng!');
      return;
    }
    if (selectedSubGroup.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn nhóm hàng!');
      return;
    }
    if (selectedBrand.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn nhà sản xuất!');
      return;
    }
    if (selectedInventoryStatus.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn trạng thái sản phẩm!');
      return;
    }
    if (lstOutPutType.filter(x => !x.isDeleted || x.isDeleted === 0).length === 0) {
      toast.notifyWarning('Vui lòng chọn loại hình thức xuất áp dụng!');
      return;
    }
    if (!id) {
      addRedeemer();
    } else {
      updateRedeemer();
    }
  };
  const addRedeemer = () => {
    //kiểm tra lại vì sao ra chuỗi
    setIsLoading(true);
    const {
      userData,
    } = props;
    const params = {
      redeemerName: redeemerName,
      lstCritProvinced: lstProvinced,
      lstCritBrand: selectedBrand,
      lstCritCompanyBrand: lstCompanyBrand,
      lstCritInventoryStatus: selectedInventoryStatus,
      lstCritMainGroup: selectedMainGroup,
      lstCritOutPutType: lstOutPutType,
      lstCritProductExclude: selectedProductUnApply,
      lstCritProductInclude: selectedProductApply,
      lstCritStore: lstStore,
      lstCritSubGroup: selectedSubGroup,
      isDeleted: 0,
      createdUser: userData.profile.Username + ' - ' + userData.profile.Fullname,
      createdDate: FormatDate.getTimestamp(new Date()),
      updatedUser: null,
      updatedDate: null,
      termId: Math.floor((Math.random() * 1000000000) + 1),
      packageId: 0,
      action: 0,
      redeemerId: "",
    };
    let objTerm = objPackage
    objTerm.lstRedeemer.push(params);
    console.log("objTerm", objTerm)

    if (objTerm.lstRedeemer.packageId > 0) {
      history.push({
        pathname: "/evoucher-package/" + objTerm.lstRedeemer.packageId,
        state: {
          objPackage: objTerm,
        }
      });
    }
    else {
      history.push({
        pathname: "/evoucher-package-add",
        state: {
          objPackage: objTerm,
        }
      });
    }
    toast.notifySuccess('Thêm mới thành công!');
    setIsLoading(false);
  };
  const updateRedeemer = () => {

    if (location.state && location.state.objProfileValue) {
      const { objProfileValue, objPackage, objProfile } = location.state;
      if (objProfileValue.termId > 0) {
        history.push({
          pathname: "/profile-value/" + objProfileValue.termId,
          state: {
            objPackage: objPackage,
            objProfile: objProfile,
            objProfileValue: objProfileValue
          }
        });
      }
      else {
        history.push({
          pathname: "/profile-value-add",
          state: {
            objPackage: objPackage,
            objProfile: objProfile,
            objProfileValue: objProfileValue
          }
        });
      }
      toast.notifySuccess('Cập nhật thành công!');
      return;
    }
    const {
      userData
    } = props;
    // setIsLoading(true);
    let objTerm = objPackage
    let index = objTerm.lstRedeemer.findIndex(x => x.termId == id);
    let objRedeemer = objTerm.lstRedeemer[index]

    if (objRedeemer.redeemerId < 1) {
      objRedeemer.createdDate = FormatDate.getTimestamp(new Date());
    }

    //set data province
    // //lstProvinced data province những thằng check (1)
    // //map 1 qua dạng lstProvincedId
    // //objRedeemer.lstProvinced...thằng ở đây có thể có data được lưu ở db và lưu tạm(2)
    // //những thằng đc lưu ở db sẽ có id...
    // //kiểm tra trong (1) và 
    // let tmp = objRedeemer.lstProvinced;
    // //giả sử check 1 2 3
    // //truyền qua 1 3 5 7....có 1 và 5 lưu ở db
    // lstProvinced.forEach(x => {
    //   //kiểm tra trong 2 có tồn tại những thằng trong 1 k
    //   let index = tmp.findIndex(x => x.provinceId == x.provinceId);
    //   //k tồn tại thì add vào 2
    // if (index === -1) {
    //   tmp.push(x)
    // }else{//nếu tồn tại trong list check, dưới db và bị xóa trước đó thì update lại isDeleted = 0 là đc
    //   if(tmp[index].isDeleted === 1 && tmp[index].id > 0){
    //     tmp[index].isDeleted = 0;
    //   }
    // }
    // })

    // //khi add xong thì trong list sẽ có những thằng đã check và những thằng lưu ở db
    // //kiểm tra những thằng nào lưu ở db mà bỏ check thì update isDeleleted = 1
    // tmp.filter(x => lstProvincedId.indexOf(x.provinceId) === -1 && x.id > 0).map(x => x.isDeleted = 1);
    // //lọc những thằng có trong (2) và đang lưu tạm nhưng lại k có trong 1
    // let dataProvince = tmp.filter(x => lstProvincedId.indexOf(x.provinceId) > -1 || x.isDeleted === 1);
    // ///////////////////////////



    objRedeemer.action = 1;
    objRedeemer.redeemerName = redeemerName;
    objRedeemer.lstCritProvinced = lstProvinced;//dataProvince
    objRedeemer.lstCritBrand = selectedBrand;
    objRedeemer.lstCritCompanyBrand = lstCompanyBrand;
    objRedeemer.lstCritInventoryStatus = selectedInventoryStatus;
    objRedeemer.lstCritMainGroup = selectedMainGroup;
    objRedeemer.lstCritOutPutType = lstOutPutType;
    objRedeemer.lstCritProductExclude = selectedProductUnApply;
    objRedeemer.lstCritProductInclude = selectedProductApply;
    objRedeemer.lstCritStore = lstStore;
    objRedeemer.lstCritSubGroup = selectedSubGroup;
    objTerm.lstRedeemer[index] = objRedeemer

    console.log("params", objTerm)


    if (objTerm.packageId > 0) {
      history.push({
        pathname: "/evoucher-package/" + objTerm.packageId,
        state: {
          objPackage: objTerm,
        }
      });
    }
    else {
      history.push({
        pathname: "/evoucher-package-add",
        state: {
          objPackage: objTerm,
        }
      });
    }
    toast.notifySuccess('Cập nhật thành công!');
  };

  const ClickApplicationRange = (n) => {
    setidPage(n);
  };
  const goback = () => {
    history.goBack();
  };
  return (
    <React.Fragment>
      <EHeaderComponent title={'KHAI BÁO BỘ ĐIỀU KIỆN ÁP DỤNG'} goback={goback} />
      <DeclareRedeemerShare>
        <div className="col-md-12 applirange-container-title">
          <div className="col-md-12 inputname">
            <Input
              value={redeemerName}
              type="text"
              className="input-redeemer-name"
              placeholder="&emsp;Nhập tên bộ điều kiện áp dụng (*)"
              onChange={(e) => setRedeemerName(e.target.value)}
              maxLength={500}
            />
            <br></br>
            <span className="txtspan" style={styles.spanLengthName}>
              {redeemerName.length}/500
            </span>
          </div>
          <div className="row">
            <div className="tab">
              <button
                style={idPage != 1 ? styles.active : null}
                onClick={() => ClickApplicationRange(1)}
                className="tablinksAR"
              >
                <b> &emsp;Phạm vi áp dụng&emsp; </b>
              </button>
              &emsp;
              <button
                style={idPage != 2 ? styles.active : null}
                onClick={() => ClickApplicationRange(2)}
                className="tablinksAR"
              >
                <b> &emsp;Sản phẩm áp dụng&emsp; </b>
              </button>
              &emsp;
              <button
                style={idPage != 3 ? styles.active : null}
                onClick={() => ClickApplicationRange(3)}
                className="tablinksAR"
              >
                <b> &emsp;Hình thức xuất áp dụng&emsp; </b>
              </button>
              &emsp;
            </div>
          </div>
        </div>
      </DeclareRedeemerShare>

      <DeclareRedeemerShareBig onDeclare={onDeclare} setObjRedeemer={setObjRedeemer} objRedeemer={objRedeemer}>
        {idPage === 1 ? (
          <ApplyRange
            lstCompanyBrand={lstCompanyBrand}
            setlstCompanyBrand={setlstCompanyBrand}
            lstProvinced={lstProvinced}
            setlstProvinced={setlstProvinced}
            lstStore={lstStore}
            setlstStore={setlstStore}
            setObjRedeemer={setObjRedeemer}
            objRedeemer={objRedeemer}
            lstStoreId={lstStoreId}
            setLstStoreId={setLstStoreId}
          ></ApplyRange>
        ) : null}
        {idPage === 2 ? (
          <ProductApplyRedeemer
            lstBrand={lstBrand}
            setlstBrand={setlstBrand}
            lstInventoryStatus={lstInventoryStatus}
            setlstInventoryStatus={setlstInventoryStatus}
            lstMainGroup={lstMainGroup}
            setlstMainGroup={setlstMainGroup}
            lstProductExclude={lstProductExclude}
            setlstProductExclude={setlstProductExclude}
            lstProductInclude={lstProductInclude}
            setlstProductInclude={setlstProductInclude}
            lstSubGroup={lstSubGroup}
            setlstSubGroup={setlstSubGroup}
            selectedMainGroup={selectedMainGroup}
            setSelectedMainGroup={setSelectedMainGroup}
            selectedSubGroup={selectedSubGroup}
            setSelectedSubGroup={setSelectedSubGroup}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedInventoryStatus={selectedInventoryStatus}
            setSelectedInventoryStatus={setSelectedInventoryStatus}
            selectedProductApply={selectedProductApply}
            setSelectedProductApply={setSelectedProductApply}
            selectedProductUnApply={selectedProductUnApply}
            setSelectedProductUnApply={setSelectedProductUnApply}
          ></ProductApplyRedeemer>
        ) : null}
        {idPage === 3 ? (
          <TypeApplyRedeemer
            redeemerName={redeemerName}
            setRedeemerName={setRedeemerName}
            lstOutPutType={lstOutPutType}
            setlstOutPutType={setlstOutPutType}
            outputTypesSelected={outputTypesSelected}
            setOutputTypesSelected={setOutputTypesSelected}
          ></TypeApplyRedeemer>
        ) : null}
        <div></div>
      </DeclareRedeemerShareBig>
      <LoadingComponent isLoading={isLoading} />
    </React.Fragment>
  );
};
const styles = {
  hide: {
    display: 'none',
  },
  active: {
    color: 'Black',
    border: 'none',
  },
  fontWeightSpan: {
    fontWeight: 600,
  },
  spanLengthName: {
    fontSize: 12,
    fontWeight: 300,
    float: 'right',
  },
  spanLengthDescription: {
    fontSize: 12,
    fontWeight: 300,
    paddingLeft: 10,
  },
  spanColor: {
    color: 'red',
  },
};
const mapStateToProps = (state) => ({
  userData: state.auth.infoUser.userData,
});
const mapDispatchToProps = (dispatch) => ({
  redeemerAction: bindActionCreators(redeemerAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegulationDeclare);
