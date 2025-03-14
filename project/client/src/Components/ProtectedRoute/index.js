
import { Route } from 'react-router-dom'
import TopBarComponent from '../TopBar';
import { Navigate } from  'react-router-dom'
import MenuBarComponent from '../MenuBar';

const ProtectedRoute=(props)=>
{
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
        if (props.showTopBar === true) {
            return (
                <>
                  <TopBarComponent />
                  <MenuBarComponent/>
                  <props.component />
                </>
            );
        }
        return (
            <props.component />
        );
    } else  {
       return <Navigate replace to='/login' />
    }

}

export default ProtectedRoute;