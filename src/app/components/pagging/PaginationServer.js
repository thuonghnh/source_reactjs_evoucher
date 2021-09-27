import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
const propTypes = {
    // items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}
const listPageSize = [5, 10, 20, 50];
class PaginationServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {},
            pageSize: 10
        };
    }

    componentDidMount() {
        let { pager, pageSize } = this.state;
        const { initialPage } = this.props;
        // get new pager object for specified page
        pager = this.getPager(initialPage, pageSize);
        // console.log('pager unmount', pager)

        // update state
        this.setState({ pager: pager });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.totalItems !== prevState.pager.totalItems){
            this.setPageDefault(this.props.initialPage);
        }
    }

    setPageDefault(page) {
        const { onChangePage } = this.props;
        let { pager, pageSize } = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(page, pageSize);
        // console.log('pager', pager)

        // update state
        this.setState({ pager: pager });
    }

    setPage(page) {
        const { onChangePage } = this.props;
        let { pager, pageSize } = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(page, pageSize);
        // console.log('pager', pager)

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        onChangePage(pager)
    }

    getPager(currentPage, pageSize) {
        const { totalItems } = this.props;
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let pageIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(pageIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pageIndex: pageIndex,//server đang lấy theo currenPage
            endIndex: endIndex,
            pages: pages
        };
    }
    selectPageSize = e => {
        // console.log(e.target.value)
        const { initialPage } = this.props;
        this.setState({
            pageSize: parseInt(e.target.value)
        }, () => {
            this.setPage(initialPage);
            this.getPager(initialPage, parseInt(e.target.value))
        })
    }
    render() {
        const { pager } = this.state;
        const { totalItems } = this.props
        if (!pager.pages || pager.pages.length < 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="paging">
                <label className={'pa-label'}>Tổng số dòng {totalItems}</label>
                <ul className="pagination-ul">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <button className={'pa-button'} onClick={() => this.setPage(1)}>
                            <i className="fa fa-step-backward" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <button className={'pa-button'} onClick={() => this.setPage(pager.currentPage - 1)}>
                            <i className="fa fa-caret-left" aria-hidden="true"></i>
                        </button>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <button className={'pa-button'} onClick={() => this.setPage(page)}>{page}</button>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <button className={'pa-button'} onClick={() => this.setPage(pager.currentPage + 1)}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <button className={'pa-button'} onClick={() => this.setPage(pager.totalPages)}>
                            <i className="fa fa-step-forward" aria-hidden="true"></i>
                        </button>
                    </li>
                    <select className={'pa-select'} value={this.state.pageSize} onChange={this.selectPageSize}>
                        {
                            listPageSize.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>
                </ul>
            </div>
        );
    }
}

PaginationServer.propTypes = propTypes;
PaginationServer.defaultProps = defaultProps;
export default PaginationServer;