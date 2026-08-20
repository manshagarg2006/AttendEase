import "./DashboardHeader.css";
import {
    Bell,
    UserCircle2
} from "lucide-react";


function DashboardHeader({
    onEditAttendance
}) {

    return (

        <div className="dashboard-header">

            <div>

                <h1>
                    Good Evening 👋
                </h1>

                <p>
                    Ready to conquer today's lectures?
                </p>

            </div>


            <div className="header-right">

                <button
                    className="edit-attendance-header"
                    onClick={
                        onEditAttendance
                    }
                >
                    Edit Attendance
                </button>


                <div className="header-icons">

                    <Bell size={26} />

                    <UserCircle2 size={34} />

                </div>

            </div>

        </div>
    );
}


export default DashboardHeader;