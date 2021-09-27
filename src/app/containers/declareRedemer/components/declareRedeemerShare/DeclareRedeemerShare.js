import React from 'react'
import './style.css';

const DeclareRedeemerShare = (props) => {
    const {
        title,
        children
    } = props;
    return (
        <div className="deredeemer-share-update-container">
            <div className="deredeemer-share-update">
                <span className="title">{title}</span>
                <div className="deredeemer-container">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export default DeclareRedeemerShare
