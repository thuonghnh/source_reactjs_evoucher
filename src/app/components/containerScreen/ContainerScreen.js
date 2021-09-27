import React from 'react'

const ContainerScreen = (props) => {
    const {
        className,
        children,
    } = props;
    return (
        <div className={className}>
            <div className="row">
                {
                    children
                }
            </div>
        </div>
    )
}

export default ContainerScreen
