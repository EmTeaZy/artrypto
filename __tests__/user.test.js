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

    test('should not create a new user', async () => {
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
});
