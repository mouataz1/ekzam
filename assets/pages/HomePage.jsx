import React, {useEffect ,useState} from "react";
import axios from "axios";

const HomePage = (props) => {
    const [question,setquestion]= useState([]);
    const [modules, setModule]=useState([]);
    const [exams,setExams] = useState([]);
    const [teachers,setTeachers] = useState([]);

    const fetchExams = ()=>{
        axios.get("http://127.0.0.1:8000/api/exams")
            .then(response=>response.data['hydra:member'])
            .then(data=>setExams(data))
            .catch(error=>console.log(error.response));

    }
    const fetchTeachers =()=>{
        axios.get("http://127.0.0.1:8000/api/users")
            .then(response=>response.data['hydra:member'])
            .then(data=>setTeachers(data))
            .catch(error=>console.log(error.response));
    }
    const fetchData =  ()=>{
        axios.get("http://127.0.0.1:8000/api/questions")
            .then(response=>response.data['hydra:member'])
            .then(data=>setquestion(data))
            .catch(error=>console.log(error.response));
    };

    /* function to fetch modules*/

    const fetchModules = ()=>{
        axios.get("http://127.0.0.1:8000/api/modules")
            .then(response=>response.data['hydra:member'])
            .then(data=>setModule((data)))
            .catch(error=>console.warn(error.response));

    };
    useEffect(   ()=>{
        fetchData();
        fetchModules();
        fetchExams();
        fetchTeachers();
    },[]);
    return(
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="layout-demo-wrapper">
                <div className="layout-demo-placeholder">
                    <div className="row col-12">
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bxs-folder-open bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> {modules.length} modules</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-question-mark bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> {question.length} Questions </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-clipboard bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> {exams.length} exams </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className=" mb-3 text-center">
                                            <i className="bx bx-user-voice bx-lg text-center"></i>
                                        </div>
                                    </div>
                                    <h1> {teachers.length} Teachers </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;