import postRequest from "../pages/api/addUser";
import connectDb from "../middleware/mongoose";
import {createMocks} from 'node-mocks-http';
import {beforeEach, describe, expect, jest, test} from '@jest/globals';

jest.mock('../middleware/mongoose');
jest.mock('mongoose');
jest.mock('../models/User');

describe('User API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test To Check If It Adds User', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
        };

        const {req, res} = createMocks({
            method: 'POST',
            body: userData,
        });

        await postRequest(req, res);

        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(res._getStatusCode()).toBe(400);
    });

    test('test to check if it does not create user', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            bio: 'Test user bio',
            walletAddress: '0x1234567890abcdef',
            imgid: '12345',
            links: {
                website: 'https://example.com',
                twitter: 'https://twitter.com/example'
            }
        };

        const {req, res} = createMocks({
            method: 'POST',
            body: userData,
        });

        await postRequest(req, res);

        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(res._getStatusCode()).toBe(400);
    });

});
