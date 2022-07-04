import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "react-router-dom/es/Link";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const  Questions = (props) => {
    console.log(props);
    const [question,setquestion]= useState([]);


    const fetchData =  ()=>{
        axios.get("http://127.0.0.1:8000/api/questions")
            .then(response=>response.data['hydra:member'])
            .then(data=>setquestion(data))

            .catch(error=>console.log(error.response));
    };

   useEffect(   ()=>{

       fetchData();
    },[]);

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

            //call fetchData function here !!
            fetchData();
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
        fetchData();
        toast.success("Question suprimé avec success 🗑");
    }
    
    return(

        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <h5 className="card-header d-flex justify-content-between align-items-center">Toutes les questions
                    <button className="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#addmodal">Nouvel question</button>
                </h5>

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
                                            <button type="button" className="col btn btn-outline-success m-2">Afficher</button>
                                            <button type="button" className="col btn btn-outline-warning m-2" data-bs-toggle="modal" data-bs-target="#editmodal" >Modifier</button>
                                            <button type="button" className="col btn btn-outline-danger m-2" onClick={()=>deleteq(q.id)}>Suprimer</button>
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


            {/*modal edit*/}
            <div class="modal fade" id="editmodal" tabindex="-1" aria-hidden="true">
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
            {/*end modal edit*/}
        </div>
    );

}
export default Questions;