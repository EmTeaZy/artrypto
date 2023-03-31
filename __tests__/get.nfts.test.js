import fetch from 'node-fetch';
import getNftsHandler from '../pages/api/getNfts';

jest.mock('node-fetch');

describe('get Nfts API', () => {
    test('returns nft information of address', async () => {
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


});
