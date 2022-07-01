import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "react-router-dom/es/Link";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const Questions = (props) => {
    console.log(props);
    const [question,setquestion]= useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/questions")
            .then(response=>response.data['hydra:member'])
            .then(data=>setquestion(data))
            .catch(error=>console.log(error.response));
    });

    const  [postQuestion, setPostQuestion] = useState({
        code: "",
        dificulty: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        code: "le code est obligatoire!!",
        dificulty: "la complexité est obligatoire!!",
        description: "le contenue de la question et obligatoire!!"
    });

    const handleChange = ({currentTarget}) =>{
        const {name, value} = currentTarget;
        setPostQuestion ({...postQuestion, [name]: value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
           const response =  await axios.post("http://127.0.0.1:8000/api/questions", postQuestion)
            $('#addmodal').modal('toggle');
           toast.success("Question ajouté avec succes 😁");
        }catch (error){
            console.log(error.response)
        }
    }
    function deleteq(id)
    {
        const token = window.localStorage.getItem("authToken");
        fetch(`http://localhost:8000/api/questions/${id}`,{
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
                <h5 className="card-header d-flex justify-content-between align-items-center">Les Questions
                    <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addmodal"><i className='bx bxs-plus-circle'></i></button>
                </h5>

                <div className="table-responsive text-nowrap">
                    <table className="table mb-5 p-5">
                        <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Question</th>
                            <th>Dificulty</th>
                            <th>Module</th>
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
                                <td>Symfony</td>
                                <td>
                                    <div className="dropdown">
                                        <div className="row ">
                                            <button type="button" className="col btn btn-outline-warning m-2">Edit</button>
                                            <button type="button" className="col btn btn-outline-danger m-2" onClick={()=>deleteq(q.id)}>Delete</button>
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
                            <h5 class="modal-title" id="modalCenterTitle">Nouvelle question</h5>
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
                                        name="code"
                                        label="Code de question"
                                        placeholder="code de la question"
                                        value={postQuestion.code}
                                        onChange={handleChange}
                                        error={errors.code}
                                    />
                                    <Field
                                        name="dificulty"
                                        label="Dificulté"
                                        placeholder="HARD, EASY, MEDIUM"
                                        value={postQuestion.dificulty}
                                        onChange={handleChange}
                                        error={errors.dificulty}
                                    />
                                </div>
                                <div className="row">
                                    <Field
                                        name="description"
                                        label="Question"
                                        placeholder="la question ?"
                                        value={postQuestion.description}
                                        onChange={handleChange}
                                        error={errors.description}
                                    />
                                </div>
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                        <select className="form-select" id="moduleQuestion"
                                                aria-label="Default select example">
                                            <option selected>Sélectionnez un module</option>
                                            <option value="1">Symfony</option>
                                            <option value="2">Laravel</option>
                                            <option value="3">React</option>
                                        </select>
                                    </div>
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
    );

}
export default Questions;