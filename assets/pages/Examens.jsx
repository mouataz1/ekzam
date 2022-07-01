import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Field from "../components/forms/Field";

const Examens = (props) => {

    const [exam, setExam] = useState([]);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/exams")
            .then(response => response.data['hydra:member'])
            .then(data => setExam(data))
            .catch(error =>console.log(error.response));
    },[])

    return(
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <h5 className="card-header d-flex justify-content-between align-items-center">All generated exams
                    <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addmodal"><i className='bx bxs-file-plus'></i></button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table mb-5 p-5">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Module</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {exam.map(ex =>
                            <tr key={ex.id}>
                                <td><i className="fab fa-angular fa-lg text-danger me-3"/> <strong> Exam-{ex.code}</strong></td>
                                <td>Symfony</td>
                                <td>
                                    <div className="dropdown">
                                        <div className="row ">
                                            <button type="button" className="col btn btn-outline-warning m-2">Download</button>
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
            <div className="modal fade" id="addmodal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCenterTitle">Génerer un exam</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">

                            </button>
                        </div>
                        <form onSubmit="">
                            <div className="modal-body">

                                <div className="row ">
                                    <div className="col mb-3">
                                        <label htmlFor="" className="form-label">Nombre de question</label>
                                        <input
                                            type="number"
                                            name="numberQuestion"
                                            className="form-control text-center"
                                        />
                                    </div>
                                </div>
                                <div className="row g-2">
                                    <div className=" col mb-3">
                                        <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                        <select className="form-select" id="moduleQuestion"
                                                aria-label="Default select example">
                                            <option selected>Select un module</option>
                                            <option value="1">Symfony</option>
                                            <option value="2">Laravel</option>
                                            <option value="3">React</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" col mb-3">
                                        <label htmlFor="exampleFormControlSelect1" className="form-label">Difficulty</label>
                                        <select className="form-select" id="moduleQuestion"
                                                aria-label="Default select example">
                                            <option selected>Select an option</option>
                                            <option value="1">Easy</option>
                                            <option value="2">Medium</option>
                                            <option value="3">Hard</option>
                                            <option value="4">Mixte</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary">Modifier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Examens;