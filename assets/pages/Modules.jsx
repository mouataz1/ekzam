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
              <h5 className="card-header">Table Basic</h5>
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
      </div>
  )
}
export default Modules;