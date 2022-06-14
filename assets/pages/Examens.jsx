import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

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
                <h5 className="card-header">All generated exams</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table mb-5 p-5">
                        <thead>
                        <tr>
                            <th>Code</th>

                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {exam.map(ex =>
                            <tr key={ex.id}>
                                <td><i className="fab fa-angular fa-lg text-danger me-3"/> <strong> Exam-{ex.code}</strong>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <div className="row ">
                                            <button type="button" className="col btn btn-outline-warning m-2">Dawnload</button>
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
    );

}
export default Examens;