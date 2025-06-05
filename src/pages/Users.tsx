import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Users(){
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        getAllPeopleData();
    }, []);

    const contents = users === undefined
        ? <Spinner animation="border" variant="success" />
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                </tr>
            </thead>
            <tbody>
                    {users?.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    )}
            </tbody>
        </table>;

    return (
        <div>
            <h1>Uzytkownicy</h1>
            {contents}
            {contents}
            {contents}
        </div>
    );

    async function getAllPeopleData() {
        const response = await fetch('http://localhost:5051/api/users');
        if(response.ok){
            const data = await response.json();
            setUsers(data);
        }
    }
}