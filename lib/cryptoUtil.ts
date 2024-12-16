import {createCipheriv, createDecipheriv, randomBytes} from "node:crypto";

function encryptWithKey(text: string, secretKey: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(secretKey, 'hex'), iv);

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag().toString('base64');
    return iv.toString('base64') + ':' + authTag + ':' + encrypted;
}

function decryptWithKey(data: string, secretKey: string) {
    const parts = data.split(':');
    const iv = Buffer.from(parts[0], 'base64');
    const authTag = Buffer.from(parts[1], 'base64');
    const encryptedText = parts[2];

    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(secretKey, 'hex'), iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function getSecretKey() {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined');
    }
    return process.env.SECRET_KEY;
}

export const encrypt = (text: string) => encryptWithKey(text, getSecretKey());

export const decrypt = (data: string) => decryptWithKey(data, getSecretKey());