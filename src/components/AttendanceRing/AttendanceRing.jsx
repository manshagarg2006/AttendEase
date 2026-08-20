import "./AttendanceRing.css";

function AttendanceRing(){

    return(

        <div className="attendance-ring">

            <div className="circle">

                <h1>86%</h1>

                <p>Attendance</p>

            </div>

            <div className="attendance-info">

                <h2>Safe Leaves</h2>

                <h3>8 Classes</h3>

                <p>You can safely miss 8 more classes.</p>

            </div>

        </div>

    )

}

export default AttendanceRing;