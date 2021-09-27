import React, { useState } from 'react'
import './style.css';
import { Button } from '../../../../components'

const PackageShareDeclare = (props) => {
    const {
        title,
        children,
        goback,
        onDeclare,
        disabled
    } = props;

    return (
        <div className="epackage-share-update-container">
            <div className="epackage-share-update">
                <span className="title">{title}</span>
                <div className="epackage-container">
                    {
                        children
                    }
                </div>
                {
                    !disabled ?
                        <div className="epackage-share-update-btn">
                            <Button
                                onClick={goback}
                                title={'Bỏ qua'}
                                styleBtn={styles.styleBackBtn}
                                styleTitle={styles.btnBackTitle}
                                classBtn="btn-back"
                                
                            />
                            <Button
                                onClick={onDeclare}
                                title={'Cập nhật'}
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

export default PackageShareDeclare;
