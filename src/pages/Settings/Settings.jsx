import { useState,useEffect } from "react";
import "./Settings.css";

function Settings() {

    const [name, setName] = useState(
        localStorage.getItem("attendEaseName") || ""
    );

    const [rollNumber, setRollNumber] = useState(
        localStorage.getItem("attendEaseRollNumber") || ""
    );

    const [minimumAttendance, setMinimumAttendance] = useState(
        Number(localStorage.getItem("attendEaseMinimumAttendance")) || 75
    );

    const [lowAttendanceWarning, setLowAttendanceWarning] = useState(
        localStorage.getItem("attendEaseLowWarning") !== "false"
    );

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("attendEaseDarkMode") === "true"
    );

    useEffect(() => {
    if (darkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}, [darkMode]);

    const saveSettings = () => {

        localStorage.setItem(
            "attendEaseName",
            name
        );

        localStorage.setItem(
            "attendEaseRollNumber",
            rollNumber
        );

        localStorage.setItem(
            "attendEaseMinimumAttendance",
            minimumAttendance
        );

        localStorage.setItem(
            "attendEaseLowWarning",
            lowAttendanceWarning
        );

        localStorage.setItem(
            "attendEaseDarkMode",
            darkMode
        );

        alert("Settings saved successfully!");
    };


    const resetSettings = () => {

        const confirmReset = window.confirm(
            "Are you sure you want to reset your settings?"
        );

        if (!confirmReset) {
            return;
        }

        localStorage.removeItem("attendEaseName");
        localStorage.removeItem("attendEaseRollNumber");
        localStorage.removeItem("attendEaseMinimumAttendance");
        localStorage.removeItem("attendEaseLowWarning");
        localStorage.removeItem("attendEaseDarkMode");

        setName("");
        setRollNumber("");
        setMinimumAttendance(75);
        setLowAttendanceWarning(true);
        setDarkMode(false);

        alert("Settings reset successfully!");
    };


    const exportAttendance = () => {

        const savedSubjects =
            localStorage.getItem("attendEaseSubjects");

        if (!savedSubjects) {
            alert("No attendance data available.");
            return;
        }

        const subjects = JSON.parse(savedSubjects);

        let csv =
            "Subject,Attended,Total Classes,Attendance Percentage\n";

        subjects.forEach((subject) => {

            const attended =
                Number(subject.attended) || 0;

            const total =
                Number(subject.total) || 0;

            const percentage =
                total > 0
                    ? Math.round((attended / total) * 100)
                    : 0;

            const subjectName =
                subject.code || subject.name || "Subject";

            csv +=
                `${subjectName},${attended},${total},${percentage}%\n`;
        });


        const blob = new Blob(
            [csv],
            {
                type: "text/csv"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "AttendEase_Attendance.csv";

        link.click();

        URL.revokeObjectURL(url);
    };


    const resetAttendance = () => {

        const confirmReset = window.confirm(
            "Are you sure you want to reset all attendance?"
        );

        if (!confirmReset) {
            return;
        }

        const savedSubjects =
            localStorage.getItem("attendEaseSubjects");

        if (!savedSubjects) {
            alert("No attendance data found.");
            return;
        }

        try {

            const subjects =
                JSON.parse(savedSubjects);

            const resetSubjects =
                subjects.map((subject) => ({
                    ...subject,
                    attended: 0,
                    total: 0
                }));

            localStorage.setItem(
                "attendEaseSubjects",
                JSON.stringify(resetSubjects)
            );

            alert(
                "Attendance has been reset successfully!"
            );

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert(
                "Unable to reset attendance."
            );
        }
    };


    return (

        <div className="settings-page">

            <div className="settings-header">

                <h1>
                    Settings
                </h1>

                <p>
                    Customize your AttendEase experience.
                </p>

            </div>


            {/* PROFILE */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <h2>
                        Profile
                    </h2>

                    <p>
                        Manage your student information.
                    </p>

                </div>


                <div className="settings-form">

                    <div className="settings-field">

                        <label>
                            Student Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your name"
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Roll Number
                        </label>

                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(event) =>
                                setRollNumber(event.target.value)
                            }
                            placeholder="Enter your roll number"
                        />

                    </div>

                </div>

            </div>


            {/* ATTENDANCE */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <h2>
                        Attendance
                    </h2>

                    <p>
                        Configure your attendance preferences.
                    </p>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Minimum Attendance
                        </strong>

                        <span>
                            Attendance below this percentage will be considered low.
                        </span>

                    </div>


                    <select
                        value={minimumAttendance}
                        onChange={(event) =>
                            setMinimumAttendance(
                                Number(event.target.value)
                            )
                        }
                    >

                        <option value={60}>
                            60%
                        </option>

                        <option value={65}>
                            65%
                        </option>

                        <option value={70}>
                            70%
                        </option>

                        <option value={75}>
                            75%
                        </option>

                        <option value={80}>
                            80%
                        </option>

                        <option value={85}>
                            85%
                        </option>

                        <option value={90}>
                            90%
                        </option>

                    </select>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Low Attendance Warning
                        </strong>

                        <span>
                            Show warnings when attendance is below the required percentage.
                        </span>

                    </div>


                    <button
                        type="button"
                        className={
                            lowAttendanceWarning
                                ? "settings-toggle active"
                                : "settings-toggle"
                        }
                        onClick={() =>
                            setLowAttendanceWarning(
                                !lowAttendanceWarning
                            )
                        }
                    >

                        <span />

                    </button>

                </div>

            </div>


            {/* APPEARANCE */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <h2>
                        Appearance
                    </h2>

                    <p>
                        Customize how AttendEase looks.
                    </p>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Dark Mode
                        </strong>

                        <span>
                            Switch between light and dark mode.
                        </span>

                    </div>


                    <button
                        type="button"
                        className={
                            darkMode
                                ? "settings-toggle active"
                                : "settings-toggle"
                        }
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                    >

                        <span />

                    </button>

                </div>

            </div>


            {/* DATA */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <h2>
                        Data Management
                    </h2>

                    <p>
                        Manage your attendance data.
                    </p>

                </div>


                <div className="settings-buttons">

                    <button
                        type="button"
                        className="settings-save"
                        onClick={saveSettings}
                    >
                        Save Settings
                    </button>


                    <button
                        type="button"
                        className="settings-export"
                        onClick={exportAttendance}
                    >
                        Export Attendance
                    </button>


                    <button
                        type="button"
                        className="settings-reset"
                        onClick={resetAttendance}
                    >
                        Reset Attendance
                    </button>

                </div>

            </div>


            {/* RESET SETTINGS */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <h2>
                        Reset Settings
                    </h2>

                    <p>
                        Restore AttendEase settings to their default values.
                    </p>

                </div>


                <button
                    type="button"
                    className="settings-reset"
                    onClick={resetSettings}
                >
                    Reset Settings
                </button>

            </div>


            {/* ABOUT */}

            <div className="settings-card about-settings">


                <div>

                    <h2>
                        AttendEase
                    </h2>

                    <p>
                        Smart Attendance Management System
                    </p>

                    <span>
                        Version 1.0.0
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Settings;