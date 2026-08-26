import { useState } from "react";
import "./Analytics.css";

const DEFAULT_SUBJECTS = [
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

function loadSubjects() {
    try {
        const saved = localStorage.getItem("attendEaseSubjects");

        if (!saved) {
            return DEFAULT_SUBJECTS;
        }

        const savedSubjects = JSON.parse(saved);

        if (!Array.isArray(savedSubjects)) {
            return DEFAULT_SUBJECTS;
        }

        return DEFAULT_SUBJECTS.map((subject) => {
            const savedSubject = savedSubjects.find(
                (item) =>
                    item.code === subject.code ||
                    item.name === subject.name ||
                    item.name === subject.code
            );

            if (!savedSubject) {
                return subject;
            }

            return {
                ...subject,
                attended: Number(savedSubject.attended) || 0,
                total: Number(savedSubject.total) || 0
            };
        });
    } catch {
        return DEFAULT_SUBJECTS;
    }
}

function getPercentage(attended, total) {
    if (!total || total <= 0) {
        return 0;
    }

    return Math.round((attended / total) * 100);
}

function Analytics() {
    const [subjects] = useState(loadSubjects);

    const totalAttended = subjects.reduce(
        (sum, subject) => sum + Number(subject.attended || 0),
        0
    );

    const totalClasses = subjects.reduce(
        (sum, subject) => sum + Number(subject.total || 0),
        0
    );

    const overallPercentage = getPercentage(
        totalAttended,
        totalClasses
    );

    const subjectsWithAttendance = subjects.filter(
        (subject) => Number(subject.total) > 0
    );

    let bestSubject = null;

    subjectsWithAttendance.forEach((subject) => {
        if (!bestSubject) {
            bestSubject = subject;
            return;
        }

        const currentPercentage = getPercentage(
            subject.attended,
            subject.total
        );

        const bestPercentage = getPercentage(
            bestSubject.attended,
            bestSubject.total
        );

        if (currentPercentage > bestPercentage) {
            bestSubject = subject;
        }
    });

    const lowAttendanceSubjects = subjects.filter((subject) => {
        const percentage = getPercentage(
            subject.attended,
            subject.total
        );

        return (
            Number(subject.total) > 0 &&
            percentage < 75
        );
    });

    return (
        <div className="analytics-page">

            {/* HEADER */}

            <div className="analytics-header">
                <div>
                    <h1>Analytics</h1>

                    <p>
                        Track and understand your attendance performance.
                    </p>
                </div>
            </div>


            {/* SUMMARY */}

            <div className="analytics-summary">

                <div className="analytics-summary-card">
                    <div className="analytics-card-icon">
                        📊
                    </div>

                    <div>
                        <span>Overall Attendance</span>

                        <strong>
                            {overallPercentage}%
                        </strong>
                    </div>
                </div>


                <div className="analytics-summary-card">
                    <div className="analytics-card-icon">
                        ✓
                    </div>

                    <div>
                        <span>Classes Attended</span>

                        <strong>
                            {totalAttended}
                        </strong>
                    </div>
                </div>


                <div className="analytics-summary-card">
                    <div className="analytics-card-icon">
                        📚
                    </div>

                    <div>
                        <span>Total Classes</span>

                        <strong>
                            {totalClasses}
                        </strong>
                    </div>
                </div>


                <div className="analytics-summary-card">
                    <div className="analytics-card-icon">
                        🏆
                    </div>

                    <div>
                        <span>Best Subject</span>

                        <strong>
                            {bestSubject
                                ? bestSubject.code
                                : "—"}
                        </strong>
                    </div>
                </div>

            </div>


            {/* MAIN CONTENT */}

            <div className="analytics-content">

                {/* SUBJECT PERFORMANCE */}

                <div className="analytics-panel">

                    <div className="analytics-panel-header">

                        <h2>
                            Subject Performance
                        </h2>

                        <p>
                            Attendance percentage for each subject
                        </p>

                    </div>


                    <div className="analytics-subject-list">

                        {subjects.map((subject) => {

                            const attended =
                                Number(subject.attended) || 0;

                            const total =
                                Number(subject.total) || 0;

                            const percentage =
                                getPercentage(
                                    attended,
                                    total
                                );

                            return (
                                <div
                                    className="analytics-subject"
                                    key={subject.id}
                                >

                                    <div className="analytics-subject-top">

                                        <div>
                                            <strong>
                                                {subject.code}
                                            </strong>

                                            <span>
                                                {attended} / {total} classes
                                            </span>
                                        </div>

                                        <b>
                                            {percentage}%
                                        </b>

                                    </div>


                                    <div className="analytics-progress">

                                        <div
                                            className={
                                                percentage < 75
                                                    ? "analytics-progress-fill low"
                                                    : "analytics-progress-fill"
                                            }
                                            style={{
                                                width: `${percentage}%`
                                            }}
                                        />

                                    </div>

                                </div>
                            );

                        })}

                    </div>

                </div>


                {/* BAR CHART */}

                <div className="analytics-panel">

                    <div className="analytics-panel-header">

                        <h2>
                            Attendance Comparison
                        </h2>

                        <p>
                            Compare attendance across subjects
                        </p>

                    </div>


                    <div className="analytics-chart">

                        {subjects.map((subject) => {

                            const percentage =
                                getPercentage(
                                    Number(subject.attended) || 0,
                                    Number(subject.total) || 0
                                );

                            return (
                                <div
                                    className="chart-column"
                                    key={subject.id}
                                >

                                    <div className="chart-value">
                                        {percentage}%
                                    </div>


                                    <div className="chart-bar-container">

                                        <div
                                            className={
                                                percentage < 75
                                                    ? "chart-bar low"
                                                    : "chart-bar"
                                            }
                                            style={{
                                                height: `${Math.max(
                                                    percentage,
                                                    2
                                                )}%`
                                            }}
                                        />

                                    </div>


                                    <span>
                                        {subject.code}
                                    </span>

                                </div>
                            );

                        })}

                    </div>

                </div>

            </div>


            {/* ATTENTION NEEDED */}

            <div className="analytics-bottom">

                <div className="analytics-attention-panel">

                    <div className="analytics-panel-header">

                        <h2>
                            Attention Needed
                        </h2>

                        <p>
                            Subjects below 75% attendance
                        </p>

                    </div>


                    {lowAttendanceSubjects.length === 0 ? (

                        <div className="analytics-success">

                            <span>
                                ✓
                            </span>

                            <div>

                                <strong>
                                    Everything looks good!
                                </strong>

                                <p>
                                    No subject is currently below 75%.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="analytics-warning-list">

                            {lowAttendanceSubjects.map(
                                (subject) => {

                                    const percentage =
                                        getPercentage(
                                            Number(subject.attended) || 0,
                                            Number(subject.total) || 0
                                        );

                                    return (
                                        <div
                                            className="analytics-warning-item"
                                            key={subject.id}
                                        >

                                            <div>

                                                <strong>
                                                    {subject.code}
                                                </strong>

                                                <span>
                                                    Attendance needs improvement
                                                </span>

                                            </div>

                                            <b>
                                                {percentage}%
                                            </b>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Analytics;