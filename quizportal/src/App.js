
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from "./pages/Login";
import Logout from './pages/Logout';
import Register from './pages/Register';
import AdminAddQuestion from './pages/admin/questions/AdminAddQuestion';
import AdminEditQuestion from './pages/admin/questions/AdminEditQuestion';
import AdminAddQuiz from './pages/admin/quizzes/AdminAddQuiz';
import AdminEditQuiz from './pages/admin/quizzes/AdminEditQuiz';
import ViewQuizzes from './pages/user/ViewQuizzes';
import ViewQuestions from './pages/user/ViewQuestions';
import AdminQuizzes from './pages/admin/quizzes/AdminQuizzes';
import AdminQuestions from './pages/admin/questions/AdminQuestions';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path= "/" element={<Login/>}/>
    <Route path ="/login" element={<Login/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path ="/register" element={<Register/>}/>
    <Route path="/adminAddQuiz" element ={<AdminAddQuiz/>} />
    <Route path="/adminQuizzes" element={<AdminQuizzes/>}/>
    <Route path="/adminEditQuiz/:id" element ={<AdminEditQuiz/>} />
    <Route path="/adminAddQuestion/:id" element ={<AdminAddQuestion/>} />
    <Route path="/adminEditQuestion/:id" element ={<AdminEditQuestion/>} />
    <Route path="/adminQuestions/:quizId" element={<AdminQuestions/>}/>
    <Route path="/quizzes"element={<ViewQuizzes/>}/>
    <Route path="/questions/:quizId" element={<ViewQuestions/>}/>
    
   </Routes>
   </BrowserRouter>
  );
}

export default App;
