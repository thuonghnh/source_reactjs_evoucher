import React, { useState } from 'react';
import '../layout/layout.css';
import LogoEvoucher from '../../../assets/logo/logo.jpg';

const SideBarPage = (props) => {
    const {
        dataPage,
        setIdPage,
        idPage,
        setNamePage
    } = props;

    const [styleSidebar, setStyleSidebar] = useState({})
    const [styleSidebarBrand, setStyleSidebarBrand] = useState({})
    const [styleSpan, setStyleSpan] = useState({})
    const [styleButton, setStyleButton] = useState({})
    const [styleMain, setStyleMain] = useState({})
    const onClickNavBar = () => {
        if (Object.getOwnPropertyNames(styleSpan).length !== 0) {
            setStyleSidebar({})
            setStyleSpan({})
            setStyleSidebarBrand({})
            setStyleButton({})
            setStyleMain({})
        } else {
            setStyleSidebar({
                width: "60px"
            })
            setStyleMain({
                marginLeft: "60px",
            })

            setStyleSpan({
                display: "none"
            })
            setStyleSidebarBrand({
                paddingRight: ".5rem"
            })
            setStyleButton({
                paddingLeft: "0rem"
            })
        }
    }
    const selectRouter = (item) => {
        setIdPage(item.id)
        if (setNamePage)
            setNamePage(item.name)
    }
    const RenderItem = ({ item, index }) => {
        return (
            <li>
                <button onClick={() => selectRouter(item)} style={styleButton} className={idPage === item.id ? 'active' : ''}>
                    <i className={item.icon} aria-hidden="true"></i>
                    <span style={styleSpan}>{item.name}</span>
                </button>
                <span style={styleSpan}><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
            </li>
        )
    }
    return (
        <React.Fragment>
            <main style={styleMain}>
                {
                    props.children
                }
            </main>
            <div className="sidebar" style={styleSidebar}>
                <div style={styleSidebarBrand} className="sidebar-brand">
                    <h2>
                        <a href="/" aria-label="Evoucher">
                            <img style={styleSpan} src={LogoEvoucher} alt="" />
                        </a>

                        <i onClick={onClickNavBar} className="fa fa-bars" aria-hidden="true" ></i>
                    </h2>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        {
                            dataPage.map((item, index) => {
                                return (
                                    <RenderItem item={item} key={index} index={index} />
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment >
    )
}


export default SideBarPage;
