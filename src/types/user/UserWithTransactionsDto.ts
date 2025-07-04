import type { TransactionDto } from "../transaction/TransactionDto";

export interface UserWithTransactionsDto {
    id: number;
    name: string;
    email: string;
    familyRole: string;
    transactions: TransactionDto[];
}