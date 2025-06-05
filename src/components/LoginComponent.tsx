import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function (){
    const [inputUserId, setInputUserId] = useState("");
    const [inputUserName, setInputUserName] = useState("");
    const [inputUserEmail, setInputUserEmail] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    if(!context) throw new Error("LoginById must be used within Login provider");

    const  { setIsLogin, setUser, setFamily} = context;

    const handleRegisterClose = () => {
        setFamily(null);
        setInputUserName("");
        setInputUserEmail("");
    }

    const handleLogin = async () => {
        if(inputUserId == "") return;
        const userRes = await fetch(`http://localhost:5051/api/users/${inputUserId}`);
        if(userRes.ok){
            const userData = await userRes.json();
            setUser(userData);
            console.log(userData.id);
            console.log(userData.name);
            console.log(userData.email);
            console.log("family id", userData.familyId);
            if(userData.familyId === null) {
                setIsLogin(true);
                navigate(`/transactions/${userData.id}`);    
                return;
            }
            const familyRes = await fetch(`http://localhost:5051/api/users/${userData.familyId}/family`)
            if(familyRes.ok){
                const familyData = await familyRes.json();
                setFamily(familyData);
            } else {
                console.log("Nie posiadasz rodziny");
            }
            setIsLogin(true);
            navigate(`/transactions/${userData.id}`);
        }
        else{
            alert("Bledny login")
            return;
        }
    }

    const handleRegister = async () => {
        if(inputUserName == "" || inputUserEmail == "") {
            alert("Wypełnij wszystkie dane");
            return;
        }
        const registration = {
            name: inputUserName,
            email: inputUserEmail,
            familyId: null
        }

        try{
            const res = await fetch('http://localhost:5051/api/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(registration)
            });

            if(!res.ok){
                // showErrorToast(true);
                handleRegisterClose();
                alert("Błąd podczas tworzenia konta");
                throw new Error("Błąd podczas tworzenia konta");
            }

            const newUserData = await res.json();
            setUser(newUserData);
            handleRegisterClose();
            setIsLogin(true);
            navigate(`/transactions/${newUserData.id}`);
        } catch(e){
            console.error(e);
        }


    }

    return (
        <div>
            {showLogin 
            ? 
            <>
            <Form className="d-flex flex-column w-50">
                <Form.Group>
                    <Form.Label>Wpisz swoje ID:</Form.Label>
                    <Form.Control
                    type="number"
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
                    placeholder="Wpisz swoje ID"/>
                </Form.Group>
                <Button
                onClick={handleLogin}
                >Zaloguj się</Button>
            </Form>
            <u
            onClick={() => setShowLogin(false)}
            >Nie masz konta? Zarejestruj się!</u>
            </>
            :
            <>
            <Form className="d-flex flex-column w-50"
            >
                <Form.Group>
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control
                    type="name" 
                    value={inputUserName}
                    onChange={(e) => setInputUserName(e.target.value)}
                    placeholder="Wpisz swoje imie"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control
                    type="email" 
                    value={inputUserEmail}
                    onChange={(e) => setInputUserEmail(e.target.value)}
                    placeholder="Wpisz swoj email"/>
                </Form.Group>
                <Button
                onClick={handleRegister}
                >Zarejestruj się</Button>
            </Form>
            <u
            onClick={() => setShowLogin(true)}
            >Masz konto? Zaloguj się!</u>
            </>
            }
        </div>
    );
}