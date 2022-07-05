import React, {useState,useEffect} from "react";
import Field from "../components/forms/Field";
import axios from "axios";
import {toast} from "react-toastify";

const Teachers = () => {
    const [teachers,setTeachers] = useState([]);
    const [teacher,setTeacher] = useState({
        firstName:"",
        lastName:"teacher",
        email:"",
        password:"teacher2022",
        phone:"",
        module:""
    });
    const handleChange = ({currentTarget}) =>{
        const {name, value} = currentTarget;
        setTeacher({...teacher, [name]: value});
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response =  await axios.post("http://127.0.0.1:8000/api/users", {...teacher, module:`/api/users/${teacher.module}`})
            $('#addmodal').modal('toggle');
            //call fetchData function here !!
            fetchTeachers();
            toast.success("Professeur ajouté avec succes 😁");

        }catch (error){
            console.log(error.response)
        }
    }

    /***************************edit ********************************/
    const [editTeacher,setEditTeacher]= useState({
        firstName:"",
        lastName:"teacher",
        email:"",
        phone:"",
        module:""
    });
    const changeOnclick = (id,firstName,lastName,email,phone,module)=>
    {
        setEditTeacher({
            id:id,
            firstName:firstName,
            lastName:"teacher",
            email:email,
            phone:phone,
            module:module,
        })
    }

    /****************************************************************/
    const [modules, setModule]=useState([]);
    const fetchModules = ()=>{
        axios.get("http://127.0.0.1:8000/api/modules")
            .then(response=>response.data['hydra:member'])
            .then(data=>setModule((data)))
            .catch(error=>console.warn(error.response));
    };
    const fetchTeachers =()=>{
        axios.get("http://127.0.0.1:8000/api/users")
            .then(response=>response.data['hydra:member'])
            .then(data=>setTeachers(data))
            .catch(error=>console.log(error.response));
    }
    useEffect(()=>{
        fetchModules();
        fetchTeachers();
    },[]);
    /********************************************************************/

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
                          <th>Nom Complet</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th> Nombre Modules</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                      {teachers.map(t =>
                          <tr key={t.id} >
                              <td><i className="fab fa-angular fa-lg text-danger me-3"/>
                                  <strong>{t.firstName}</strong>
                              </td>
                              <td>{t.email}</td>
                              <td>
                                  <span className="">{t.phone}</span>
                              </td>
                              <td>
                                  <span>{t.modules.length}</span>
                              </td>
                              <td>
                                  <div className="dropdown">
                                      <div className="row ">
                                          <button type="button" className="col btn btn-outline-success m-2" data-bs-toggle="modal" data-bs-target="#showModal" onClick={()=>changeOnclick()}>Show</button>
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
                          <h5 class="modal-title" id="modalCenterTitle">Modifier Teacher</h5>
                          <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">
                          </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                          <div class="modal-body">

                              <div class="row g-2">
                                  <Field
                                      name="firstName"
                                      label="Full name"
                                      placeholder="Full Name"
                                      value={teacher.firstName}
                                      onChange={handleChange}
                                  />
                                  <Field
                                      name="email"
                                      label="Email"
                                      placeholder="XXXXXX@gmail.com"
                                      value={teacher.email}
                                      onChange={handleChange}
                                  />
                              </div>
                              <div className="row g-2">
                                  <Field
                                      name="phone"
                                      label="Phone Number"
                                      placeholder="063XXXXXXX"
                                      value={teacher.phone}
                                      onChange={handleChange}

                                  />
                                  <div className="mb-3">
                                      <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                      <select className="form-select" id="moduleQuestion"
                                              aria-label="Default select example" name="module" value={teacher.module}
                                              onChange={handleChange}>
                                          <option selected>Sélectionnez un module</option>
                                          {modules.map(m =>
                                              <option key={m.id} value={m.id}>{m.name}</option>
                                          )}
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

          {/******************edit modal*********************/}
          <div className="modal fade" id="addmodal" tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="modalCenterTitle">Modifier Teacher</h5>
                          <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">
                          </button>
                      </div>
                      <form onSubmit={handleEditSubmit}>
                          <div className="modal-body">

                              <div className="row g-2">
                                  <Field
                                      name="firstName"
                                      label="Full name"
                                      placeholder="Full Name"
                                      value={editTeacher.firstName}
                                      onChange={handleChange}
                                  />
                                  <Field
                                      name="email"
                                      label="Email"
                                      placeholder="XXXXXX@gmail.com"
                                      value={editTeacher.email}
                                      onChange={handleChange}
                                  />
                              </div>
                              <div className="row g-2">
                                  <Field
                                      name="phone"
                                      label="Phone Number"
                                      placeholder="063XXXXXXX"
                                      value={editTeacher.phone}
                                      onChange={handleChange}

                                  />
                                  <div className="mb-3">
                                      <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                      <select className="form-select" id="moduleQuestion"
                                              aria-label="Default select example" name="module" value={editTeacher.module}
                                              onChange={handleChange}>
                                          <option selected>Sélectionnez un module</option>
                                          {modules.map(m =>
                                              <option key={m.id} value={m.id}>{m.name}</option>
                                          )}
                                      </select>
                                  </div>
                              </div>
                              <div className="row">
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary"
                                      data-bs-dismiss="modal">Close
                              </button>
                              <button type="submit" className="btn btn-primary">Modifier</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          {/******************************************************/}
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
          {/*************************************************/}
      </div>
  );
}

export default Teachers;