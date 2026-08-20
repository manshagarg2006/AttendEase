import "./AttentionCard.css";


function AttentionCard({ subjects }) {


    const getSafeClasses = (attended, total) => {

        let safeClasses = 0;

        let futureTotal = total;


        while (
            attended / (futureTotal + 2) >= 0.75
        ) {

            safeClasses++;

            futureTotal += 2;

        }


        return safeClasses;
    };


    const getMessage = (attended, total) => {

        const percentage =
            (attended / total) * 100;


        const safeClasses =
            getSafeClasses(attended, total);


        if (percentage <= 75) {

            return "Attend your next class";

        }


        if (safeClasses === 1) {

            return "Only 1 safe class left";

        }


        return `Can miss ${safeClasses} more classes`;

    };


    const aiAlgorithms = subjects.find(
        (subject) =>
            subject.name === "AI Algorithms"
    );


    const dbms = subjects.find(
        (subject) =>
            subject.name === "DBMS"
    );


    return (

        <div className="attention-card">


            <h2>
                ⚠ Attention Needed
            </h2>


            {aiAlgorithms && (

                <div className="attention-item critical">

                    <h3>
                        AI Algorithms
                    </h3>


                    <p>
                        Current Attendance:{" "}
                        {Math.round(
                            (aiAlgorithms.attended /
                                aiAlgorithms.total) *
                                100
                        )}%
                    </p>


                    <p>
                        {getMessage(
                            aiAlgorithms.attended,
                            aiAlgorithms.total
                        )}
                    </p>

                </div>

            )}


            {dbms && (

                <div className="attention-item warning">

                    <h3>
                        DBMS
                    </h3>


                    <p>
                        Current Attendance:{" "}
                        {Math.round(
                            (dbms.attended /
                                dbms.total) *
                                100
                        )}%
                    </p>


                    <p>
                        {getMessage(
                            dbms.attended,
                            dbms.total
                        )}
                    </p>

                </div>

            )}

        </div>

    );
}


export default AttentionCard;