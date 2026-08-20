// ============================================
// TIMETABLE DATA
// ============================================

const DEFAULT_TIMETABLE = {

    Monday: [
        {
            id: "mon-1",
            subject: "Front End Engineering",
            startTime: "09:00 AM",
            endTime: "11:00 AM"
        },
        {
            id: "mon-2",
            subject: "DBMS",
            startTime: "11:00 AM",
            endTime: "01:00 PM"
        },
        {
            id: "mon-3",
            subject: "AI Algorithms",
            startTime: "02:00 PM",
            endTime: "04:00 PM"
        }
    ],

    Tuesday: [
        {
            id: "tue-1",
            subject: "Operating System",
            startTime: "09:00 AM",
            endTime: "11:00 AM"
        },
        {
            id: "tue-2",
            subject: "DBMS",
            startTime: "11:00 AM",
            endTime: "01:00 PM"
        }
    ],

    Wednesday: [
        {
            id: "wed-1",
            subject: "AI Algorithms",
            startTime: "09:00 AM",
            endTime: "11:00 AM"
        },
        {
            id: "wed-2",
            subject: "Front End Engineering",
            startTime: "02:00 PM",
            endTime: "04:00 PM"
        }
    ],

    Thursday: [
        {
            id: "thu-1",
            subject: "Operating System",
            startTime: "09:00 AM",
            endTime: "11:00 AM"
        },
        {
            id: "thu-2",
            subject: "Front End Engineering",
            startTime: "11:00 AM",
            endTime: "01:00 PM"
        }
    ],

    Friday: [
        {
            id: "fri-1",
            subject: "DBMS",
            startTime: "09:00 AM",
            endTime: "11:00 AM"
        },
        {
            id: "fri-2",
            subject: "AI Algorithms",
            startTime: "02:00 PM",
            endTime: "04:00 PM"
        }
    ],

    Saturday: [],

    Sunday: []
};


// ============================================
// DATE-SPECIFIC CLASSES
//
// Used mainly for Saturday special classes.
// Example:
//
// {
//     "2026-08-22": [
//         {
//             id: "sat-1",
//             subject: "AI Algorithms",
//             startTime: "10:00 AM",
//             endTime: "12:00 PM"
//         }
//     ]
// }
//
// ============================================

const DEFAULT_SPECIAL_CLASSES = {};


export {
    DEFAULT_TIMETABLE,
    DEFAULT_SPECIAL_CLASSES
};