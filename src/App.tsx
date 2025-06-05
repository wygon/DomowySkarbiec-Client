import './App.scss';
import Home from './pages/Home';
import Users from './pages/Users';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Families from './pages/Families';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import { useContext } from 'react';
import { LoginContext } from './context/LoginContext';
import FamiliesCreate from './pages/FamiliesCreate';

function App() {
    // const navigate = useNavigate();
    // const context = useContext(LoginContext);
    // if(!context) throw new Error("LoginContest is empty")
    // if(!context.isLogin) navigate('/login');
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route path="/families/:id" element={<Families />} />
                <Route path="/families/create" element={<FamiliesCreate />} />
                <Route path={`/transactions/:id`} element={<Transactions />} />
            </Route>
        </Routes>
    );
}

export default App;