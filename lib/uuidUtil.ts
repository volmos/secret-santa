import {randomUUID} from "node:crypto";

export function generateUuid(): string {
    return randomUUID();
}

export function isValidUuid(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid);
}