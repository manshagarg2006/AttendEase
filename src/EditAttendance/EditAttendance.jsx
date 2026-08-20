import { useState } from "react";
import "./EditAttendance.css";

function EditAttendance({ subjects, onSave, onClose }) {

    const [values, setValues] = useState(subjects);

    const handleChange = (id, field, value) => {

        setValues((current) =>
            current.map((subject) =>
                subject.id === id
                    ? {
                        ...subject,
                        [field]: value
                    }
                    : subject
            )
        );
    };

    const handleSave = () => {

        const updatedSubjects = values.map((subject) => ({
            ...subject,
            attended: Number(subject.attended),
            total: Number(subject.total)
        }));

        onSave(updatedSubjects);
    };

    return (
        <div className="edit-attendance-card">

            <div className="edit-attendance-header">

                <div>
                    <h2>Edit Attendance</h2>

                    <p>
                        Enter your current attendance from college.
                    </p>
                </div>

                <button
                    className="close-edit"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            <div className="edit-attendance-list">

                {values.map((subject) => (

                    <div
                        className="edit-attendance-row"
                        key={subject.id}
                    >

                        <span>
                            {subject.name}
                        </span>


                        <div className="edit-numbers">

                            <input
                                type="number"
                                min="0"
                                value={subject.attended}
                                onChange={(event) =>
                                    handleChange(
                                        subject.id,
                                        "attended",
                                        event.target.value
                                    )
                                }
                            />

                            <b>/</b>

                            <input
                                type="number"
                                min="1"
                                value={subject.total}
                                onChange={(event) =>
                                    handleChange(
                                        subject.id,
                                        "total",
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                ))}

            </div>


            <div className="edit-attendance-actions">

                <button
                    className="cancel-edit"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    className="save-edit"
                    onClick={handleSave}
                >
                    Save Changes
                </button>

            </div>

        </div>
    );
}

export default EditAttendance;