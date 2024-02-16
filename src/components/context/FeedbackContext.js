import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
   const [isLoading, SetIsLoading] = useState(true)
   const [feedback, setFeedback] = useState([]);

   const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
   });

   useEffect(() => {
      fetchFeedback();
   }, [])

   // Fetch feedback
   const fetchFeedback = async () => {
      try {
         const res = await fetch(`/feedback`);
         const data = await res.json();
         setFeedback(data);
         SetIsLoading(false)
      } catch (error) {
         console.error('Hata:', error);
      }
   }

   // Add Feedback
   const addFeedback = async (newFeedback) => {
      try {
         const res = await fetch('/feedback', {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeedback)
         });

         const data = await res.json();
         setFeedback([data, ...feedback])
      } catch (error) {
         console.error('Hata:', error);
      }
   }

   // Delete Feedback
   const deleteFeedback = async (id) => {
      if (window.confirm('sure you want to delete?')) {
         try {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })
            setFeedback(feedback.filter((item) => item.id !== id));
         } catch (error) {
            console.error('Hata:', error);
         }
      };
   }

   // Update Feedback
   const updateFeedback = async (id, updItem) => {
      try {
         const res = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(updItem)
         });

         const data = await res.json();

         setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...data
         } : item))
      } catch (error) {
         console.error('Hata:', error);
      }
   };


   // Set item to be Updated
   const editFeedback = (item) => {
      setFeedbackEdit({
         item,
         edit: true
      })
   }

   return (
      <FeedbackContext.Provider
         value={{
            feedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit,
            updateFeedback,
            isLoading
         }}>

         {children}
      </FeedbackContext.Provider>
   );
};

export default FeedbackContext;