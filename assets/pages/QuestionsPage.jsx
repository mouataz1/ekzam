import React, {useEffect, useState} from "react";
import axios from "axios";

const Questions = (props) => {
    const [question,setquestion]= useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/questions")
            .then(response=>response.data['hydra:member'])
            .then(data=>setquestion(data))
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
                            <th>Numero</th>
                            <th>Question</th>
                            <th>Dificulty</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {question.map(q =>
                            <tr key={q.id}>
                                <td><i className="fab fa-angular fa-lg text-danger me-3"/> <strong>Ques-{q.code}</strong>
                                </td>
                                <td>{q.description}</td>
                                <td>
                                    <span className="badge bg-label-danger me-1">{q.dificulty}</span>
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
    );

}
export default Questions;