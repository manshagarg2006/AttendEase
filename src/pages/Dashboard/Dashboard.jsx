import { useState } from "react";

import DashboardHeader from "./DashboardHeader/DashboardHeader";

import SubjectHealth from "../../components/SubjectHealth/SubjectHealth";
import TodayClasses from "../../components/TodayClasses/TodayClasses";
import AttentionCard from "../../components/AttentionCard/AttentionCard";
import PlannerCard from "../../components/PlannerCard/PlannerCard";

import "./Dashboard.css";


/* ==========================================
   GET TODAY'S DAY NAME
========================================== */

function getTodayName() {
    return new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long"
        }
    );
}


/* ==========================================
   GET TODAY'S DATE KEY
========================================== */

function getTodayKey() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* ==========================================
   GET TODAY'S CLASSES
========================================== */

function getTodayClasses() {

    const saved =
        localStorage.getItem(
            "attendEaseTimetable"
        );

    if (!saved) {
        return [];
    }

    try {

        const timetable =
            JSON.parse(saved);

        const today =
            getTodayName();

        const todayData =
            timetable[today] || {};

        const times = {
            "1": "09:00 AM - 11:00 AM",
            "2": "11:00 AM - 01:00 PM",
            "3": "02:00 PM - 04:00 PM"
        };

        return Object.entries(todayData)
            .map(([slotId, data]) => {

                if (!data) {
                    return null;
                }

                return {
                    id: `${today}_${slotId}`,

                    subject:
                        data.subject || "",

                    type:
                        data.type || "lecture",

                    attendanceSubject:
                        data.attendanceSubject ||
                        data.subject ||
                        "",

                    time:
                        times[slotId] || ""
                };

            })
            .filter(Boolean)
            .sort(
                (a, b) =>
                    Number(
                        a.id.split("_")[1]
                    ) -
                    Number(
                        b.id.split("_")[1]
                    )
            );

    } catch (error) {

        console.error(
            "Unable to read timetable:",
            error
        );

        return [];
    }
}


/* ==========================================
   CLEAN SUBJECT NAME
========================================== */

function cleanSubjectName(name) {

    if (!name) {
        return "";
    }

    let cleaned =
        name.trim();

    cleaned =
        cleaned
            .replace(/\s+LAB$/i, "")
            .replace(/\s+LABORATORY$/i, "")
            .trim();

    return cleaned;
}
/* ==========================================
   GET SUBJECTS FROM TIMETABLE
========================================== */

function getSubjectsFromTimetable() {

    const saved =
        localStorage.getItem(
            "attendEaseTimetable"
        );

    if (!saved) {
        return [];
    }

    try {

        const timetable =
            JSON.parse(saved);

        const subjectMap = {};

        Object.values(timetable).forEach(
            (day) => {

                Object.values(day || {}).forEach(
                    (classData) => {

                        if (!classData) {
                            return;
                        }

                        let attendanceSubject =
                            classData.attendanceSubject ||
                            classData.subject ||
                            "";

                        attendanceSubject =
                            cleanSubjectName(
                                attendanceSubject
                            );

                        if (!attendanceSubject) {
                            return;
                        }

                        if (
                            !subjectMap[
                                attendanceSubject
                            ]
                        ) {

                            subjectMap[
                                attendanceSubject
                            ] = {

                                id:
                                    Object.keys(
                                        subjectMap
                                    ).length + 1,

                                name:
                                    attendanceSubject,

                                attended: 0,

                                total: 0
                            };
                        }

                    }
                );
            }
        );

        return Object.values(
            subjectMap
        );

    } catch (error) {

        console.error(
            "Unable to read timetable:",
            error
        );

        return [];
    }
}


/* ==========================================
   DASHBOARD
========================================== */

