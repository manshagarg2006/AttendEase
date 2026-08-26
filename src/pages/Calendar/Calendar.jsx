import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import "./Calendar.css";

function Calendar() {

    const today = new Date();

    const [currentDate, setCurrentDate] = useState(
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        )
    );

    const [selectedDate, setSelectedDate] = useState(
        today
    );

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    /* ==============================
       GET DAYS IN CURRENT MONTH
    ============================== */

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(year, month, 1).getDay();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    /* ==============================
       PREVIOUS MONTH
    ============================== */

    const previousMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month - 1,
                1
            )
        );
    };


    /* ==============================
       NEXT MONTH
    ============================== */

    const nextMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month + 1,
                1
            )
        );
    };


    /* ==============================
       TODAY
    ============================== */

    const goToToday = () => {

        const now = new Date();

        setCurrentDate(
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            )
        );

        setSelectedDate(now);
    };


    /* ==============================
       DATE HELPERS
    ============================== */

    const isToday = (day) => {

        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };


    const isSelected = (day) => {

        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year
        );
    };


    /* ==============================
       SELECT DATE
    ============================== */

    const selectDate = (day) => {

        setSelectedDate(
            new Date(
                year,
                month,
                day
            )
        );
    };


    /* ==============================
       CREATE CALENDAR CELLS
    ============================== */

    const calendarDays = [];

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {
        calendarDays.push(
            <div
                key={`empty-${i}`}
                className="calendar-day empty"
            />
        );
    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        calendarDays.push(

            <button
                key={day}
                type="button"
                className={`
                    calendar-day
                    ${isToday(day) ? "today" : ""}
                    ${isSelected(day) ? "selected" : ""}
                `}
                onClick={() =>
                    selectDate(day)
                }
            >

                <span className="day-number">
                    {day}
                </span>

                {isToday(day) && (
                    <span className="today-dot" />
                )}

            </button>
        );
    }


    return (

        <div className="calendar-page">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="calendar-header">

                <div>

                    <div className="calendar-title-row">

                        <div className="calendar-title-icon">
                            <CalendarDays size={24} />
                        </div>

                        <div>

                            <h1>
                                Calendar
                            </h1>

                            <p>
                                Keep track of your classes and schedule.
                            </p>

                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    className="calendar-today-button"
                    onClick={goToToday}
                >
                    Today
                </button>

            </div>


            {/* ==============================
                CALENDAR CARD
            ============================== */}

            <div className="calendar-card">

                {/* MONTH HEADER */}

                <div className="calendar-navigation">

                    <button
                        type="button"
                        className="calendar-nav-button"
                        onClick={previousMonth}
                    >
                        <ChevronLeft size={22} />
                    </button>


                    <h2>
                        {monthNames[month]} {year}
                    </h2>


                    <button
                        type="button"
                        className="calendar-nav-button"
                        onClick={nextMonth}
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>


                {/* DAY NAMES */}

                <div className="calendar-weekdays">

                    {dayNames.map(
                        (day) => (

                            <div
                                key={day}
                                className="calendar-weekday"
                            >
                                {day}
                            </div>

                        )
                    )}

                </div>


                {/* DAYS */}

                <div className="calendar-grid">

                    {calendarDays}

                </div>

            </div>


            {/* ==============================
                SELECTED DATE
            ============================== */}

            <div className="selected-date-card">

                <h2>
                    {selectedDate.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }
                    )}
                </h2>

                <p>
                    Your classes and schedule for this day will appear here.
                </p>

            </div>

        </div>
    );
}

export default Calendar;