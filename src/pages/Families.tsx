import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import type { User } from '../types/User';
import { Button, Spinner } from 'react-bootstrap';

export default function(){
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    if(!context) throw new Error("LoginContest is empty")
    // if(!context.isLogin) navigate('/login');
    const [familyMembers, setFamilyUsers] = useState<User[] | null>();

    const {setUser, setFamily} = context;
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

    const handleLeaveFamily = async () => {
        const confirmLeave = window.confirm("Czy napewno chcesz opuscic rodzine?");
        if(!confirmLeave) return;

        try{
            const updatedUser = {
                id: context.user?.id,
                name: context.user?.name,
                email: context.user?.email,
                familyId: null
            };

            const res = await fetch(`http://localhost:5051/api/users/${context.user?.id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedUser)
            });

            if(!res.ok) throw new Error('Error with exiting family');

            const result = await res.json();

            setUser(result);
            setFamily(null);

            navigate(`/transactions/${context.user?.id}`);
        } catch(e){
            console.log(e);
        }

    }


    return (
        <div>
            <h1>Rodziny</h1>
            <Button variant='danger'
            onClick={handleLeaveFamily}
            >Opuść rodzinę</Button>
            {contents}
        </div>
    );

    async function getAllPeopleData() {
        const response = await fetch(`http://localhost:5051/api/family/${context?.family?.id}/users`);
        if(response.ok){
            const data = await response.json();
            setFamilyUsers(data);
        }
    }

    
}