import React from "react";
import Field from "../components/forms/Field";

const Teachers = () => {
  return(
      <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
              <h5 className="card-header d-flex justify-content-between align-items-center">Teachers List
                  <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addmodal"><i className='bx bxs-user-plus'></i></button>
              </h5>
              <div className="table-responsive text-nowrap">
                  <table className="table mb-5 p-5">
                      <thead>
                      <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Teaching subject</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                          <tr >
                              <td><i className="fab fa-angular fa-lg text-danger me-3"/>
                                  <strong>Mouataz Hakkou</strong>
                              </td>
                              <td>moataz.hakkou@gmail.com</td>
                              <td>
                                  <span className="">+212 650 53 65 13</span>
                              </td>
                              <td>
                                  <span>Symfony full stack</span>
                              </td>
                              <td>
                                  <div className="dropdown">
                                      <div className="row ">
                                          <button type="button" className="col btn btn-outline-success m-2" data-bs-toggle="modal" data-bs-target="#showModal">Show</button>
                                          <button type="button" className="col btn btn-outline-warning m-2">Edit</button>
                                          <button type="button" className="col btn btn-outline-danger m-2">Delete</button>
                                      </div>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          {/*modal add*/}
          <div class="modal fade" id="addmodal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="modalCenterTitle">Modifier Teacher</h5>
                          <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">

                          </button>
                      </div>
                      <form onSubmit="">
                          <div class="modal-body">

                              <div class="row g-2">
                                  <Field
                                      name="FullName"
                                      label="Full name"
                                      placeholder="Full Name"

                                  />
                                  <Field
                                      name="Email"
                                      label="Email"
                                      placeholder="XXXXXX@gmail.com"

                                  />
                              </div>
                              <div className="row g-2">
                                  <Field
                                      name="phone"
                                      label="Phone Number"
                                      placeholder="063XXXXXXX"

                                  />
                                  <div className="mb-3">
                                      <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                      <select className="form-select" id="moduleQuestion"
                                              aria-label="Default select example">
                                          <option selected>Sélectionnez un module</option>
                                          <option value="1">Symfony</option>
                                          <option value="2">Laravel</option>
                                          <option value="3">React</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="row">
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary">Modifier</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          {/*end modal add*/}
          <div className="modal fade" id="showModal" data-bs-backdrop="static" tabIndex="-1">
              <div className="modal-dialog">
                  <form className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="showModal">Profile de Mouataz Hakkou</h5>
                          <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">
                          </button>
                      </div>
                      <div className="modal-body">
                          <div className="card text-center mb-3">
                              <div className="card-body">
                                  <div className="text-center mb-3">
                                      <img
                                          src={require('/public/template_assets/assets/img/avatars/1.png')}
                                          alt="user-avatar"
                                          className=" rounded"
                                          height="100"
                                          width="100"
                                          id="uploadedAvatar"
                                      />
                                  </div>
                                  <div className="row mb-3">
                                      <h5>Mouataz Hakkou</h5>
                                  </div>
                                  <div className="row mb-3">
                                      <h6>moataz.hakkou@gmail.com</h6>
                                  </div>
                                  <div className="row mb-3">
                                      <h6>+212 650 53 65 13</h6>
                                  </div>
                                  <div className="row mb-3">
                                      <h6>Symfony full stack</h6>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Close
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default Teachers;