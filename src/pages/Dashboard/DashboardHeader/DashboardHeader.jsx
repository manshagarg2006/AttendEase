import "./DashboardHeader.css";
import { Bell, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHeader({ onEditAttendance }) {
    return (
        <div className="dashboard-header">

            <div>
                <h1>Good Evening 👋</h1>
                <p>Ready to conquer today's lectures?</p>
            </div>

            <div className="header-actions">

                <button
                    className="edit-attendance-btn"
                    onClick={onEditAttendance}
                >
                    Edit Attendance
                </button>

                <button
                    className="header-icon-btn"
                    type="button"
                    aria-label="Notifications"
                >
                    <Bell size={26} />
                </button>

                <Link
                    to="/login"
                    className="header-icon-btn"
                    aria-label="Login"
                >
                    <UserCircle2 size={30} />
                </Link>

            </div>

        </div>
    );
}

export default DashboardHeader;