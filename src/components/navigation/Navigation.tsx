import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { Alert, Nav } from "react-bootstrap";

export default function () {
    const context = useContext(LoginContext);
    let alertContent;

    if (context?.user === null || context?.user === undefined){
        alertContent = 
        <div>
            <Alert id="user-data-alert">
                <Alert.Heading>Zaloguj się</Alert.Heading>
            </Alert>
        </div>
        } else {
        const user = context?.user;
        const family = context?.family;
        alertContent = 
        <div className="">
            <Alert id="user-data-alert">
                <Alert.Heading>{user?.name}</Alert.Heading>
                <hr />
                <span className="d-flex gap-3">
                    <span>id: {user?.id}</span>
                    <span>email: {user?.email}</span>
                    <span>family: {family?.name}</span>
                    <span>role: {user?.familyRole}</span>
                </span>
            </Alert>
        </div>

        }
    return (<>{alertContent}</>);
}