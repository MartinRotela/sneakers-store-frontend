import { Navigate } from 'react-router-dom';
import AddProductScreen from '../components/add/AddProductScreen';

export const AddProductProtected = (isAdmin: boolean) => {
    return isAdmin ? <AddProductScreen /> : <Navigate to="/" />;
};
