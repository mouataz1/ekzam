import React from "react";

const HomePage = (props) => {
    return(
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="layout-demo-wrapper">
                <div className="layout-demo-placeholder">
                    <div className="row col-12">
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bxs-folder-open bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> 4 modules</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-question-mark bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> 5 Questions </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-clipboard bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> 3 exams </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-user-voice bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> 1 Teachers </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;