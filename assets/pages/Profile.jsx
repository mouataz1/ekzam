import React from "react";
const Profile = () => {
    return (
        <>
            <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>

                <div className="card-body">
                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                            src="../assets/img/avatars/1.png"
                            alt="user-avatar"
                            className="d-block rounded"
                            height="100"
                            width="100"
                            id="uploadedAvatar"
                        />
                        <div className="button-wrapper">
                            <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                <span className="d-none d-sm-block">Upload new photo</span>
                                <i className="bx bx-upload d-block d-sm-none"/>
                                <input
                                    type="file"
                                    id="upload"
                                    className="account-file-input"
                                    hidden
                                    accept="image/png, image/jpeg"
                                />
                            </label>
                            <button type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                                <i className="bx bx-reset d-block d-sm-none"/>
                                <span className="d-none d-sm-block">Reset</span>
                            </button>

                            <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>
                </div>
                <hr className="my-0"/>
                <div className="card-body">
                    <form id="formAccountSettings" method="POST" onSubmit="return false">
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value="John"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input className="form-control" type="text" name="lastName" id="lastName" value="Doe"/>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    name="email"
                                    value="john.doe@example.com"
                                    placeholder="john.doe@example.com"
                                />
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text">US (+1)</span>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder="202 555 0111"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary me-2">Save changes</button>
                        </div>
                    </form>
                    <hr/>

                    <form id="formAccountSettings" method="POST" onSubmit="return false">
                        <div className="row">

                            <div className="mb-3 col-md-6">
                                <label htmlFor="email" className="form-label">New password</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="password"
                                    name="email"
                                    value=""
                                    placeholder="New password"
                                />
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label" htmlFor="phoneNumber">Confirm password</label>
                                <div className="input-group input-group-merge">

                                    <input
                                        type="password"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder="Confirm New password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-danger me-2">Update Password</button>

                        </div>
                    </form>
                </div>
            </div>
        </>

    );

}
export default Profile;