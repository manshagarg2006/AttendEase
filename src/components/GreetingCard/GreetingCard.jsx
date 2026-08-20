import "./GreetingCard.css";
import { Bell, UserCircle2 } from "lucide-react";

function GreetingCard() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if(hour < 12){
        greeting = "Good Morning";
    }
    else if(hour < 17){
        greeting = "Good Afternoon";
    }

    return(

        <div className="greeting-card">

            <div>

                <h1>{greeting} 👋</h1>

                <p>
                    Stay above 80% attendance and plan your semester smartly.
                </p>

            </div>

            <div className="top-icons">

                <Bell size={24}/>

                <UserCircle2 size={38}/>

            </div>

        </div>

    )

}

export default GreetingCard;