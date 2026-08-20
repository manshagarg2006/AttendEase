import { useState } from "react";
import "./Timetable.css";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const TIME_SLOTS = [
    {
        id: "1",
        time: "09:00 AM - 11:00 AM"
    },
    {
        id: "2",
        time: "11:00 AM - 01:00 PM"
    },
    {
        id: "3",
        time: "02:00 PM - 04:00 PM"
    }
];

const EMPTY_TIMETABLE = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {}
};


function Timetable() {

    const [timetable, setTimetable] = useState(() => {

        const saved = localStorage.getItem(
            "attendEaseTimetable"
        );

        if (!saved) {
            return EMPTY_TIMETABLE;
        }

        try {
            return JSON.parse(saved);
        } catch {
            return EMPTY_TIMETABLE;
        }
    });


    const [selectedDay, setSelectedDay] =
        useState("Monday");


    const [editingSlot, setEditingSlot] =
        useState(null);


    const [formData, setFormData] = useState({
        subject: "",
        type: "lecture",
        attendanceSubject: ""
    });


    // ==========================================
    // OPEN ADD / EDIT
    // ==========================================

    const openSlot = (slotId) => {

        const existing =
            timetable[selectedDay]?.[slotId];


        if (existing) {

            setFormData({
                subject: existing.subject || "",
                type: existing.type || "lecture",
                attendanceSubject:
                    existing.attendanceSubject ||
                    existing.subject ||
                    ""
            });

        } else {

            setFormData({
                subject: "",
                type: "lecture",
                attendanceSubject: ""
            });
        }


        setEditingSlot(slotId);
    };


    // ==========================================
    // SAVE CLASS
    // ==========================================

    const handleSaveClass = () => {

        if (!formData.subject.trim()) {

            alert("Please enter a subject.");

            return;
        }


        let attendanceSubject =
            formData.attendanceSubject.trim();


        /*
         * For a normal lecture:
         * attendance subject = subject
         *
         * For a lab:
         * attendance subject can be the parent subject.
         *
         * Example:
         * subject = SDE Lab
         * attendanceSubject = SDE
         */

        if (!attendanceSubject) {

            attendanceSubject =
                formData.subject.trim();
        }


        const updatedTimetable = {

            ...timetable,

            [selectedDay]: {

                ...timetable[selectedDay],

                [editingSlot]: {

                    subject:
                        formData.subject.trim(),

                    type:
                        formData.type,

                    attendanceSubject:
                        attendanceSubject
                }
            }
        };


        setTimetable(updatedTimetable);


        localStorage.setItem(
            "attendEaseTimetable",
            JSON.stringify(updatedTimetable)
        );


        setEditingSlot(null);
    };


    // ==========================================
    // DELETE CLASS
    // ==========================================

    const handleDeleteClass = () => {

        const updatedDay = {
            ...timetable[selectedDay]
        };


        delete updatedDay[editingSlot];


        const updatedTimetable = {

            ...timetable,

            [selectedDay]: updatedDay
        };


        setTimetable(updatedTimetable);


        localStorage.setItem(
            "attendEaseTimetable",
            JSON.stringify(updatedTimetable)
        );


        setEditingSlot(null);
    };


    // ==========================================
    // CHECK HOLIDAY
    // ==========================================

    const classesToday =
        Object.keys(
            timetable[selectedDay] || {}
        ).length;


    return (

        <div className="timetable-page">

            <div className="timetable-header">

                <div>

                    <p className="timetable-label">
                        SEMESTER SCHEDULE
                    </p>

                    <h1>
                        Timetable
                    </h1>

                    <p>
                        Manage your weekly classes and
                        keep your attendance schedule accurate.
                    </p>

                </div>

            </div>


            {/* DAY SELECTOR */}

            <div className="day-selector">

                {DAYS.map((day) => (

                    <button
                        key={day}
                        className={
                            selectedDay === day
                                ? "day-button active"
                                : "day-button"
                        }
                        onClick={() =>
                            setSelectedDay(day)
                        }
                    >
                        {day}
                    </button>

                ))}

            </div>


            {/* TIMETABLE */}

            <div className="timetable-card">

                <div className="selected-day-header">

                    <div>

                        <h2>
                            {selectedDay}
                        </h2>

                        <p>
                            {classesToday === 0
                                ? "Holiday / No classes scheduled"
                                : `${classesToday} ${
                                    classesToday === 1
                                        ? "class"
                                        : "classes"
                                } scheduled`
                            }
                        </p>

                    </div>

                </div>


                {TIME_SLOTS.map((slot) => {

                    const classData =
                        timetable[selectedDay]?.[
                            slot.id
                        ];


                    return (

                        <div
                            className="timetable-slot"
                            key={slot.id}
                        >

                            <div className="slot-time">
                                {slot.time}
                            </div>


                            {classData ? (

                                <div className="scheduled-class">

                                    <div>

                                        <div className="class-title-row">

                                            <h3>
                                                {
                                                    classData.subject
                                                }
                                            </h3>

                                            {classData.type ===
                                                "lab" && (

                                                <span className="lab-badge">
                                                    LAB
                                                </span>

                                            )}

                                        </div>


                                        {classData.type ===
                                            "lab" && (

                                            <p className="attendance-parent">
                                                Attendance counted under:{" "}
                                                <strong>
                                                    {
                                                        classData.attendanceSubject
                                                    }
                                                </strong>
                                            </p>

                                        )}

                                    </div>


                                    <button
                                        className="edit-slot-button"
                                        onClick={() =>
                                            openSlot(
                                                slot.id
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                </div>

                            ) : (

                                <button
                                    className="add-class-button"
                                    onClick={() =>
                                        openSlot(
                                            slot.id
                                        )
                                    }
                                >
                                    + Add Class
                                </button>

                            )}

                        </div>

                    );

                })}

            </div>


            {/* LUNCH */}

            <div className="lunch-card">

                <span className="lunch-icon">
                    🍱
                </span>

                <div>

                    <strong>
                        Lunch Break
                    </strong>

                    <span>
                        01:00 PM - 02:00 PM
                    </span>

                </div>

            </div>


            {/* EDIT MODAL */}

            {editingSlot && (

                <div className="timetable-overlay">

                    <div className="timetable-modal">

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {timetable[
                                        selectedDay
                                    ]?.[editingSlot]
                                        ? "Edit Class"
                                        : "Add Class"}
                                </h2>

                                <p>
                                    {
                                        TIME_SLOTS.find(
                                            (slot) =>
                                                slot.id ===
                                                editingSlot
                                        )?.time
                                    }
                                </p>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() =>
                                    setEditingSlot(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <label>
                            Class / Lab Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. SDE Lab"
                            value={
                                formData.subject
                            }
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    subject:
                                        event.target.value
                                })
                            }
                        />


                        <label>
                            Type
                        </label>

                        <select
                            value={
                                formData.type
                            }
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    type:
                                        event.target.value
                                })
                            }
                        >

                            <option value="lecture">
                                Lecture
                            </option>

                            <option value="lab">
                                Lab
                            </option>

                        </select>


                        {formData.type === "lab" && (

                            <>

                                <label>
                                    Count Lab Attendance Under
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. SDE"
                                    value={
                                        formData.attendanceSubject
                                    }
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            attendanceSubject:
                                                event.target.value
                                        })
                                    }
                                />

                                <p className="modal-help">
                                    Example: SDE Lab → SDE
                                    attendance.
                                </p>

                            </>

                        )}


                        <div className="modal-actions">

                            {timetable[
                                selectedDay
                            ]?.[editingSlot] && (

                                <button
                                    className="delete-class-button"
                                    onClick={
                                        handleDeleteClass
                                    }
                                >
                                    Delete
                                </button>

                            )}


                            <button
                                className="cancel-class-button"
                                onClick={() =>
                                    setEditingSlot(null)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="save-class-button"
                                onClick={
                                    handleSaveClass
                                }
                            >
                                Save Class
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


export default Timetable;