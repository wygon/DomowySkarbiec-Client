import type { User } from "./User";

export type Family = {
    id: number;
    name: string;
    wage: number;
    usersId: number[];
    users: User[];
}