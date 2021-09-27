import React, { Component } from 'react'
import './Toolbar.css';
class ToolbarComponent extends Component {
    constructor(props) {
        super(props)
        //default false sau này thêm vào mới sẽ k ảnh hưởng đến module khác
        this.state = {
            //disable button
            disable: false,
            buttonAddDisable: false,
            buttonExportExcelDisable: false,
            buttonImportExcelDisable: false,
            buttonDeleteDisable: false,
            //visible button
            buttonAddVisible: false,
            buttonExportExcelVisible: false,
            buttonImportExcelVisible: false,
            buttonDeleteVisible: false
        }

    }
    componentDidMount = () => {
    }

    setDisableAll = (disable) => {
        this.setState({
            disable: disable
        })
    }
    setDisable = (add = true, exportExcel = true, importExcel = true, del = true) => {
        this.setState({
            buttonAddDisable: add,
            buttonExportExcelDisable: exportExcel,
            buttonImportExcelDisable: importExcel,
            buttonDeleteDisable: del
        })
    }
    setVisible = (add = false, exportExcel = false, importExcel = false, del = false) => {
        this.setState({
            buttonAddVisible: add,
            buttonExportExcelVisible: exportExcel,
            buttonImportExcelVisible: importExcel,
            buttonDeleteVisible: del
        })
    }

    setButtonAddDisable = (disable) => {
        if (!this.state.buttonAddVisible) {
            disable = true;
        }
        this.setState({
            buttonAddDisable: disable
        })
    }

    setButtonExportExcelDisable = (disable) => {
        if (!this.state.buttonExportExcelVisible) {
            disable = true;
        }
        this.setState({
            buttonExportExcelDisable: disable
        })
    }

    setButtonImportExcelDisable = (disable) => {
        if (!this.state.buttonImportExcelVisible) {
            disable = true;
        }
        this.setState({
            buttonImportExcelDisable: disable
        })
    }

    setButtonDeleteDisable = (disable) => {
        if (!this.state.buttonDeleteVisible) {
            disable = true;
        }
        this.setState({
            buttonDeleteDisable: disable
        })
    }

    setButtonAddVisible = (visible) => {
        this.setState({
            buttonAddVisible: visible
        })
    }

    setButtonExportExcelVisible = (visible) => {
        this.setState({
            buttonExportExcelVisible: visible
        })
    }

    setButtonImportExcelVisible = (visible) => {
        this.setState({
            buttonImportExcelVisible: visible
        })
    }

    setButtonDeleteVisible = (visible) => {
        this.setState({
            buttonDeleteVisible: visible
        })
    }
    render() {
        const {
            disable,
            buttonAddDisable,
            buttonExportExcelDisable,
            buttonImportExcelDisable,
            buttonDeleteDisable,
            buttonAddVisible,
            buttonExportExcelVisible,
            buttonImportExcelVisible,
            buttonDeleteVisible
        } = this.state;
        const {
            add,
            exportExcel,
            importExcel,
            del,
            disabled,
            className,
        } = this.props;
        return (
            <div className={"toolbar-component m-content float-on-top" + (className ? " " + className : "") + (disabled ? " " + "disabled" : "")}>
                {
                    buttonAddVisible &&
                    <button disabled={disable || buttonAddDisable} onClick={add} className="btn-add">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                }
                {
                    buttonExportExcelVisible &&
                    <button disabled={disable || buttonExportExcelDisable} onClick={exportExcel} className="btn-export">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                }
                {
                    buttonImportExcelVisible &&
                    <button disabled={disable || buttonImportExcelDisable} onClick={importExcel} className="btn-import">
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                }
                {
                    buttonDeleteVisible &&
                    <button disabled={disable || buttonDeleteDisable} onClick={del} className="btn-del">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                }
            </div >
        )
    }
}

export default ToolbarComponent
