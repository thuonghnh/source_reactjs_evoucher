import React, { useState } from 'react'
import './style.css';
import { Button } from '../../../../components'

const ProfileValueShareDeclare = (props) => {
    const {
        title,
        children,
        goback,
        onDeclare,
        isDisableAll
    } = props;

    return (
        <div className="profile-value-share-body">
            <div className="profile-value-body">
                <span className="title">{title}</span>
                <div className="profile-value-child">
                    {
                        children
                    }
                </div>
                {
                    !isDisableAll ?
                        <div className="profile-value-body-btn">
                            <Button
                                onClick={goback}
                                title={'Bỏ qua'}
                                styleBtn={styles.styleBackBtn}
                                styleTitle={styles.btnBackTitle}
                                classBtn="btn-back"
                            />
                            <Button
                                onClick={onDeclare}
                                title={'Cập nhật bộ giá trị'}
                            />
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

const styles = {
    styleBackBtn: {
        backgroundColor: '#fff'
    },
    btnBackTitle: {
        color: '#3BB8C3'
    }
}

export default ProfileValueShareDeclare;
