import "./TodayClasses.css";

function TodayClasses({
    attendanceStatus,
    onAttendanceChange,
    todayClasses
}) {
    // No classes today
    if (!todayClasses || todayClasses.length === 0) {
        return (
            <div className="today-card holiday-today-card">
                <div className="holiday-content">
                    <div className="holiday-icon">
                        🏖️
                    </div>

                    <h2>
                        Holiday
                    </h2>

                    <p>
                        No classes are scheduled for today.
                    </p>

                    <span>
                        Your attendance has not been changed.
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="today-card">

            <div className="today-header">
                <div>
                    <h2>
                        Today's Classes
                    </h2>

                    <p>
                        Mark your attendance for today's classes
                    </p>
                </div>

                <span className="class-count">
                    {todayClasses.length}{" "}
                    {todayClasses.length === 1
                        ? "Class"
                        : "Classes"}
                </span>
            </div>

            <div className="class-list">

                {todayClasses.map((item) => {

                    // IMPORTANT:
                    // Attendance status is stored using the UNIQUE
                    // class ID, not the subject name.
                    const status =
                        attendanceStatus?.[item.id];

                    return (
                        <div
                            className="class-card"
                            key={item.id}
                        >

                            <div className="class-info">

                                <h3>
                                    {item.subject}
                                </h3>

                                <p>
                                    {item.time}
                                </p>

                            </div>

                            <div className="attendance-area">

                                <div className="attendance-buttons">

                                    <button
                                        className={
                                            status === "present"
                                                ? "present selected"
                                                : "present"
                                        }

                                        disabled={
                                            status === "absent"
                                        }

                                        onClick={() =>
                                            onAttendanceChange(
                                                item.id,
                                                "present"
                                            )
                                        }
                                    >
                                        ✓ Present
                                    </button>

                                    <button
                                        className={
                                            status === "absent"
                                                ? "absent selected"
                                                : "absent"
                                        }

                                        disabled={
                                            status === "present"
                                        }

                                        onClick={() =>
                                            onAttendanceChange(
                                                item.id,
                                                "absent"
                                            )
                                        }
                                    >
                                        ✕ Absent
                                    </button>

                                </div>

                                {status && (
                                    <button
                                        className="edit-attendance"
                                        onClick={() =>
                                            onAttendanceChange(
                                                item.id,
                                                "edit"
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default TodayClasses;