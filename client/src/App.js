import React from "react";
import { Formik } from "formik";
import validationSchema from "./validationSchema";
import Pagination from "./components/Pagination";
import { getPrime } from "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 15,
            totalPage: null,
            currentPage: 1,
            userInput: "",
            result: [],
        };
    }
    onTextBlur = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    async componentDidUpdate(prevProps, prevState) {
        const { userInput, pageSize, currentPage } = this.state;
        if (
            prevState.pageSize !== pageSize ||
            prevState.currentPage !== currentPage
        ) {
            const params = {
                number: parseInt(userInput),
                page: currentPage,
                limit: pageSize,
            };
            const resp = await getPrime(params);
            if (resp) {
                const { totalPage, rows } = resp;
                this.setState({ totalPage, result: rows });
            }
        }
    }
    onSubmit = async values => {
        const { currentPage, pageSize } = this.state;
        const params = {
            number: parseInt(values.userInput),
            page: currentPage,
            limit: pageSize,
        };
        const resp = await getPrime(params);
        if (resp) {
            const { totalPage, rows } = resp;
            this.setState({ totalPage, result: rows });
        }
    };
    render() {
        const { result } = this.state;
        return (
            <div className="container">
                <div className="content-inner">
                    <Formik
                        initialValues={{
                            userInput: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => this.onSubmit(values)}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-12 col-md-10">
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="userInput"
                                                aria-describedby="userInputHelp"
                                                value={props.values.userInput}
                                                onChange={props.handleChange}
                                                onBlur={this.onTextBlur}
                                                // placeholder="Enter email"
                                            />
                                            <small
                                                id="userInputHelp"
                                                className="form-text text-muted"
                                            >
                                                Please enter the positive
                                                integer
                                            </small>
                                            <span className="form-text text-muted error-text">
                                                {props.errors.userInput &&
                                                    props.touched.userInput &&
                                                    props.errors.userInput}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2">
                                        <div className="d-flex flex-row-reverse">
                                            <div className="button-container">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className="result-zone">
                        <div className="result-list">
                            {result.length
                                ? result.map((number, idx) => (
                                      <div
                                          className="number-container"
                                          key={idx}
                                      >
                                          <span>{number}</span>
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                    <Pagination
                        currentPage={this.state.currentPage}
                        totalPage={this.state.totalPage}
                        onChangePage={pageNumber =>
                            this.setState({ currentPage: pageNumber })
                        }
                        pageSize={this.state.pageSize}
                        onChangePageSize={pageSize =>
                            this.setState({ pageSize })
                        }
                    />
                </div>
            </div>
        );
    }
}

export default App;
