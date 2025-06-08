import { useContext, useState } from "react";
import { Alert, Button, Offcanvas } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function () {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(LoginContext);
    const user = context?.user;
    if (!context) throw new Error("LoginContest is empty")
    // if(!context.isLogin) navigate('/login');
    const { setIsLogin, setUser, setFamily } = context;
    const [showNav, setShowNav] = useState(false);

    const handleLogOut = () => {
        setUser(null);
        setFamily(null);
        setIsLogin(false);
        navigate('/login');
    }

    const content = () => (
        <>
            {context.isLogin
                ? <Button onClick={handleLogOut} >Log out</Button>
                : <Button onClick={() => navigate('/login')} >Zaloguj</Button>
            }
            <Button
                variant={`${location.pathname == ('/') ? "primary" : "outline-primary"}`}
                onClick={() => navigate("/")}
            >Lobby</Button>
            {context.isLogin && <>
                <Button
                    variant={`${location.pathname.startsWith('/transactions') ? "primary" : "outline-primary"}`}
                    onClick={() => navigate(`/transactions/${context.user?.id}`)}
                >Transakcje</Button>
                <Button
                    variant={`${location.pathname.startsWith('/families') ? "primary" : "outline-primary"}`}
                    onClick={() => { context.family ? navigate(`/families/${context.family?.id}`) : navigate(`/families/create`) }}
                >{context.family ? "Rodzina" : "Stwórz swoją rodzine"}
                </Button>
            </>
            }
        </>
    )

    return (
        <div>
            <div id="sidebar" className="d-none d-lg-block">
                <h1>Tukanowy Skarbiec</h1>
                <div className="d-flex flex-column gap-2">
                    {content()}
                </div>
            </div>
            <div className="d-block d-lg-none">
                <div className="position-fixed top-0 end-0 translate-middle-x m-2 rounded"
                    style={{ zIndex: '1060' }}
                >
                    <Button
                        onClick={() => { setShowNav(true) }}
                        className={`${showNav && "d-none"}`}
                    >📝</Button>
                    <Offcanvas show={showNav} onHide={() => { setShowNav(false) }}>
                        <Offcanvas.Body>
                            {content()}
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>
        </div>
    );
}