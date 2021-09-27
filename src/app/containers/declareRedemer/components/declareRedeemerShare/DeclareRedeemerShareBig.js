import React from 'react'
import './styleBig.css';
import { Button } from '../../../../components'
import { useHistory } from 'react-router-dom';
const DeclareRedeemerShare = (props) => {
    const history = useHistory();
    const {
        title,
        onDeclare,
        children,
        lstProvinced,
        setlstProvinced,
        objRedeemer
    } = props;
    const goback = () => {
        history.push('/evoucher-package-add')
    }
    
    return (
        <div className="redeemerbig-share-update-container">
            <div className="redeemerbig-share-update">
                <span className="titlebig">{title}</span>
                <div className="redeemerbig-container">
                    {
                        children
                    }
                </div>
            </div>
            <button  onClick={onDeclare} className="redeemerbig-update">&emsp;Cập nhật bộ điều kiện&emsp;</button>
            <button  onClick={goback} className="redeemerbig-skip">&emsp; Bỏ qua &emsp;</button>&emsp;
        </div>
    )
}

export default DeclareRedeemerShare
