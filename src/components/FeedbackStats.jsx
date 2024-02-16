import { useContext } from "react";
import FeedbackContext from "./context/FeedbackContext";

function FeedbackStats() {
   const {feedback} = useContext(FeedbackContext);

   const average = feedback.reduce((acc, cur) => {
      return acc + cur.rating
   }, 0) / feedback.length;

   const formattedAverage = average % 1 !== 0 ? average.toFixed(1) : average.toFixed(0);

   return (
      <div className="feedback-stats">
         <h4>{feedback.length}</h4>
         <h4>Average Rating: {isNaN(average) ? 0 : formattedAverage}</h4>
      </div>
   );
};
export default FeedbackStats;