import React, {useEffect, useState} from "react";
import axios from "axios";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";




const Modules = (props) => {

    const [modules,setmodule]=useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/modules")
            .then(response=>response.data['hydra:member'])
            .then(data=>setmodule(data))
            .catch(error=>console.log(error.response));
    })
    /************ajout de module**********/
    const  [postModule, setPostModule] = useState({
        name: "",
        description: ""
    });
    // errors
    const [errors, setErrors] = useState({
        name: "le name est obligatoire!!",
        description: "le contenue de module est obligatoire!!"
    });
    const handleChange = ({currentTarget}) =>{
        const {name, value} = currentTarget;
        setPostModule({...postModule, [name]: value});
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const response =  await axios.post("http://127.0.0.1:8000/api/modules", postModule)
            $('#addmodal').modal('toggle');
            console.log(response.data)
        }catch (error){
            console.log(error.response)
        }
    }

    /*****************************************************/

    /*************edit module*****************************/
    const [EditModule, setEditModule]=useState({
        id:"",
        name:"",
        description:""
    });
    const changeOnclick = (id,name,desc)=>
    {
        setEditModule({
            id:id,
            name:name,
            description:desc
        })
    }
    const handleEditchange = ({currentTarget})=>{
        const {name,value}=currentTarget;
        setEditModule({...EditModule,[name]:value});
    }
    const handleEditSubmit = async (event)=>{
        event.preventDefault();
        let id = EditModule.id;
        try {
            const response= await axios.put("http://127.0.0.1:8000/api/modules/"+id,EditModule)

            $('#editmodal').modal('toggle');
            toast.success("Module modifié avec success 🗑");
        }catch (error)
        {
            alert("erreur est survenue");
        }
    }
    /*****************************************************/
    function deleteM(id)
    {
        const token = window.localStorage.getItem("authToken");
        fetch(`http://localhost:8000/api/modules/${id}`,{
            method:'DELETE',
            headers : {
                'Accept': 'application/json',
                'Authorization': "Bearer "+ token
            }
        }).then((res)=>
            res.json().then((response)=>
            console.log(response))
        )
    }
  return(
      <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
              <h5 className="card-header d-flex justify-content-between align-items-center">Les modules
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
                                          <button type="button" className="col btn btn-outline-success m-2" data-bs-toggle="modal" data-bs-target="#showModal">Show</button>
                                          <button type="button" className="col btn btn-outline-warning m-2" data-bs-toggle="modal" data-bs-target="#editmodal" onClick={()=>changeOnclick(m.id,m.name,m.description)} >Edit</button>
                                          <button type="button" className="col btn btn-outline-danger m-2" onClick={()=>deleteM(m.id)}>Delete</button>
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
                          <h5 class="modal-title" id="modalCenterTitle">Nouveau module</h5>
                          <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">

                          </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                          <div class="modal-body">
                              <div class="row">
                                  <Field
                                      name="name"
                                      label="Nom de module"
                                      placeholder="Module-exemple"
                                      value={postModule.name}
                                      onChange={handleChange}
                                      error={errors.name}
                                  />
                              </div>
                              <div className="row">

                                  <Field
                                      name="description"
                                      label="Description"
                                      placeholder="Contenu de module"
                                      value={postModule.description}
                                      onChange={handleChange}
                                      error={errors.description}
                                  />
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                              </button>
                              <button type="submit" class="btn btn-primary">Ajouter</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          {/*end modal add*/}

          {/*edit modal */}
          <div className="modal fade" id="editmodal" tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="modalCenterTitle">Modifier module {EditModule.id}</h5>
                          <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">
                          </button>
                      </div>
                      <form onSubmit={handleEditSubmit}>
                          <div className="modal-body">
                              <input type="hidden" name={EditModule.id} value={EditModule.id}/>
                              <div className="row">
                                  <Field
                                      name="name"
                                      label="Nom de module"
                                      placeholder="Module-exemple"
                                      value={EditModule.name}
                                      onChange={handleEditchange}
                                      error={errors.name}
                                  />
                              </div>
                              <div className="row">

                                  <Field
                                      name="description"
                                      label="Description"
                                      placeholder="Contenu de module"
                                      value={EditModule.description}
                                      onChange={handleEditchange}
                                      error={errors.description}
                                  />
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                              </button>
                              <button type="submit" className="btn btn-primary">Modifier</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          {/*end edit modal*/}

          {modules.map(m =>
              <div class="modal fade" id="showModal" data-bs-backdrop="static" tabindex="-1">
                  <div class="modal-dialog">
                      <form class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="showModal">Numero de module : 6</h5>
                              <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close">
                              </button>
                          </div>
                          <div class="modal-body">
                              <div className="card text-center mb-3">
                                  <div className="card-body">
                                      <h1 className="card-title">Symfony</h1>
                                      <p className="card-text">framework Php</p>
                                  </div>
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </div>
  )
}
export default Modules;