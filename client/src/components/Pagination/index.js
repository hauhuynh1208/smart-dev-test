import React from "react";
import PageSize from "../PageSize";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 15,
        };
    }
    clickPrevNext = action => {
        const { currentPage, totalPage } = this.props;
        if (totalPage) {
            if (action) {
                if (currentPage < totalPage) {
                    this.props.onChangePage(currentPage + 1);
                }
            } else {
                if (currentPage > 1) {
                    this.props.onChangePage(currentPage - 1);
                }
            }
        }
    };
    onChangePage = pageNumber => {
        this.props.onChangePage(pageNumber);
    };
    render() {
        const { totalPage } = this.props;
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
                        {totalPage &&
                            Array.from(
                                Array(totalPage),
                                (x, index) => index + 1
                            ).map((x, index) => (
                                <PageNumber
                                    key={x}
                                    active={
                                        this.props.currentPage === index + 1
                                    }
                                    number={index + 1}
                                    onChangePage={pageNumber =>
                                        this.onChangePage(pageNumber)
                                    }
                                />
                            ))}
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
                    onClick={() => this.props.onChangePage(this.props.number)}
                >
                    {this.props.number}
                </a>
            </li>
        );
    }
}
