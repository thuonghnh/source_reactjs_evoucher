import React from 'react'
const RenderBtn = (props) => {
    const {
        className,
        setActiveBtnClick,
        styles,
        activeBtn,
        Button
    } = props;
    return (
        <div className={className}>
            <Button
                title={"Tất cả"}
                onClick={() => setActiveBtnClick(0)}
                classBtn={"search-all"}
                styleBtn={activeBtn == 0 ? styles.activeBtn : null}
            />
            <Button
                title={"Kích hoạt"}
                onClick={() => setActiveBtnClick(2)}
                classBtn={"search-active"}
                styleBtn={activeBtn == 2 ? styles.activeBtn : null}
            />
            <Button
                title={"Chưa kích hoạt"}
                onClick={() => setActiveBtnClick(1)}
                classBtn={"search-active"}
                styleBtn={activeBtn == 1 ? styles.activeBtn : null}
            />
            <Button
                title={"Hết hạn"}
                onClick={() => setActiveBtnClick(3)}
                classBtn={"search-expired"}
                styleBtn={activeBtn == 3 ? styles.activeBtn : null}
            />
        </div>
    )
}

export default RenderBtn
