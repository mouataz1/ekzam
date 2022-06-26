import React, {useContext} from "react";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";

const Navbar= ({ history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous etes désormais déconnecter 😐");
        history.push("/login");

    }

    return(
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                    <i className="bx bx-menu bx-sm"/>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0"/>
                        <input
                            type="text"
                            className="form-control border-0 shadow-none"
                            placeholder="Search..."
                            aria-label="Search..."
                        />
                    </div>
                </div>


                <ul className="navbar-nav flex-row align-items-center ms-auto">




                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);"
                           data-bs-toggle="dropdown">

                        </a>
                        <button className="dropdown-item" onClick={handleLogout}>
                            <i className="bx bx-power-off me-2"/>
                            <span className="align-middle">Log Out</span>
                        </button>
                    </li>

                </ul>
            </div>
        </nav>




    );
}
export default Navbar;