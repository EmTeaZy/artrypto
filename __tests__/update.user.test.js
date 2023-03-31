import updateUser from "../pages/api/updateUser";
import connectDb from "../middleware/mongoose";
import User from "../models/User";
import {createMocks} from 'node-mocks-http';
import {beforeEach, describe, expect, jest, test} from '@jest/globals';

jest.mock('../middleware/mongoose');
jest.mock('../models/User');

describe('Update User API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should update a user', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            bio: 'A test user.',
            walletAddress: '0x0000000000000000000000000000000000000000',
            links: {
                twitter: 'https://twitter.com/testuser',
                github: 'https://github.com/testuser'
            }
        };

        const {req, res} = createMocks({
            method: 'POST',
            body: userData,
        });

        const userUpdateSpy = jest.spyOn(User, 'updateOne').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce({n: 1, nModified: 1, ok: 1})
        });

        await updateUser(req, res);

        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(userUpdateSpy).toHaveBeenCalledTimes(1);
        expect(userUpdateSpy).toHaveBeenCalledWith(
            {walletAddress: userData.walletAddress},
            {
                $set: {
                    username: userData.username,
                    email: userData.email,
                    bio: userData.bio,
                    links: userData.links
                }
            }
        );
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({user: {}});
    });

    test('should return an error if user update fails', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            bio: 'A test user.',
            walletAddress: '0x0000000000000000000000000000000000000000',
            links: {
                twitter: 'https://twitter.com/testuser',
                github: 'https://github.com/testuser'
            }
        };

        const {req, res} = createMocks({
            method: 'POST',
            body: userData,
        });

        const userUpdateSpy = jest.spyOn(User, 'updateOne').mockReturnValue({
            exec: jest.fn().mockRejectedValueOnce('User update failed.')
        });

        await updateUser(req, res);

        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(userUpdateSpy).toHaveBeenCalledTimes(1);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({user: {}});
    });
});
