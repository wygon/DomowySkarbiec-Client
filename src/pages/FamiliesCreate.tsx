import { useContext, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function(){
    const [familyName, setFamilyName] = useState("");
    const [familyWage, setFamilyWage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const context = useContext(LoginContext);
    
    if (!context) throw new Error("CreateFamily must be used within Login provider");
    
    const { user, setUser, setFamily } = context;

    const handleCreateFamily = async () => {
        if(familyName === "" || familyWage === "" || parseFloat(familyWage) < 0) {
            alert("Wypełnij wymagane pola!");
            return;
        }
        const familyData = {
            name: familyName,
            wage: parseFloat(familyWage)
        };

        try {
            const res = await fetch('http://localhost:5051/api/family/', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(familyData)
            });

            if(!res.ok){
                throw new Error('Cant make new family');
            }

            const newFamily = await res.json();
            console.log("NOWA RODZINA: ", newFamily);

            const updatedUserData = {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                familyRole: 'Head',
                familyId: newFamily.id
            };

            const userRes = await fetch(`http://localhost:5051/api/users/${user?.id}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData)
            });

            if(!userRes.ok){
                throw new Error('Cant update user');
            }

            const updatedUser = await userRes.json();

            setUser(updatedUser);
            setFamily(newFamily);

            setFamilyName("");
            setFamilyWage("");

            navigate(`/family/${newFamily.id}`);

        }catch(e){
            console.error(e);
        }
    }
    return(
 <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="mb-0">Utwórz nową rodzinę</h3>
                        </div>
                        <div className="card-body">
                            {showSuccess && (
                                <Alert variant="success" onClose={() => setShowSuccess(false)}>
                                    <Alert.Heading>Sukces!</Alert.Heading>
                                    Rodzina została utworzona pomyślnie. Zostaniesz przekierowany...
                                </Alert>
                            )}

                            {showError && (
                                <Alert variant="danger" onClose={() => setShowError(false)}>
                                    <Alert.Heading>Błąd!</Alert.Heading>
                                    {errorMessage}
                                </Alert>
                            )}

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nazwa rodziny</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={familyName}
                                        onChange={(e) => setFamilyName(e.target.value)}
                                        placeholder="Twoje nazwisko"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Miesięczny budżet rodziny (zł)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        value={familyWage}
                                        onChange={(e) => setFamilyWage(e.target.value)}
                                        placeholder="Wpisz kwotę"
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleCreateFamily}
                                        className="flex-grow-1"
                                    >
                                        Utwórz rodzinę
                                    </Button>

                                    <Button
                                        variant="secondary"
                                    >
                                        Wyczyść
                                    </Button>
                                </div>
                            </Form>

                            {user && (
                                <div className="mt-3 p-2 bg-light rounded">
                                        <strong>Założyciel:</strong> {user.name} ({user.email})
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}