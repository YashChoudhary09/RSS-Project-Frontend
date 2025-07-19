import { BrowserRouter ,Routes,Route ,Link} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ShakhaaAdd from "./ShakhaaAdd";
import TaskAdd from "./TaskAdd";
import AllShakhaa from "./AllShakhaa";
import AllTask from "./AllTask";
import UpdateSecretePassword from "./UpdateSecretePassword.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Editshakhaa from "./EditShakhaa.jsx";
import EditTask from "./EditTask.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home.jsx";

 function App() {
 

  return (
    <>
 
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/updatePassword" element={
           <ProtectedRoute role={"admin"}>
            <UpdateSecretePassword/>
          </ProtectedRoute>
        }></Route>
        <Route path="/addShakhaa" element={
          <ProtectedRoute>
            <ShakhaaAdd />
          </ProtectedRoute>
        }></Route>
        <Route path="/addTask" element={
           <ProtectedRoute>
            <TaskAdd/>
          </ProtectedRoute>
        }></Route>
        <Route path="/allShakhaa" element={
           <ProtectedRoute>
            <AllShakhaa/>
          </ProtectedRoute>
        }></Route>
        <Route path="/allTask" element={
           <ProtectedRoute>
            <AllTask/>
          </ProtectedRoute>
        }></Route>
         <Route path="/editShakhaa/:id" element={
           <ProtectedRoute>
            <Editshakhaa/>
          </ProtectedRoute>
        }></Route>
         <Route path="/editTask/:id" element={
           <ProtectedRoute>
            <EditTask/>
          </ProtectedRoute>
        }></Route>
       </Routes>
    </BrowserRouter>
     <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App;