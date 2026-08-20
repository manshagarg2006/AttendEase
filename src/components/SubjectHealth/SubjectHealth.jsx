import "./SubjectHealth.css";

function SubjectHealth({ subjects }) {

    const getPercentage = (attended, total) => {

        if (!total || total <= 0) {
            return 0;
        }

        return ((attended / total) * 100).toFixed(1);
    };


    const getStatus = (percentage) => {

        if (percentage >= 85) {
            return {
                text: "Can miss more classes",
                className: "safe"
            };
        }

        if (percentage >= 75) {
            return {
                text: "Only 1 safe leave left",
                className: "warning"
            };
        }

        return {
            text: "Attend your next class",
            className: "danger"
        };
    };


    return (

        <div className="subject-health">

            <div className="subject-health-header">

                <div>
                    <h2>
                        Subject Health
                    </h2>

                    <p>
                        Track each subject individually
                    </p>
                </div>

            </div>


            <div className="subject-list">

                {subjects.length === 0 ? (

                    <div className="empty-subjects">
                        No subjects found in your timetable.
                    </div>

                ) : (

                    subjects.map((subject) => {

                        const percentage =
                            Number(
                                getPercentage(
                                    subject.attended,
                                    subject.total
                                )
                            );


                        const status =
                            getStatus(percentage);


                        return (

                            <div
                                className="subject-card"
                                key={subject.id}
                            >

                                <div className="subject-top">

                                    <h3>
                                        {subject.name}
                                    </h3>

                                    <strong>
                                        {percentage}%
                                    </strong>

                                </div>


                                <div className="progress-background">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width:
                                                `${Math.min(
                                                    percentage,
                                                    100
                                                )}%`
                                        }}
                                    />

                                </div>


                                <div className="subject-bottom">

                                    <span>
                                        {subject.attended} /{" "}
                                        {subject.total} Classes
                                    </span>


                                    <span
                                        className={
                                            `subject-status ${status.className}`
                                        }
                                    >

                                        <span className="status-dot">
                                            ●
                                        </span>

                                        {status.text}

                                    </span>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    );
}


export default SubjectHealth;