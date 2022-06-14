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

AuthAPI.setup();
const PrivateRoute = ({path, isAuthenticated, component}) =>
    isAuthenticated ? <Route exact path={path} component={component}/>
        : <Redirect to="/login"/>


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    console.warn(isAuthenticated);

    const NavBarwithRouter = withRouter(Navbar);
    return (
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
                            <PrivateRoute path="/" isAuthenticated={isAuthenticated} component={HomePage} />
                            <PrivateRoute path="/exams" isAuthenticated={isAuthenticated} component={Examens} />
                            <PrivateRoute path="/questions" isAuthenticated={isAuthenticated} component={Questions} />
                            <PrivateRoute path="/modules" isAuthenticated={isAuthenticated} component={Modules} />

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