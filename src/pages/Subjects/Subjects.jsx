import { useState } from "react";
import "./Subjects.css";

const defaultSubjects = [
    {
        id: 1,
        code: "OOPS",
        name: "Object Oriented Programming",
        attended: 0,
        total: 0
    },
    {
        id: 2,
        code: "FEE",
        name: "Front End Engineering",
        attended: 0,
        total: 0
    },
    {
        id: 3,
        code: "SDE",
        name: "Statistics and Data Engineering",
        attended: 0,
        total: 0
    },
    {
        id: 4,
        code: "DBMS",
        name: "Database Management System",
        attended: 0,
        total: 0
    }
];

function getSavedSubjects() {
    try {
        const saved = localStorage.getItem("attendEaseSubjects");

        if (!saved) {
            return defaultSubjects;
        }

        const savedSubjects = JSON.parse(saved);

        if (!Array.isArray(savedSubjects)) {
            return defaultSubjects;
        }

        return defaultSubjects.map((subject) => {
            const savedSubject = savedSubjects.find(
                (item) =>
                    item.name === subject.name ||
                    item.name === subject.code ||
                    item.code === subject.code
            );

            if (savedSubject) {
                return {
                    ...subject,
                    attended: Number(savedSubject.attended) || 0,
                    total: Number(savedSubject.total) || 0
                };
            }

            return subject;
        });
    } catch (error) {
        console.error("Unable to load subjects:", error);
        return defaultSubjects;
    }
}

function getPercentage(attended, total) {
    if (total <= 0) {
        return 0;
    }

    return Math.round((attended / total) * 100);
}

function getStatus(percentage, total) {
    if (total <= 0) {
        return {
            text: "No Attendance",
            className: "no-data"
        };
    }

    if (percentage >= 80) {
        return {
            text: "Good",
            className: "good"
        };
    }

    if (percentage >= 75) {
        return {
            text: "Warning",
            className: "warning"
        };
    }

    return {
        text: "Critical",
        className: "critical"
    };
}

function Subjects() {
    const [subjects] = useState(getSavedSubjects);

    return (
        <div className="subjects-page">

            {/* HEADER */}
            <div className="subjects-header">

                <div>
                    <h1>Subjects</h1>

                    <p>
                        Track your attendance for each subject
                    </p>
                </div>

                <div className="subject-count">
                    {subjects.length} Subjects
                </div>

            </div>


            {/* SUBJECT CARDS */}
            <div className="subjects-grid">

                {subjects.map((subject) => {
                    const attended = Number(subject.attended) || 0;
                    const total = Number(subject.total) || 0;

                    const percentage = getPercentage(
                        attended,
                        total
                    );

                    const status = getStatus(
                        percentage,
                        total
                    );

                    const missed = Math.max(
                        0,
                        total - attended
                    );

                    return (
                        <div
                            className="subject-card"
                            key={subject.id}
                        >

                            {/* SUBJECT HEADER */}
                            <div className="subject-card-header">


                                <div className="subject-title">

                                    <h2>
                                        {subject.code}
                                    </h2>

                                    <p>
                                        {subject.name}
                                    </p>

                                </div>

                            </div>


                            {/* ATTENDANCE */}
                            <div className="attendance-main">

                                <div>

                                    <span className="attendance-label">
                                        Attendance
                                    </span>

                                    <div className="percentage">
                                        {percentage}%
                                    </div>

                                </div>

                                <span
                                    className={`status-badge ${status.className}`}
                                >
                                    {status.text}
                                </span>

                            </div>


                            {/* PROGRESS BAR */}
                            <div className="progress-section">

                                <div className="progress-track">

                                    <div
                                        className={`progress-fill ${status.className}`}
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* STATISTICS */}
                            <div className="attendance-stats">

                                <div className="stat">

                                    <span>
                                        Attended
                                    </span>

                                    <strong>
                                        {attended}
                                    </strong>

                                </div>


                                <div className="stat">

                                    <span>
                                        Total Classes
                                    </span>

                                    <strong>
                                        {total}
                                    </strong>

                                </div>


                                <div className="stat">

                                    <span>
                                        Missed
                                    </span>

                                    <strong>
                                        {missed}
                                    </strong>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Subjects;