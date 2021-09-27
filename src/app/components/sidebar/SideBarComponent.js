import React, { useState, useEffect } from 'react';
import '../layout/layout.css';
import LogoEvoucher from '../../../assets/logo/logo.jpg';
import { useHistory } from 'react-router-dom';
import { Router } from "../../constants";
import { connect } from 'react-redux';

const SideBarComponent = (props) => {
    const { route } = props;
    const history = useHistory();
    const [dataRoute, setDataRoute] = useState([])
    useEffect(() => {
        let data = [];
        if (route.pathid <= 1) {
            data = Router.RouteLink.filter(x => x.pathid === 1);
        } else {
            data = Router.RouteLink.filter(x => x.pathid === route.pathid);
        }
        // console.log(data)
        setDataRoute(data)
    }, [])

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
    const selectRouter = (path, index) => {
        history.push(path);
    }
    const RenderItem = ({ item, index }) => {
        return (
            <li>
                <button onClick={() => selectRouter(item.path, index)} style={styleButton} className={route.path === item.path ? 'active' : ''}>
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
                            dataRoute.map((item, index) => {
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


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
