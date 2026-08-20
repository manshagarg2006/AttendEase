import { useState } from "react";
import { CalendarDays, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import "./PlannerCard.css";

function PlannerCard({ subjects }) {

    const [plannerOpen, setPlannerOpen] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const toggleSubject = (subjectName) => {

        setSelectedSubjects((current) => {

            if (current.includes(subjectName)) {
                return current.filter((name) => name !== subjectName);
            }

            return [...current, subjectName];
        });
    };


    const getLeaveResult = (subject) => {

        const futureAttended = subject.attended;

        // Each class = 2 attendance points
        const futureTotal = subject.total + 2;

        const futurePercentage =
            (futureAttended / futureTotal) * 100;

        return futurePercentage;
    };


    const getStatus = (percentage) => {

        if (percentage >= 75) {
            return "safe";
        }

        if (percentage >= 70) {
            return "warning";
        }

        return "danger";
    };


    if (plannerOpen) {

        return (

            <div className="planner-card planner-open">

                <button
                    className="planner-back"
                    onClick={() => setPlannerOpen(false)}
                >
                    <ArrowLeft size={18} />
                    Back
                </button>


                <div className="planner-title">

                    <div className="planner-icon">
                        <CalendarDays size={24} />
                    </div>

                    <div>
                        <h2>Leave Planner</h2>

                        <p>
                            Select the classes you want to miss tomorrow.
                        </p>
                    </div>

                </div>


                <div className="planner-subjects">

                    {subjects.map((subject) => (

                        <label
                            className={
                                selectedSubjects.includes(subject.name)
                                    ? "planner-subject selected"
                                    : "planner-subject"
                            }
                            key={subject.id}
                        >

                            <input
                                type="checkbox"
                                checked={selectedSubjects.includes(subject.name)}
                                onChange={() =>
                                    toggleSubject(subject.name)
                                }
                            />

                            <div>

                                <strong>
                                    {subject.name}
                                </strong>

                                <span>
                                    Current:{" "}
                                    {Math.round(
                                        (subject.attended / subject.total) * 100
                                    )}
                                    %
                                </span>

                            </div>

                        </label>

                    ))}

                </div>


                {selectedSubjects.length > 0 && (

                    <div className="planner-results">

                        <h3>
                            Leave Analysis
                        </h3>


                        {subjects
                            .filter((subject) =>
                                selectedSubjects.includes(subject.name)
                            )
                            .map((subject) => {

                                const futurePercentage =
                                    getLeaveResult(subject);

                                const status =
                                    getStatus(futurePercentage);

                                return (

                                    <div
                                        className={`planner-result ${status}`}
                                        key={subject.id}
                                    >

                                        <div className="result-info">

                                            <strong>
                                                {subject.name}
                                            </strong>

                                            <span>
                                                After leave:{" "}
                                                {futurePercentage.toFixed(1)}%
                                            </span>

                                        </div>


                                        <div className="result-status">

                                            {status === "safe" && (
                                                <>
                                                    <CheckCircle2 size={18} />
                                                    Safe to take leave
                                                </>
                                            )}

                                            {status === "warning" && (
                                                <>
                                                    <AlertTriangle size={18} />
                                                    Close to 75%
                                                </>
                                            )}

                                            {status === "danger" && (
                                                <>
                                                    <AlertTriangle size={18} />
                                                    Leave not recommended
                                                </>
                                            )}

                                        </div>

                                    </div>

                                );

                            })}

                    </div>

                )}


                {selectedSubjects.length === 0 && (

                    <div className="planner-empty">

                        <CalendarDays size={20} />

                        <span>
                            Select at least one subject to see the leave analysis.
                        </span>

                    </div>

                )}

            </div>

        );
    }


    return (

        <div className="planner-card">

            <div>

                <div className="planner-icon">
                    <CalendarDays size={26} />
                </div>


                <div className="planner-content">

                    <h2>Leave Planner</h2>

                    <p>
                        Planning to take a leave? Check your attendance
                        before you decide.
                    </p>

                </div>

            </div>


            <button
                className="planner-button"
                onClick={() => setPlannerOpen(true)}
            >
                Open Planner
                <span>→</span>
            </button>

        </div>

    );
}

export default PlannerCard;