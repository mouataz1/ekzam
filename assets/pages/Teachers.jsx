import React from "react";

const Teachers = () => {
  return(
      <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
              <h5 className="card-header">Teachers List</h5>
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
                                          <button type="button" className="col btn btn-outline-success m-2">Show</button>
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
      </div>
  );
}

export default Teachers;