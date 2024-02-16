import { useState, useContext, useEffect } from 'react';
import FeedbackContext from './context/FeedbackContext';
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button';


function FeedbackForm() {
   const [text, setText] = useState('');
   const [rating, setRating] = useState(10);
   const [btnDesabled, setbtnDesabled] = useState(true);
   const [message, setMessage] = useState('');

   const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

   useEffect(() => {
      if(feedbackEdit.edit){
         setbtnDesabled(!feedbackEdit.edit);
         setText(feedbackEdit.item.text);
         setRating(feedbackEdit.item.rating);
      }
   },[feedbackEdit])

   const handleTextChange = (e) => {
      const text = e.target.value;

      if (text === '' || text.trim().length <= 10 & text !== '') {
         setbtnDesabled(true);
         setMessage(text === '' ? null : 'Text must be at leaset 10 characters');
      }else {
         setbtnDesabled(false);
         setMessage(null);
      }

      setText(text);
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const newFeedback = {
         text,
         rating
      }

      if(feedbackEdit.edit){
         updateFeedback(feedbackEdit.item.id, newFeedback);
      }else{
         addFeedback(newFeedback)
      }
      setText('');
      setbtnDesabled(true);
   }

   return (
      <Card>
         <form onSubmit={handleSubmit}>
            <h2>{feedbackEdit.edit & btnDesabled === false ? 'Edit Item' : 'How would you rate your service with us?'}</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
               <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text} />
               <Button type="submit" isDisabled={btnDesabled} >Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
         </form>
      </Card>
   );
};

export default FeedbackForm;