import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate  } from 'react-router-dom';
import { Provider} from 'react-redux'
import LoginComponent from  './Components/Login/index.js'
import RegisterComponent from './Components/Register';
import { ToastContainer } from  'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Loader from './Components/Loader/index.js'
import store from './redux/store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentsComponent from './Components/Appointments';
import PatientsComponent from './Components/Patients/index.js';
import DoctorsComponent from './Components/Doctors';
import ProtectedRoute from './Components/ProtectedRoute';
import PageNotfound from './Components/PageNotFound';
import BookAppComponent from './Components/BookAppointment';



function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path='/' element={<Navigate replace to='/login' />} />
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/register' element={<RegisterComponent />} />

              <Route path='/home' element={<ProtectedRoute component={AppointmentsComponent} showTopBar={true} />} />
              <Route path='/patients' element={<ProtectedRoute component={PatientsComponent} showTopBar={true} />}  />
              <Route path='/doctors' element={<ProtectedRoute component={DoctorsComponent} showTopBar={true} />}  />
              <Route path='/book' element={<ProtectedRoute component={BookAppComponent} showTopBar={true} />} />

              <Route path='*' element={<PageNotfound />} />

            </Switch>
          </Router>
          <ToastContainer
            position='top-right'
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            draggable
            rtl={false}
            pauseOnHover
            //  transition="zoom"
          />
          <Loader/>
      </div>
    </Provider>
  );
}

export default App;
