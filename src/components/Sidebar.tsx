import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function () {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(LoginContext);
    if (!context) throw new Error("LoginContest is empty")
    // if(!context.isLogin) navigate('/login');
    const { setIsLogin, setUser, setFamily } = context;
    const handleLogOut = () => {
        setUser(null);
        setFamily(null);
        setIsLogin(false);
        navigate('/login');
    }
    return (
        <div id="sidebar">
            <h1>Tukanowy Skarbiec</h1>
            <p>UserId:{context.user?.id}</p>
            <p>:{context.user?.name}</p>
            <p>FamilyId:{context.family?.id}</p>
            <div className="d-flex flex-column gap-2">
                {context.isLogin
                    ? <Button
                        onClick={handleLogOut}
                    >Log out</Button>
                    :
                    <Button
                        onClick={() => navigate('/login')}
                    >Zaloguj</Button>
                }
                <Button
                    variant={`${location.pathname == ('/') ? "primary" : "outline-primary"}`}
                    onClick={() => navigate("/")}
                >Lobby</Button>
                <Button
                    variant={`${location.pathname.startsWith('/transactions') ? "primary" : "outline-primary"}`}
                    onClick={() => navigate(`/transactions/${context.user?.id}`)}
                >Transakcje</Button>
                {context.isLogin &&
                <Button
                variant={`${location.pathname.startsWith('/families') ? "primary" : "outline-primary"}`}
                onClick={() => {context.family ? navigate(`/families/${context.family?.id}`) : navigate(`/families/create`)}}
                >{context.family ? "Rodzina" : "Stwórz swoją rodzine"}
                </Button>
            }
            </div>
        </div>
    );
}