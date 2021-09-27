import React from 'react'
import './style.css'
const EHeaderComponent = (props) => {
    const {
        title,
        goback
    } = props;
    return (
        <React.Fragment>
            <div className="EHeader">
                {
                    goback ?
                        <button onClick={goback}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        : null
                }
                <span>{title}</span>
            </div>
            {/* <div className="EHeader-footer">

            </div> */}
        </React.Fragment>

    )
}

export default EHeaderComponent
