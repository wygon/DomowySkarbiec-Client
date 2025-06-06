import { useContext, useEffect, useState } from "react";
import { Col, Form, ProgressBar, Row, Spinner, Table } from "react-bootstrap";
import { LoginContext } from "../context/LoginContext";
import AddTransacitonComponent from "../components/AddTransacitonComponent";
import type { Transaction } from "../types/Transaction";
import TransactionsChart from "../components/TransactionsChart";
import type { FamilyWithUsersDto } from "../types/family/FamilyWithUsersDto";

export default function(){
    const context = useContext(LoginContext);

    if(!context) throw new Error("LoginById must be used within Login provider");

    const [userTransaction, setUserTransaction] = useState<Transaction[]>();
    const [familyTransaction, setFamilyTransaction] = useState<Transaction[]>();
    const [familyUsersTransaction, setFamilyUsersTransaction] = useState<FamilyWithUsersDto>();

    const [userFilter, setUserFilter] = useState<'all' | 'Dochód' | 'Wydatek'>('all');
    const [familyFilter, setFamilyFilter] = useState<'all' | 'Dochód' | 'Wydatek'>('all');
    const [familyUsersFilter, setFamilyUsersFilter] = useState<'all' | 'Dochód' | 'Wydatek'>('all');

    useEffect(() => {
        getAllUserTransactionData();
        if(context.family != null)
        {
            getAllUserFamilyTransactionData();
            getAllFamilyUsersWithTransactionsData();
        }
    }, [context?.user?.id, context?.family?.id]);

    const getFilteredUserTransactions = () => {
        if (!userTransaction) return [];
        if (userFilter === 'all') return userTransaction;
        return userTransaction.filter(t => t.type === userFilter);
    };

    const getFilteredFamilyTransactions = () => {
        if (!familyTransaction) return [];
        if (familyFilter === 'all') return familyTransaction;
        return familyTransaction.filter(t => t.type === familyFilter);
    };

    // const getFilteredFamilyUsersTransactions = () => {
    //     if (!familyUsersTransaction) return [];
    //     if (familyUsersFilter === 'all') return familyUsersTransaction;
    //     return familyUsersTransaction.filter(t => t.users === familyUsersFilter);
    // };

    const filteredUserTransactions = getFilteredUserTransactions();
    const filteredFamilyTransactions = getFilteredFamilyTransactions();
    // const filteredFamilyUsersTransactions = getFilteredFamilyUsersTransactions();

    const totalSpend = userTransaction?.reduce((sum, t) =>{
        return t.type === "Wydatek" ? sum + t.value : sum;
    }, 0);

    const totalIncome = userTransaction?.reduce((sum, t) =>{
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
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Typ</th>
                    <th>Wartość</th>
                    <th>Opis</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {filteredUserTransactions?.map(t =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.type}</td>
                    <td>{t.value} zł</td>
                    <td>{t.description}</td>
                    <td>{formatDate(t.transactionDate)}</td>
                </tr>
                )}
            </tbody>
        </Table>
    </>
    const myFamilyTransaction = familyTransaction === undefined
    ? <Spinner animation="border" variant="success" />
    : <>
    <Row className="align-items-center">
        <Col md={4}>
        <Form.Group>
            <Form.Label>Filtruj po typie:</Form.Label>
            <Form.Select
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value as 'all' | 'Dochód' | 'Wydatek')}
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
                    Wyświetlane: {filteredFamilyTransactions.length} z {familyTransaction.length} transakcji
                </small>
            </div>
        </Col>
    </Row>
    <Table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Typ</th>
                <th>Wartość</th>
                <th>Opis</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            {filteredFamilyTransactions?.map(t =>
            <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.type}</td>
                <td>{t.value} zł</td>
                <td>{t.description}</td>
                <td>{t.transactionDate}</td>
            </tr>
            )}
        </tbody>
    </Table>
    </>

    const myFamilyUsersTransaction = familyUsersTransaction === undefined
    ? <Spinner animation="border" variant="success" />
    : <>
    <Row className="align-items-center">
        <Col md={4}>
        <Form.Group>
            <Form.Label>Filtruj po typie:</Form.Label>
            <Form.Select
            value={familyFilter}
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
                    Wyświetlane: {familyUsersTransaction.length} z {familyUsersTransaction.length} transakcji
                </small>
            </div>
        </Col>
    </Row>
    <Table>
        <thead>
            <tr>
                <th>Osoba</th>
                <th>Typ</th>
                <th>Wartość</th>
                <th>Opis</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            {familyUsersTransaction?.users?.map(user => 
                user.transactions.map(t => (
                    <tr key={`${user.id}-${t.id}`}>
                        <td>{user.name}</td>
                        <td>{t.type}</td>
                        <td>{t.value}</td>
                        <td>{t.description}</td>
                        <td>{t.transactionDate}</td>
                    </tr>
                ))
            ).flat()}
        </tbody>
    </Table>
    </>

    return(
        <div>
        <h1>Transakcje</h1>
        {userTransaction && 
        <TransactionsChart transactions={userTransaction} />
        }
        
        <AddTransacitonComponent onSuccess={() =>{
            getAllUserTransactionData();
            if(context.family != null)
                getAllUserFamilyTransactionData();
        }}/>
        <h2>Moje transakcje</h2>
        <p>Wydane: {totalSpend}</p>
        <p>Dochód: {totalIncome}</p>
        {myTransaction}
        {/* {familyTransaction &&
            <>
                <TransactionsChart transactions={familyTransaction} />
                <h2>Transakcje rodziny</h2>
                <p>Calkowity budzet: {context.family?.wage} zł</p>
                <p>Wykorzystano: {totalFamilySpend} zł</p>
                {progressBarData.variant === "danger" && <p>Wykorzystaliście cały budżet!</p>}
                <ProgressBar 
                variant={progressBarData.variant}
                now={progressBarData.percent}
                key={1}
                className="w-50"
                />
                {myFamilyTransaction}
            </>
        } */}
        {myFamilyUsersTransaction &&  
        <>
            elo
            {myFamilyUsersTransaction}
        </>}
        </div>
    );

    async function getAllUserTransactionData() {
        const response = await fetch(`http://localhost:5051/api/transaction/user/${context?.user?.id}`);
        if(response.ok){
            const data = await response.json();
                setUserTransaction(data);
        }
    }
    async function getAllUserFamilyTransactionData() {
        const response = await fetch(`http://localhost:5051/api/transaction/family/${context?.family?.id}`);
        if(response.ok){
            const data = await response.json();
                setFamilyTransaction(data);
        }
    }
    
    async function getAllFamilyUsersWithTransactionsData(){
        const response  = await fetch(`http://localhost:5051/api/family/${context?.family?.id}/users-with-transactions`);
        if(response.ok){
            const data = await response.json();
            setFamilyUsersTransaction(data);
        }
    }
}