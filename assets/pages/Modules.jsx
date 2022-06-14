import React, {useEffect, useState} from "react";
import axios from "axios";
import Questions from "./QuestionsPage";

const Modules = (props) => {
    const [modules,setmodule]=useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/modules")
            .then(response=>response.data['hydra:member'])
            .then(data=>setmodule(data))
            .catch(error=>console.log(error.response));
    })
  return(
      <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
              <h5 className="card-header d-flex justify-content-between align-items-center">Table Basic
                <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addmodal"><i className='bx bx-folder-plus'></i></button>
              </h5>
              <div className="table-responsive text-nowrap">
                  <table className="table mb-5 p-5">
                      <thead>
                      <tr>
                          <th>Numero de module</th>
                          <th>Nom Module</th>
                          <th>Description</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                      {modules.map(m =>
                          <tr key={m.id}>
                              <td><i className="fab fa-angular fa-lg text-danger me-3"/> <strong>M-{m.id}</strong>
                              </td>
                              <td>{m.name}</td>
                              <td>
                                  <span className="">{m.description}</span>
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

                      )}

                      </tbody>
                  </table>
              </div>
          </div>
          {/*modal add*/}
          <div class="modal fade" id="addmodal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="modalCenterTitle">Ajout de module</h5>
                          <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                          ></button>
                      </div>
                      <div class="modal-body">
                          <div class="row">
                              <div class="col mb-3">
                                  <label for="nameWithTitle" class="form-label">Name</label>
                                  <input
                                      type="text"
                                      id="nameWithTitle"
                                      class="form-control"
                                      placeholder="Enter Name"
                                  />
                              </div>
                          </div>
                          <div class="row g-2">
                              <div class="col mb-0">
                                  <label for="emailWithTitle" class="form-label">Email</label>
                                  <input
                                      type="text"
                                      id="emailWithTitle"
                                      class="form-control"
                                      placeholder="xxxx@xxx.xx"
                                  />
                              </div>
                              <div class="col mb-0">
                                  <label for="dobWithTitle" class="form-label">DOB</label>
                                  <input
                                      type="text"
                                      id="dobWithTitle"
                                      class="form-control"
                                      placeholder="DD / MM / YY"
                                  />
                              </div>
                          </div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Close
                          </button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </div>
          </div>
          {/*end modal add*/}
      </div>
  )
}
export default Modules;