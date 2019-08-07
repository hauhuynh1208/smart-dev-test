import React from "react";

const sizeList = [15, 25, 50, 100, 500];

export default class PageSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 15,
        };
    }
    onChangePageSize = pageSize => {
        this.setState({ pageSize });
        this.props.onChangePageSize(pageSize);
    };
    render() {
        return (
            <div className="dropdown float-right">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {this.state.pageSize}
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    {sizeList.map(size => (
                        <DropdownItem
                            key={size}
                            value={size}
                            onChangePageSize={this.onChangePageSize}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export class DropdownItem extends React.Component {
    render() {
        return (
            <a
                className="dropdown-item"
                onClick={() => this.props.onChangePageSize(this.props.value)}
            >
                {this.props.value}
            </a>
        );
    }
}
