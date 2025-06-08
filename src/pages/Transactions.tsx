import { useContext, useEffect, useState } from "react";
import { Accordion, Badge, Button, Col, Form, ProgressBar, Row, Spinner, Table } from "react-bootstrap";
import { LoginContext } from "../context/LoginContext";
import AddTransacitonComponent from "../components/AddTransacitonComponent";
import type { Transaction } from "../types/Transaction";
import TransactionsChart from "../components/TransactionsChart";
import type { FamilyWithUsersDto } from "../types/family/FamilyWithUsersDto";

export default function () {
    const context = useContext(LoginContext);

    if (!context) throw new Error("LoginById must be used within Login provider");

    const [userTransaction, setUserTransaction] = useState<Transaction[]>();
    const [familyTransaction, setFamilyTransaction] = useState<Transaction[]>();
    const [familyUsersTransaction, setFamilyUsersTransaction] = useState<FamilyWithUsersDto>();

    const [userFilter, setUserFilter] = useState<'all' | 'Dochód' | 'Wydatek'>('all');
    const [familyUsersFilter, setFamilyUsersFilter] = useState<'all' | 'Dochód' | 'Wydatek'>('all');

    useEffect(() => {
        getAllUserTransactionData();
        if (context.family != null) {
            getAllUserFamilyTransactionData();
            getAllFamilyUsersWithTransactionsData();
        }
    }, [context?.user?.id, context?.family?.id]);

    const getFilteredUserTransactions = () => {
        if (!userTransaction) return [];
        if (userFilter === 'all') return userTransaction;
        return userTransaction.filter(t => t.type === userFilter);
    };

    // const getFilteredFamilyUsersTransactions = () => {
    //     if (!familyUsersTransaction) return [];
    //     if (familyUsersFilter === 'all') return familyUsersTransaction;
    //     return familyUsersTransaction.filter(t => t.users === familyUsersFilter);
    // };

    const filteredUserTransactions = getFilteredUserTransactions();
    // const filteredFamilyUsersTransactions = getFilteredFamilyUsersTransactions();

    const totalSpend = userTransaction?.reduce((sum, t) => {
        return t.type === "Wydatek" ? sum + t.value : sum;
    }, 0);
    const totalIncome = userTransaction?.reduce((sum, t) => {
        return t.type === "Dochód" ? sum + t.value : sum;
    }, 0);
    const totalFamilySpend = familyTransaction?.reduce((sum, t) => {
        return t.type === "Wydatek" ? sum + t.value : sum;
    }, 0);

    const progressBarInfo = () => {
        const per = context.family?.wage
            ? (totalFamilySpend / context.family.wage) * 100
            : 0;
        const variant = totalFamilySpend > (context.family?.wage || 0) ? "danger" : "success";

        return {
            percent: per,
            variant: variant
        };
    };
    const progressBarData = progressBarInfo();
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const myTransaction = userTransaction === undefined
        ? <Spinner animation="border" variant="success" />
        : <>
            <Row className="align-items-center">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Filtruj po typie:</Form.Label>
                        <Form.Select
                            value={userFilter}
                            onChange={(e) => setUserFilter(e.target.value as 'all' | 'Dochód' | 'Wydatek')}
                        >
                            <option value="all">Wszystkie</option>
                            <option value="Dochód">Dochód</option>
                            <option value="Wydatek">Wydatek</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <div className="mt-4">
                        <small className="text-muted">
                            Wyświetlane: {filteredUserTransactions.length} z {userTransaction.length} transakcji
                        </small>
                    </div>
                </Col>
            </Row>
            <div>
                <Accordion>
                    {filteredUserTransactions?.map(t => (
                        <Accordion.Item eventKey={`${t.id}`} key={t.id}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between align-items-center w-100 p-2">
                                    <div className="flex-fill text-center">
                                        <span><strong>#{t.id}</strong></span>
                                    </div>
                                    <div className="flex-fill text-center">
                                        <Badge bg={t.type === 'Dochód' ? 'success' : 'danger'}>
                                            {t.type}
                                        </Badge>
                                    </div>
                                    <div className="flex-fill text-center">
                                        <span><strong>{t.value} zł</strong></span>
                                    </div>
                                    <div className="flex-fill text-center">
                                        <span>{formatDate(t.transactionDate)}</span>
                                    </div>
                                    <div className="flex-shrink-0 d-none d-md-flex gap-2">
                                        <Button variant="warning" size="sm" onClick={(e) => {
                                            e.stopPropagation();
                                        }}>✏</Button>
                                        <Button variant="danger" size="sm" onClick={(e) => {
                                            e.stopPropagation();
                                        }}>❌</Button>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="d-flex justify-content-between">
                                <div>
                                    <strong>Opis:</strong> {t.description}
                                </div>
                                <div className="d-flex d-md-none gap-2">
                                    <Button variant="warning" size="sm" onClick={(e) => {
                                        e.stopPropagation();
                                    }}>✏</Button>
                                    <Button variant="danger" size="sm" onClick={(e) => {
                                        e.stopPropagation();
                                    }}>❌</Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </>
    const myFamilyUsersTransaction = familyUsersTransaction === undefined
        ? <> {!context.family === null && <Spinner animation="border" variant="success" />} </>
        : <>
            <Row className="align-items-center">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Filtruj po typie:</Form.Label>
                        <Form.Select
                            value={userFilter}
                            onChange={(e) => setFamilyUsersFilter(e.target.value as 'all' | 'Dochód' | 'Wydatek')}
                        >
                            <option value="all">Wszystkie</option>
                            <option value="Dochód">Dochód</option>
                            <option value="Wydatek">Wydatek</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <div className="mt-4">
                        <small className="text-muted">
                            {/* Wyświetlane: {filteredFamilyTransactions.length} z {familyUsersTransaction.length} transakcji */}
                        </small>
                    </div>
                </Col>
            </Row>
            <div>
                <Accordion>
                    {familyUsersTransaction?.users?.map(user =>
                        user.transactions.map(t => (
                            <Accordion.Item eventKey={`${t.id}`} key={t.id}>
                                <Accordion.Header>
                                    <div className="d-flex justify-content-between align-items-center w-100 p-2">
                                        <div className="flex-fill text-center">
                                            <span><strong>{user.name}</strong></span>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <span><strong>#{t.id}</strong></span>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <Badge bg={t.type === 'Dochód' ? 'success' : 'danger'}>
                                                {t.type}
                                            </Badge>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <span><strong>{t.value} zł</strong></span>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <span>{formatDate(t.transactionDate)}</span>
                                        </div>
                                        {context.user?.familyRole === "Head" &&
                                            <div className="flex-shrink-0 d-none d-md-flex gap-2">
                                                <Button variant="warning" size="sm" onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>✏</Button>
                                                <Button variant="danger" size="sm" onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>❌</Button>
                                            </div>
                                        }
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className="d-flex justify-content-between">
                                    <div>
                                        <strong>Opis:</strong> {t.description}
                                    </div>
                                    {context.user?.familyRole === "Head" &&
                                        <div className="d-flex d-md-none gap-2">
                                            <Button variant="warning" size="sm" onClick={(e) => {
                                                e.stopPropagation();
                                            }}>✏</Button>
                                            <Button variant="danger" size="sm" onClick={(e) => {
                                                e.stopPropagation();
                                            }}>❌</Button>
                                        </div>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        )))}
                </Accordion>
            </div>
        </>

    return (
        <div>
            <Row>
                <Col sm={12} lg={8}>
                    <div className="transaction-info">
                        <h2>Moje transakcje:</h2>
                        <span className="d-flex gap-2 fs-5 fw-bold">
                            <p><Badge bg="success">Dochód:</Badge> {totalIncome} zł</p>
                            <p><Badge bg="danger" >Wydane:</Badge> {totalSpend} zł</p>
                        </span>
                        <AddTransacitonComponent onSuccess={() => {
                            getAllUserTransactionData();
                            if (context.family != null)
                                getAllUserFamilyTransactionData();
                        }} />
                    </div>
                    {myTransaction}
                </Col>
                <Col sm={12} lg={4} className="positon-relative p-0">
                    {userTransaction &&
                        <div style={{ top: "50px" }} className="position-sticky">
                            <TransactionsChart transactions={userTransaction}
                            />
                        </div>
                    }
                </Col>
            </Row>
            {myFamilyUsersTransaction &&
                <Row>
                    {familyTransaction && <>
                        <Col sm={12} lg={8}>
                        <div className="transaction-info">
                            <h2>Transakcje rodziny:</h2>
                            <span className="d-flex gap-2 fs-5 fw-bold">
                                <p><Badge bg="success">Calkowity budzet: </Badge>  {context.family?.wage} zł</p>
                                <p><Badge bg="danger" >Wykorzystano: </Badge> {totalFamilySpend} zł</p>
                            </span>
                        </div>
                        {progressBarData.variant === "danger" && <p className="fs-5 fw-bold">Wykorzystaliście cały budżet!</p>}
                        <ProgressBar
                            variant={progressBarData.variant}
                            now={progressBarData.percent}
                            key={1}
                            className="w-50"
                            />
                            {myFamilyUsersTransaction}
                            </Col>
                        <Col sm={12} lg={4} className="p-0">
                            <div style={{ top: "50px" }} className="position-sticky  p-0">
                                <TransactionsChart transactions={familyTransaction} />
                            </div>
                        </Col>
                    </>
                    }
                </Row>}
        </div>
    );

    async function getAllUserTransactionData() {
        const response = await fetch(`http://localhost:5051/api/transaction/user/${context?.user?.id}`);
        if (response.ok) {
            const data = await response.json();
            setUserTransaction(data);
        }
    }
    async function getAllUserFamilyTransactionData() {
        const response = await fetch(`http://localhost:5051/api/transaction/family/${context?.family?.id}`);
        if (response.ok) {
            const data = await response.json();
            setFamilyTransaction(data);
        }
    }

    async function getAllFamilyUsersWithTransactionsData() {
        const response = await fetch(`http://localhost:5051/api/family/${context?.family?.id}/users-with-transactions`);
        if (response.ok) {
            const data = await response.json();
            setFamilyUsersTransaction(data);
        }
    }
}