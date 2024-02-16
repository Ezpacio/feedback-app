import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './Pages/AboutPage';
import FaQuestion from './components/AboutIconLink';
import { FeedbackProvider } from './components/context/FeedbackContext';


function App() {

   return (
      <FeedbackProvider>
         <Router>
            <Header />
            <div className="container">
               <Routes>
                  <Route path="/" element={
                     <>
                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                     </>
                  } />
                  <Route path="/about" element={<AboutPage />} />
               </Routes>
            </div>
            <FaQuestion />
         </Router>
      </FeedbackProvider>
   );
};

export default App;