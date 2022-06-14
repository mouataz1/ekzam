import React from "react";

const HomePage = (props) => {
    return(
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="layout-demo-wrapper">
                <div className="layout-demo-placeholder">
                    <div className="row mb-5">
                        <div className="col-md">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">

                                        <img className="card-img card-img-left" src="{{ asset('template_assets/assets/img//elements/12.jpg') }}"
                                             alt="Card image"/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">
                                                This is a wider card with supporting text below as a natural lead-in to
                                                additional content.
                                                This content is a little bit longer.
                                            </p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins
                                                ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">
                                                This is a wider card with supporting text below as a natural lead-in to
                                                additional content.
                                                This content is a little bit longer.
                                            </p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins
                                                ago</small></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="card-img card-img-right" src="../assets/img/elements/17.jpg"
                                             alt="Card image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">
                                                This is a wider card with supporting text below as a natural lead-in to
                                                additional content.
                                                This content is a little bit longer.
                                            </p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins
                                                ago</small></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="card-img card-img-right" src="../assets/img/elements/17.jpg"
                                             alt="Card image"/>
                                    </div>
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