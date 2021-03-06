import React, {useState} from "react";
import  ReactDom from "react-dom";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";

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
import Redirect from "react-router-dom/es/Redirect";
import Modules from "./pages/Modules";
import Profile from "./pages/Profile";
import Teachers from "./pages/Teachers";

import AuthContext from "./contexts/AuthContext";
import Question from "./pages/Question";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


AuthAPI.setup();
const PrivateRoute = ({path, isAuthenticated, component}) =>
    isAuthenticated ? <Route exact path={path} component={component}/>
        : <Redirect to="/login"/>


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    console.warn(isAuthenticated);

    const NavBarwithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated,
         setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
        <HashRouter>
            <Switch>

                <Route path="/login"
                       render={(props) =>
                           <Login onLogin={setIsAuthenticated} {...props} />}
                />
            <div className="layout-wrapper layout-content-navbar">

                <div className="layout-container">
                    <Sidebar isAuthenticated = {isAuthenticated} />
                    <div className="layout-page">

                        <NavBarwithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
                        <div className="content-wrapper">
                            <PrivateRoute path="/"  isAuthenticated={isAuthenticated} component={HomePage} />
                            <PrivateRoute path="/profile"  isAuthenticated={isAuthenticated} component={Profile} />
                            <PrivateRoute path="/exams" isAuthenticated={isAuthenticated} component={Examens} />
                            <PrivateRoute path="/questions/:id" isAuthenticated={isAuthenticated} component={Question}/>
                            <PrivateRoute path="/questions" isAuthenticated={isAuthenticated} component={Questions} />

                            <PrivateRoute path="/modules" isAuthenticated={isAuthenticated} component={Modules} />
                            <PrivateRoute path="/teachers" isAuthenticated={isAuthenticated} component={Teachers} />
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
</Switch>
        </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>
    );

}


const rootElement = document.querySelector("#app");
ReactDom.render(<App/>, rootElement);