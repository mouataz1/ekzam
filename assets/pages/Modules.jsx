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
        nom: "",
        description: ""
    });
    // errors
    const [errors, setErrors] = useState({
        nom: "le nom est obligatoire!!",

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
        }catch (error){
            console.log(error.response.data.violations)
        }
    }
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
          <div className="modal fade" id="addmodal"  aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="modalCenterTitle">Ajout de module</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                          </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                              <Field label="Nom Module" name="nom_module"
                                     placeholder="Entrez le nom de module"
                                     value={postModule.nom}
                                     onChange={handleChange} error={errors.nom}/>
                              <Field
                                  label="Description Module"
                                  name="description_module"
                                  type="text"
                                  placeholder="Contenu de module"
                                  error="vérifier le formulaire"
                                  value={postModule.description}
                                  onChange={handleChange}
                                  error={errors.description}
                              />
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                              </button>
                              <button type="submit" className="btn btn-primary">Enregistrer</button>
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