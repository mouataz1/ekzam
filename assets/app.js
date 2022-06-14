import React, {useState} from "react";
import  ReactDom from "react-dom";
import {HashRouter, Switch, Route} from "react-router-dom";

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Questions from "./pages/QuestionsPage";
import Exams from "./pages/Examens";
import Examens from "./pages/Examens";
import Login from "./pages/Login";
import AuthAPI from "./services/AuthAPI";
import authAPI from "./services/AuthAPI";

AuthAPI.setup();
const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    console.warn(isAuthenticated);
    return (
        <HashRouter>
            <Switch>
                <Route path="/login"
                       render={(props) =>
                           <Login onLogin={setIsAuthenticated} />}
                />
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar isAuthenticated = {isAuthenticated} />
                    <div className="layout-page">
                        <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
                        <div className="content-wrapper">

                                <Route path="/questions" component={Questions}/>
                                <Route path="/exams" component={Examens}/>
                                <Route exact path="/" component={HomePage}/>

                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
</Switch>
        </HashRouter>
    );

}


const rootElement = document.querySelector("#app");
ReactDom.render(<App/>, rootElement);