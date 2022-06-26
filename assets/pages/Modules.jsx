import React, {useEffect, useState} from "react";
import axios from "axios";
import Field from "../components/forms/Field";




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
            Swal.fire({
                icon:'success',
                title: 'Module '+postModule.name+' Enregistré avec succès',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                showConfirmButton: true,
            })
            $('#addmodal').modal('toggle');
            console.log(response.data)
        }catch (error){
            console.log(error.response)
        }
    }
    function deleteM(id)
    {
        Swal.fire({
            title: 'avertissement !!',
            text: "vous etes sure de supprimer ce module",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'oui, supprimer!'
        }).then((result) => {
            if (result.isConfirmed) {
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
                Swal.fire(
                    ' Module Supprimé!',
                    'ce module est supprimé avec succés',
                    'success'
                )
            }
        })
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
                                          <button type="button" className="col btn btn-outline-success m-2">Show</button>
                                          <button type="button" className="col btn btn-outline-warning m-2">Edit</button>
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
      </div>
  )
}
export default Modules;