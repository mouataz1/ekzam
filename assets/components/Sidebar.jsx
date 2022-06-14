import React from "react";
import {NavLink} from "react-router-dom";


const Sidebar= (props) => {
    return(
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <a href="index.html" className="app-brand-link">

                    <span className="app-brand-text demo menu-text fw-bolder ms-2">EKZAM</span>
                </a>

                <a href="javascript:void(0);"
                   className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                <li className="menu-item">
                    <NavLink to="/" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">Dashboard</div>
                    </NavLink>
                </li>
                <li className="menu-item open">
                    <NavLink to="/profile" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-user"></i>
                        <div data-i18n="Layoutss">Profile</div>
                    </NavLink>
                </li>
                <li className="menu-item  open">
                    <NavLink to="/modules" className=" menu-link">
                        <i className="menu-icon tf-icons bx bx-folder-open"></i>
                        <div data-i18n="Layouts">Modules</div>
                    </NavLink>
                </li>
                <li className="menu-item  open">
                    <NavLink to="/questions" className=" menu-link">
                        <i className="menu-icon tf-icons bx bx-question-mark"></i>
                        <div data-i18n="Layouts">Questions</div>
                    </NavLink>
                </li>
                <li className="menu-item  open">
                    <NavLink to="/exams" className=" menu-link">
                        <i className="menu-icon tf-icons bx bx-clipboard"></i>
                        <div data-i18n="Layouts">Exams</div>
                    </NavLink>
                </li>
                <li className="menu-item  open">
                    <NavLink to="/teachers" className=" menu-link">
                        <i className="menu-icon tf-icons bx bx-user-voice"></i>
                        <div data-i18n="Layouts">Teachers</div>
                    </NavLink>
                </li>
            </ul>
        </aside>
);
}
export default Sidebar;

