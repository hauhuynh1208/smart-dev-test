import React from "react";
import PageSize from "../PageSize";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 15,
            currentPageRange: null,
            pageNumber: null,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        const { totalPage } = this.props;
        const { pageNumber } = this.state;
        if (totalPage !== prevProps.totalPage) {
            if (totalPage <= 6) {
                const currentPageRange = Array.from(
                    Array(totalPage),
                    (x, index) => index + 1
                );
                this.setState({ currentPageRange, pageNumber: 1 });
            } else {
                const currentPageRange = Array.from(
                    Array(5),
                    (x, index) => index + 1
                );
                currentPageRange.push("more", totalPage);
                this.setState({ currentPageRange, pageNumber: 1 });
            }
        }
        if (
            prevState.pageNumber &&
            !prevState.currentPageRange.includes(pageNumber)
        ) {
            // update page range
            // page increase
            if (pageNumber > prevState.pageNumber) {
                const pageDistance = totalPage - pageNumber;
                let currentPageRange = [];
                if (pageDistance < 5) {
                    currentPageRange = Array.from(
                        Array(pageDistance),
                        (x, index) => index + pageNumber
                    );
                } else {
                    currentPageRange = Array.from(
                        Array(5),
                        (x, index) => index + pageNumber
                    );
                    if (pageDistance > 5) {
                        currentPageRange.push("more");
                    }
                }
                currentPageRange.unshift("less");
                currentPageRange.push(totalPage);
                this.setState({ currentPageRange });
            } else if (pageNumber < prevState.pageNumber) {
                // page decrease
                const pageDistance = pageNumber - 0;
                let currentPageRange = [];
                if (pageDistance < 5) {
                    currentPageRange = Array.from(
                        Array(pageDistance),
                        (x, index) => pageNumber - index
                    ).reverse();
                } else {
                    currentPageRange = Array.from(
                        Array(5),
                        (x, index) => pageNumber - index
                    ).reverse();
                    if (pageDistance > 5) {
                        currentPageRange.unshift("less");
                    }
                }
                currentPageRange.push("more");
                currentPageRange.push(totalPage);
                this.setState({ currentPageRange });
            }
        }
    }
    clickPrevNext = action => {
        const { totalPage } = this.props;
        const { pageNumber } = this.state;
        if (totalPage) {
            if (action) {
                if (pageNumber < totalPage) {
                    this.onChangePage(pageNumber + 1);
                    this.props.onChangePage(pageNumber + 1);
                }
            } else {
                if (pageNumber > 1) {
                    this.onChangePage(pageNumber - 1);
                    this.props.onChangePage(pageNumber - 1);
                }
            }
        }
    };
    onChangePage = pageNumber => {
        this.setState({ pageNumber });
        this.props.onChangePage(pageNumber);
    };
    render() {
        const { currentPageRange } = this.state;
        console.log(currentPageRange);
        return (
            <div className="pagination-container">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a
                                className="page-link"
                                onClick={e => {
                                    e.preventDefault();
                                    this.clickPrevNext(0);
                                }}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {/* {totalPage && this.renderPageNumber()} */}
                        {currentPageRange &&
                            currentPageRange.length &&
                            currentPageRange.map((x, index) => {
                                let value, display;
                                switch (x) {
                                    case "more":
                                        display = "...";
                                        value = currentPageRange[index - 1] + 1;
                                        break;
                                    case "less":
                                        display = "...";
                                        value = currentPageRange[index + 1] - 1;
                                        break;
                                    default:
                                        display = x;
                                        value = x;
                                        break;
                                }
                                return (
                                    <PageNumber
                                        key={x}
                                        active={this.state.pageNumber === x}
                                        display={display}
                                        value={value}
                                        onClick={pageNumber =>
                                            this.onChangePage(pageNumber)
                                        }
                                    />
                                );
                            })}
                        <li className="page-item">
                            <a
                                className="page-link"
                                onClick={e => {
                                    e.preventDefault();
                                    this.clickPrevNext(1);
                                }}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                        {/* <li className="page-item page-size-container">
                            
                        </li> */}
                    </ul>
                    <PageSize
                        onChangePageSize={pageSize =>
                            this.props.onChangePageSize(pageSize)
                        }
                    />
                </nav>
            </div>
        );
    }
}

export class PageNumber extends React.Component {
    render() {
        const className = this.props.active ? "page-item active" : "page-item";
        return (
            <li className={className}>
                <a
                    className="page-link"
                    onClick={() => this.props.onClick(this.props.value)}
                >
                    {this.props.display}
                </a>
            </li>
        );
    }
}