function Dashboard() {

    /* ==========================================
       SUBJECTS
    ========================================== */

    const [subjects, setSubjects] =
        useState(() => {

            const timetableSubjects =
                getSubjectsFromTimetable();

            const saved =
                localStorage.getItem(
                    "attendEaseSubjects"
                );

            if (!saved) {
                return timetableSubjects;
            }

            try {

                const savedSubjects =
                    JSON.parse(saved);

                return timetableSubjects.map(
                    (timetableSubject) => {

                        const savedSubject =
                            savedSubjects.find(
                                (subject) =>
                                    subject.name ===
                                    timetableSubject.name
                            );

                        if (savedSubject) {

                            return {
                                ...timetableSubject,

                                attended:
                                    Number(
                                        savedSubject.attended
                                    ),

                                total:
                                    Number(
                                        savedSubject.total
                                    )
                            };
                        }

                        return {
                            ...timetableSubject,

                            attended: 0,

                            total: 0
                        };
                    }
                );

            } catch (error) {

                console.error(
                    "Unable to load saved attendance:",
                    error
                );

                return timetableSubjects;
            }
        });


    /* ==========================================
       TODAY'S CLASSES
    ========================================== */

    const todayClasses =
        getTodayClasses();


    /* ==========================================
       TODAY'S ATTENDANCE STATUS
    ========================================== */

    const [
        attendanceStatus,
        setAttendanceStatus
    ] = useState(() => {

        const saved =
            localStorage.getItem(
                "attendEaseDailyAttendance"
            );

        if (!saved) {
            return {};
        }

        try {

            const allAttendance =
                JSON.parse(saved);

            const today =
                getTodayKey();

            return allAttendance[today] || {};

        } catch (error) {

            console.error(
                "Unable to load today's attendance:",
                error
            );

            return {};
        }
    });


    /* ==========================================
       EDIT ATTENDANCE PANEL
    ========================================== */

    const [
        editingAttendance,
        setEditingAttendance
    ] = useState(false);

    const [
        editValues,
        setEditValues
    ] = useState(subjects);


    /* ==========================================
       OPEN ATTENDANCE EDITOR
    ========================================== */

    const openAttendanceEditor = () => {

        const timetableSubjects =
            getSubjectsFromTimetable();

        const mergedSubjects =
            timetableSubjects.map(
                (timetableSubject) => {

                    const existing =
                        subjects.find(
                            (subject) =>
                                subject.name ===
                                timetableSubject.name
                        );

                    if (existing) {
                        return existing;
                    }

                    return timetableSubject;
                }
            );

        setSubjects(
            mergedSubjects
        );

        setEditValues(
            mergedSubjects
        );

        setEditingAttendance(true);
    };


    /* ==========================================
       EDIT INPUT
    ========================================== */

    const changeEditValue = (
        id,
        field,
        value
    ) => {

        setEditValues(
            (current) =>
                current.map(
                    (subject) =>
                        subject.id === id
                            ? {
                                ...subject,

                                [field]:
                                    value
                            }
                            : subject
                )
        );
    };
    /* ==========================================
       SAVE MANUAL ATTENDANCE
    ========================================== */

    const saveAttendanceEdit = () => {

        const updatedSubjects =
            editValues.map(
                (subject) => ({

                    ...subject,

                    attended:
                        Number(
                            subject.attended
                        ),

                    total:
                        Number(
                            subject.total
                        )
                })
            );


        /* Validation */

        for (
            const subject
            of updatedSubjects
        ) {

            if (
                subject.attended < 0 ||
                subject.total < 0 ||
                subject.attended >
                subject.total
            ) {

                alert(
                    `Please enter valid attendance for ${subject.name}.`
                );

                return;
            }
        }


        /* Update React state */

        setSubjects(
            updatedSubjects
        );


        /* Save permanently */

        localStorage.setItem(
            "attendEaseSubjects",
            JSON.stringify(
                updatedSubjects
            )
        );


        /* Close editor */

        setEditingAttendance(false);
    };


    /* ==========================================
       UPDATE ATTENDANCE
    ========================================== */

    const updateAttendance = (
        classId,
        status
    ) => {

        const selectedClass =
            todayClasses.find(
                (item) =>
                    item.id === classId
            );

        if (!selectedClass) {
            return;
        }


        /* Get attendance subject */

        const attendanceSubject =
            cleanSubjectName(
                selectedClass.attendanceSubject
            );


        /* Check previous status */

        const previousStatus =
            attendanceStatus[classId];


        /* ======================================
           EDIT
        ====================================== */

        if (status === "edit") {

            if (!previousStatus) {
                return;
            }

            setSubjects(
                (currentSubjects) => {

                    const updated =
                        currentSubjects.map(
                            (subject) => {

                                if (
                                    subject.name !==
                                    attendanceSubject
                                ) {
                                    return subject;
                                }


                                /* PRESENT */

                                if (
                                    previousStatus ===
                                    "present"
                                ) {

                                    return {
                                        ...subject,

                                        attended:
                                            Math.max(
                                                0,
                                                subject.attended -
                                                2
                                            ),

                                        total:
                                            Math.max(
                                                0,
                                                subject.total -
                                                2
                                            )
                                    };
                                }


                                /* ABSENT */

                                if (
                                    previousStatus ===
                                    "absent"
                                ) {

                                    return {
                                        ...subject,

                                        total:
                                            Math.max(
                                                0,
                                                subject.total -
                                                2
                                            )
                                    };
                                }

                                return subject;
                            }
                        );


                    /* Save after editing */

                    localStorage.setItem(
                        "attendEaseSubjects",
                        JSON.stringify(
                            updated
                        )
                    );

                    return updated;
                }
            );


            /* Remove today's status */

            setAttendanceStatus(
                (current) => {

                    const updated = {
                        ...current
                    };

                    delete updated[classId];

                    return updated;
                }
            );

            return;
        }


        /* ======================================
           PREVENT DOUBLE MARKING
        ====================================== */

        if (previousStatus) {
            return;
        }


        /* ======================================
           UPDATE SUBJECT ATTENDANCE
        ====================================== */

        setSubjects(
            (currentSubjects) => {

                const updated =
                    currentSubjects.map(
                        (subject) => {

                            if (
                                subject.name !==
                                attendanceSubject
                            ) {
                                return subject;
                            }


                            /* PRESENT */

                            if (
                                status ===
                                "present"
                            ) {

                                return {
                                    ...subject,

                                    attended:
                                        subject.attended +
                                        2,

                                    total:
                                        subject.total +
                                        2
                                };
                            }


                            /* ABSENT */

                            if (
                                status ===
                                "absent"
                            ) {

                                return {
                                    ...subject,

                                    total:
                                        subject.total +
                                        2
                                };
                            }

                            return subject;
                        }
                    );


                /* Save attendance */

                localStorage.setItem(
                    "attendEaseSubjects",
                    JSON.stringify(
                        updated
                    )
                );

                return updated;
            }
        );


        /* ======================================
           SAVE TODAY'S STATUS
        ====================================== */

        setAttendanceStatus(
            (current) => ({

                ...current,

                [classId]:
                    status
            })
        );
    };


    /* ==========================================
       DASHBOARD UI
    ========================================== */

    return (

        <div className="dashboard-page">

            <DashboardHeader
                onEditAttendance={
                    openAttendanceEditor
                }
            />


            {/* ==================================
                EDIT ATTENDANCE
            ================================== */}

            {editingAttendance && (

                <div className="attendance-edit-panel">

                    <div className="attendance-edit-header">

                        <div>

                            <h2>
                                Edit Attendance
                            </h2>

                            <p>
                                Enter your current
                                attendance from college.
                            </p>

                        </div>

                        <button
                            className="attendance-close-button"
                            onClick={() =>
                                setEditingAttendance(
                                    false
                                )
                            }
                        >
                            ×
                        </button>

                    </div>


                    <div className="attendance-edit-list">

                        {editValues.map(
                            (subject) => (

                                <div
                                    className="attendance-edit-row"
                                    key={subject.id}
                                >

                                    <span>
                                        {
                                            subject.name
                                        }
                                    </span>


                                    <div className="attendance-edit-inputs">

                                        <input
                                            type="number"
                                            min="0"
                                            value={
                                                subject.attended
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                changeEditValue(
                                                    subject.id,
                                                    "attended",
                                                    event.target.value
                                                )
                                            }
                                        />

                                        <b>
                                            /
                                        </b>

                                        <input
                                            type="number"
                                            min="0"
                                            value={
                                                subject.total
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                changeEditValue(
                                                    subject.id,
                                                    "total",
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>
                            )
                        )}

                    </div>


                    <div className="attendance-edit-actions">

                        <button
                            className="attendance-cancel-button"
                            onClick={() =>
                                setEditingAttendance(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            className="attendance-save-button"
                            onClick={
                                saveAttendanceEdit
                            }
                        >
                            Save Changes
                        </button>

                    </div>

                </div>
            )}
            {/* ==================================
                DASHBOARD GRID
            ================================== */}

            <div className="dashboard-grid">


                {/* LEFT */}

                <div className="dashboard-left">

                    <SubjectHealth
                        subjects={
                            subjects
                        }
                    />


                    <TodayClasses
                        todayClasses={
                            todayClasses
                        }

                        attendanceStatus={
                            attendanceStatus
                        }

                        onAttendanceChange={
                            updateAttendance
                        }
                    />

                </div>


                {/* RIGHT */}

                <div className="dashboard-right">

                    <AttentionCard
                        subjects={
                            subjects
                        }
                    />


                    <PlannerCard
                        subjects={
                            subjects
                        }
                    />

                </div>

            </div>

        </div>
    );
}


export default Dashboard;