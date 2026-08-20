// ============================================
// DATE HELPERS
// ============================================

export function getLocalDateString(date = new Date()) {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function getDayName(date = new Date()) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long"
        }
    );

}


// ============================================
// GET TODAY'S CLASSES
// ============================================

export function getClassesForDate(
    date,
    timetable,
    specialClasses
) {

    const dayName = getDayName(date);

    const dateString = getLocalDateString(date);


    // ========================================
    // SPECIAL DATE CLASSES
    //
    // These override the normal timetable.
    // Mainly useful for Saturday.
    // ========================================

    if (
        specialClasses &&
        specialClasses[dateString]
    ) {

        return specialClasses[dateString];

    }


    // ========================================
    // NORMAL WEEKLY TIMETABLE
    // ========================================

    if (
        timetable &&
        timetable[dayName]
    ) {

        return timetable[dayName];

    }


    return [];

}


// ============================================
// IS SATURDAY?
// ============================================

export function isSaturday(date = new Date()) {

    return date.getDay() === 6;

}


// ============================================
// IS HOLIDAY?
// ============================================

export function isHoliday(
    date,
    timetable,
    specialClasses
) {

    const classes = getClassesForDate(
        date,
        timetable,
        specialClasses
    );


    return classes.length === 0;

}


// ============================================
// GET ALL SUBJECT NAMES
//
// This makes sure a subject added to a
// Saturday timetable also becomes part of
// the subject list.
// ============================================

export function getAllSubjects(
    timetable,
    specialClasses
) {

    const subjects = new Set();


    // Weekly timetable

    Object.values(timetable || {}).forEach(
        (dayClasses) => {

            dayClasses.forEach((item) => {

                subjects.add(item.subject);

            });

        }
    );


    // Special classes

    Object.values(
        specialClasses || {}
    ).forEach((dayClasses) => {

        dayClasses.forEach((item) => {

            subjects.add(item.subject);

        });

    });


    return Array.from(subjects);

}