import type { UserWithTransactionsDto } from "../user/UserWithTransactionsDto";

export interface FamilyWithUsersDto {
    id: number;
    name: string;
    wage: number;
    users: UserWithTransactionsDto[];
}