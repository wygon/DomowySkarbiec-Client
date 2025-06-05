import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import type { User } from '../types/User';
import { Spinner } from 'react-bootstrap';

export default function(){
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    if(!context) throw new Error("LoginContest is empty")
    // if(!context.isLogin) navigate('/login');
    const [familyMembers, setFamilyUsers] = useState<User[] | null>();
    useEffect(() => {
        getAllPeopleData();
    }, []);

    const contents = familyMembers === undefined
        ? <Spinner animation="border" variant="success" />
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
            </thead>
            <tbody>
                    {familyMembers?.map(f =>
                        <tr key={f.id}>
                            <td>{f.id}</td>
                            <td>{f.name}</td>
                            <td>{f.email}</td>
                        </tr>
                    )}
            </tbody>
        </table>;

    return (
        <div>
            <h1>Rodziny</h1>
            {contents}
        </div>
    );

    async function getAllPeopleData() {
        const response = await fetch(`http://localhost:5051/api/family/${context.family.id}/users`);
        if(response.ok){
            const data = await response.json();
            setFamilyUsers(data);
        }
    }
}