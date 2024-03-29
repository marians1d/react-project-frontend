import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({children}) => {
    const { isLogged } = useSelector(state => state.user);

    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;
