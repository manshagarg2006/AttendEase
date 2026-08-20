import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    BookOpen,
    BarChart3,
    Settings
} from "lucide-react";

import "./Sidebar.css";


function Sidebar() {

    return (

        <aside className="sidebar">

            {/* LOGO */}

            <div className="sidebar-logo">

                <div className="logo-icon">
                    A
                </div>

                <div>
                    <h2>
                        AttendEase
                    </h2>

                    <span>
                        Attendance Manager
                    </span>
                </div>

            </div>


            {/* NAVIGATION */}

            <nav className="sidebar-nav">

                <NavLink
                    to="/"
                    end
                    className="sidebar-link"
                >
                    <LayoutDashboard size={20} />

                    <span>
                        Dashboard
                    </span>
                </NavLink>


                <NavLink
                    to="/timetable"
                    className="sidebar-link"
                >
                    <CalendarDays size={20} />

                    <span>
                        Timetable
                    </span>
                </NavLink>


                <NavLink
                    to="/subjects"
                    className="sidebar-link"
                >
                    <BookOpen size={20} />

                    <span>
                        Subjects
                    </span>
                </NavLink>


                <NavLink
                    to="/analytics"
                    className="sidebar-link"
                >
                    <BarChart3 size={20} />

                    <span>
                        Analytics
                    </span>
                </NavLink>


                <NavLink
                    to="/settings"
                    className="sidebar-link"
                >
                    <Settings size={20} />

                    <span>
                        Settings
                    </span>
                </NavLink>

            </nav>


            {/* BOTTOM */}

            <div className="sidebar-bottom">

                <div className="sidebar-profile">

                    <div className="profile-avatar">
                        M
                    </div>

                    <div>
                        <strong>
                            Student
                        </strong>

                        <span>
                            Manage attendance
                        </span>
                    </div>

                </div>

            </div>

        </aside>

    );
}


export default Sidebar;