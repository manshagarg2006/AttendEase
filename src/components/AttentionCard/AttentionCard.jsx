import { AlertTriangle, CheckCircle } from "lucide-react";
import "./AttentionCard.css";

function AttentionCard({ subjects = [] }) {

    const minimumAttendance =
        Number(
            localStorage.getItem(
                "attendEaseMinimumAttendance"
            )
        ) || 75;


    const subjectsNeedingAttention =
        subjects.filter((subject) => {

            const attended =
                Number(subject.attended) || 0;

            const total =
                Number(subject.total) || 0;

            if (total === 0) {
                return false;
            }

            const percentage =
                (attended / total) * 100;

            return percentage < minimumAttendance;
        });


    const hasAttention =
        subjectsNeedingAttention.length > 0;


    return (

        <div
            className={
                hasAttention
                    ? "attention-card"
                    : "attention-card attention-good"
            }
        >

            <div className="attention-header">

                <div className="attention-icon">

                    {hasAttention ? (
                        <AlertTriangle size={24} />
                    ) : (
                        <CheckCircle size={24} />
                    )}

                </div>

                <div>

                    <h2>
                        {hasAttention
                            ? "Attention Needed"
                            : "All Good"}
                    </h2>

                    <p>
                        {hasAttention
                            ? "Some subjects need your attention."
                            : "Your attendance is on track."}
                    </p>

                </div>

            </div>


            {hasAttention && (

                <div className="attention-list">

                    {subjectsNeedingAttention.map(
                        (subject) => {

                            const attended =
                                Number(
                                    subject.attended
                                ) || 0;

                            const total =
                                Number(
                                    subject.total
                                ) || 0;

                            const percentage =
                                total > 0
                                    ? (
                                        attended /
                                        total
                                    ) * 100
                                    : 0;

                            return (

                                <div
                                    className="attention-item"
                                    key={subject.id}
                                >

                                    <div>

                                        <strong>
                                            {subject.name}
                                        </strong>

                                        <span>
                                            {percentage.toFixed(1)}%
                                            {" "}attendance
                                        </span>

                                    </div>

                                    <span className="attention-warning">
                                        Below {minimumAttendance}%
                                    </span>

                                </div>

                            );
                        }
                    )}

                </div>

            )}

        </div>
    );
}

export default AttentionCard;