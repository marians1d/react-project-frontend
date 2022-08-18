import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoute = ({children}) => {
    const { isLogged } = useSelector(state => state.user);
    
    if (isLogged) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default PublicRoute;
