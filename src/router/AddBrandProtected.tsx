import { Navigate } from 'react-router-dom';
import AddBrandScreen from '../components/add/AddBrandScreen';

export const AddBrandProtected = (isAdmin: boolean) => {
    return isAdmin ? <AddBrandScreen /> : <Navigate to="/" />;
};
