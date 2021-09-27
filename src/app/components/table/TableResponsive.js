import React from 'react'

const TableResponsive = (props) => {
    const {
        className,
        children,
    } = props;
    return (
        <div className={className ? className : "col-md-12 pd-botton"}>
            <div className="table-responsive">
                <table width="100%">
                    {
                        children
                    }
                </table>
            </div>
        </div>
    )
}

export default TableResponsive
