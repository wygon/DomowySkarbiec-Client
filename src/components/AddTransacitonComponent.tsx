import { useContext, useState } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import { LoginContext } from "../context/LoginContext";

export default function ({ onSuccess }: { onSuccess: () => void }) {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [type, setTransactionType] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [showErrorToast, setShowErrorToast] = useState(false);

    const context = useContext(LoginContext);
    if (!context) throw new Error("LoginById must be used within Login provider");
    const handleClose = () => {
        setShowTransactionModal(false);
        setValue("");
        setTransactionType("");
        setDescription("");
        setTransactionDate(() => {
            const today = new Date();
            return today.toISOString().split('T')[0];
        });
    }
    const handleShow = () => setShowTransactionModal(true);

    const handleAdd = async () => {
        const userId = context.user?.id;
        if (!userId || !type || !value) return alert("Wypełnij wymagane pola!");

        const transaction = {
            type,
            userId,
            value: parseFloat(value),
            description,
            transactionDate
        }

        try {
            const res = await fetch('http://localhost:5051/api/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction)
            });

            if (!res.ok) {
                setShowErrorToast(true);
                handleClose();
                throw new Error("Błąd podczas dodawania transakcji");
            }

            const data = await res.json();
            console.log("dodano transakcje: ", data);
            handleClose();
            onSuccess();
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <div>
            <Button
                onClick={handleShow}
            >Dodaj nową transakcje</Button>
            <Modal
                show={showTransactionModal}
            >
                <Modal.Header>Dodaj nową transakcję</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="valueInput">
                            <Form.Label>Wartość</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Wpisz kwotę"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="typeInput"
                            key={"type"}>
                            <Form.Label>Typ</Form.Label>
                            <Form.Check
                                type="radio"
                                name="type"
                                id="Wydatek"
                                label="Wydatek"
                                value="Wydatek"
                                checked={type === "Wydatek"}
                                onChange={(e) => setTransactionType(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                name="type"
                                id="Dochód"
                                label="Dochód"
                                value="Dochód"
                                checked={type === "Dochód"}
                                onChange={(e) => setTransactionType(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Opis</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                placeholder="Opis transakcji"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data transakcji</Form.Label>
                            <Form.Control
                                type="date"
                                value={transactionDate}
                                onChange={(e) => setTransactionDate(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            onClick={handleAdd}
                        >Dodaj</Button>
                        <Button
                            variant="danger"
                            onClick={handleClose}
                        >Przerwij</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Toast
                bg="danger"
                show={showErrorToast}
                delay={5000}
                autohide
                onClose={() => setShowErrorToast(false)}
                className="position-fixed top-0 end-0 m-2"
            >
                <Toast.Header>Blad!</Toast.Header>
                <Toast.Body>
                    <span>Błąd podczas dodawania transakcji</span>
                </Toast.Body>
            </Toast>
        </div>
    );
}