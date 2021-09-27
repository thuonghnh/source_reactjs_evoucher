import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}
const listPageSize = [5, 10, 20, 50];
class PaginationClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {},
            pageSize: 10
        };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.items)
        // console.log(prevProps.items)
        // // reset page if items array has changed
        if (this.props.items.length !== this.state.pager.totalItems) {
            this.setPageDefault(this.props.initialPage);
        }
    }

    setPageDefault(page) {
        let { items } = this.props;
        let { pager, pageSize } = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);
        // console.log(pager)
        // get new page of items from items array
        let termData = [...items]
        let pageOfItems = termData.splice(pager.pageIndex, pageSize);

        // update state
        this.setState({ pager: pager });
    }


    setPage(page) {
        let { items } = this.props;
        let { pager, pageSize } = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);
        // console.log(pager)
        // get new page of items from items array
        let termData = [...items]
        let pageOfItems = termData.splice(pager.pageIndex, pageSize);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems, pageSize);
    }

    getPager(totalItems, currentPage, pageSize) {
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
            pageIndex: pageIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    selectPageSize = e => {
        // console.log(e.target.value)
        const { initialPage, items } = this.props;
        this.setState({
            pageSize: parseInt(e.target.value)
        }, () => {
            this.setPage(initialPage);
            let termData = [...items]
            // console.log(parseInt(e.target.value))
            let pageOfItems = termData.splice(0, parseInt(e.target.value));
            // console.log(pageOfItems)
            this.props.onChangePage(pageOfItems, parseInt(e.target.value));
        })
    }
    render() {
        let pager = this.state.pager;
        const { totalItems } = this.props;
        // console.log('items page', pager)
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

PaginationClient.propTypes = propTypes;
PaginationClient.defaultProps = defaultProps;
export default PaginationClient;