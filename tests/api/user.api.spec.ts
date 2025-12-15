import {test, expect} from '@playwright/test';
import {UserClient, CreateUserPayload} from '../../api/clients/userClient';
import {createUserPayload} from '../../test-data/apiUserData';      
import { getEnvConfig } from '../../config/environment'
import { HttpStatusCodes } from '../../constants/httpStatusCodes';
import { REQRES_API_KEY } from '../../config/apiEnv';

test.describe.serial('User API tests', () => {
    let userClient: UserClient;
    let createdUserId: number;

    test.beforeEach(async ({request}) => {
        userClient = new UserClient(request);
    }); 
    test('POST /should create a new user @api', async ({}) => {
        const response = await userClient.createUser(createUserPayload);
        expect(response.status()).toBe(HttpStatusCodes.CREATED); // 201  
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.name).toBe(createUserPayload.name);
        expect(responseBody.job).toBe(createUserPayload.job);   
        createdUserId = parseInt(responseBody.id, 10);
    });

    test('GET /should retrieve the users list @api', async ({}) => {
        const response = await userClient.getUsers();
        expect(response.status()).toBe(HttpStatusCodes.OK); // 200  
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('data');
    });

});