import { APIRequestContext } from "@playwright/test";
import { getEnvConfig } from "../../config/environment";
import { REQRES_API_KEY } from '../../config/apiEnv';

export interface CreateUserPayload {
    name: string;
    job: string;
}

export class UserClient {
    private apiBaseURL: string;
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
        const envConfig = getEnvConfig((process.env.ENV as 'test') || 'test');
        // prefer explicit apiBaseURL, fallback to baseURL when apiBaseURL is not present
        // some environment configs in this repo expose `baseURL` (UI) rather than `apiBaseURL`.
        // keep this resilient to both shapes.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cfg: any = envConfig as any;
        this.apiBaseURL = cfg.apiBaseURL || cfg.baseURL || '';
    }

    private getApiKey(): string {
        const apiKey = REQRES_API_KEY;
        if (!apiKey) {
            throw new Error('REQRES_API_KEY environment variable is required to run API tests');
        }
        return apiKey;
    }

    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-api-key': this.getApiKey(),
        };
    }       

    async createUser(payload: CreateUserPayload) {
        const response = await this.request.post(`${this.apiBaseURL}/users`, {
            headers: this.getHeaders(),
            data: payload,
        });
        return response;
    }   

    async getUser(userId: number) {
        const response = await this.request.get(`${this.apiBaseURL}/users/${userId}`, {
            headers: this.getHeaders(),
        });
        return response;        
    }

    async getUsers() {
        const response = await this.request.get(`${this.apiBaseURL}/users`, {
            headers: this.getHeaders(),
        });
        return response;
    }
}