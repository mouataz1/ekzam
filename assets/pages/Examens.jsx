import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";


const Examens = (props) => {

    const [exam, setExam] = useState([]);
    const [modules, setModule]=useState([]);
    const fetchExams = () => {
        axios.get("http://127.0.0.1:8000/api/exams")
            .then(response => response.data['hydra:member'])
            .then(data => setExam(data))
            .catch(error =>console.log(error.response));
    }

    /* function to fetch modules*/

    const fetchModules = ()=>{
        axios.get("http://127.0.0.1:8000/api/modules")
            .then(response=>response.data['hydra:member'])
            .then(data=>setModule((data)))
            .catch(error=>console.warn(error.response));
    }

    /*get exam questions*/

    const fetchQuestions = () => {
        axios.get("http://127.0.0.1:8000/api/exams")
            .then(response=>response.data['hydra:member'])
            .then(data=>setModule((data)))
            .catch(error=>console.warn(error.response));
    }

    const [fetquestion, setfetQuestion] = useState([])

    const handleClick = async (id)=>{
        const {data:response} = await axios.get(`http://127.0.0.1:8000/api/exams/${id}`)
         const qs = response.questions;
        setfetQuestion(qs);
        //console.log(qs);
        //console.log(qs[0].description);
    }

    /*print function */
    const printExam = () => {
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }





    useEffect(()=>{
        fetchExams();
        fetchModules();


    },[])


    //hanle fome


    const  [postExam, setPostExam] = useState({
        nbrQuestion: "",
        module: "",
        dificulty: "",

    });

    const [errors, setErrors] = useState({
        code: "le code est obligatoire!!",
        dificulty: "la complexité est obligatoire!!",
        module: "le module est obligatoire"
    });

    const handleChange = ({currentTarget}) =>{
        const {name, value} = currentTarget;
        setPostExam({...postExam, [name]: value});
       // setPostExam() ({...postExam, [name]: value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
         // this.props.history.push({pathname: '/generate'});
            //const exam = {
              const  nbrQu =  postExam.nbrQuestion;
              const  modul =  postExam.module;
            const dif = postExam.dificulty;


            //}
            axios.post("http://127.0.0.1:8000/generate", {nbrQu, dif, modul});
            $('#addmodal').modal('toggle');

            //call fetchData function here !!
            fetchExams();
            toast.success("Examen géneré avec succes 😁");

           // console.warn(postExam);

        }catch (error){
            console.log(error.response)
            console.warn(postExam);
        }
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;



    return(
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <h5 className="card-header d-flex justify-content-between align-items-center">Toutes les examens
                    <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addmodal" ><i className='bx bxs-file-plus'></i></button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table mb-5 p-5">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Titre</th>
                            <th>Module</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                        {exam.map(ex =>
                            <tr key={ex.id}>
                                <td><i className="fab fa-angular fa-lg text-danger me-3"/> <strong> Exam-{ex.code}</strong></td>
                                <td>{ex.title}</td>
                                <td>symfony</td>
                                <td>
                                    <div className="dropdown">
                                        <div className="row ">
                                            <button
                                                type="button"
                                                className="col btn btn-outline-warning m-2"
                                                data-bs-toggle="modal" data-bs-target="#showModal"
                                                onClick={()=>handleClick(ex.id)}
                                            >
                                                <i className="bx bxs-show"/></button>
                                            <button type="button" className="col btn btn-outline-warning m-2"><i className="bx bxs-printer"/></button>
                                            <button type="button" className="col btn btn-outline-danger m-2"><i className="bx bxs-trash"></i></button>
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
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">

                                <div className="row ">
                                    <div className="col mb-3">
                                        <label htmlFor="" className="form-label">Nombre de question</label>
                                        <input
                                            type="number"
                                            name="nbrQuestion"
                                            value={postExam.nbrQuestion}
                                            onChange={handleChange}
                                            className="form-control text-center"
                                        />
                                    </div>
                                </div>
                                <div className="row g-2">
                                    <div className=" col mb-3">

                                            <label htmlFor="exampleFormControlSelect1" className="form-label">Module</label>
                                            <select
                                                className="form-select"
                                                id="moduleQuestion"
                                                aria-label="Default select example"
                                                value={postExam.module}
                                                onChange={handleChange}
                                                name="module"
                                            >
                                                <option   selected>Sélectionnez un module</option>

                                                {modules.map(m =>
                                                    <option key={m.id} value={ m.id }>{m.name}</option>

                                                )}


                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" col mb-3">
                                        <label htmlFor="exampleFormControlSelect1" className="form-label">Difficulté</label>
                                        <select
                                            className="form-select"
                                            id="moduleQuestion"
                                            aria-label="Default select example"
                                            name="dificulty"
                                            value={postExam.dificulty}
                                            onChange={handleChange}
                                        >
                                            <option selected>Selectionez une option</option>
                                            <option value="EASY">Simple</option>
                                            <option value="MEDIUM">Moyenne</option>
                                            <option value="HARD">Dificile</option>
                                            <option value="RANDOM">Mixte</option>
                                        </select>
                                    </div>
                                </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Fermer
                                </button>
                                <button type="submit" className="btn btn-primary">Générer</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/*show modal*/}
            <div class="modal fade" id="showModal" data-bs-backdrop="static" tabindex="-1">
                <div class="modal-dialog">
                    <form class="modal-content">
                        <div class="modal-header">
                            <div className="col-sm-6">
                                <div>
                                    <span className="text-sm text-grey-m2 align-middle">Le :</span>
                                    <span className="text-600 text-110 text-blue align-middle">{today}</span>
                                </div>
                                <div className="text-grey-m2">
                                    <div className="my-1">
                                        SUPMTI OUJDA
                                    </div>
                                </div>
                            </div>
                            <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                <hr className="d-sm-none"/>
                                <div className="text-grey-m2">
                                    <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                        Examen Semester 2
                                    </div>

                                    <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                        <span className="text-600 text-90">Module</span> Symfony
                                    </div>


                                </div>
                            </div>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="card mb-3 d-flex">
                                {fetquestion.map((q, index)=>
                                        <h5 className="  pb-3"> Q-{index + 1} :  {q.description}</h5>



                                )}



                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                               Fermer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/*end show modal*/}
        </div>
    );

}
export default Examens;