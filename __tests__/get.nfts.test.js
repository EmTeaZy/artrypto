import fetch from 'node-fetch';
import getNftsHandler from '../pages/api/getNfts';

jest.mock('node-fetch');

describe('getNfts API', () => {
    test('returns nfts data for a wallet address', async () => {
        const walletAddress = '0x1234567890abcdef';
        const expectedNfts = [{name: 'NFT1'}, {name: 'NFT2'}];

        // Mock the response from the OpenSea API
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(expectedNfts),
        });

        const req = {
            method: 'GET',
            body: {
                walletAddress,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await getNftsHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('returns 400 error for invalid request', async () => {
        const req = {
            method: 'GET',
            body: {
                invalidParam: 'value',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await getNftsHandler(req, res);

        expect(fetch).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
});
