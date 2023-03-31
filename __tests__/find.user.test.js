import getUser from "../pages/api/findUser";
import connectDb from "../middleware/mongoose";
import {createMocks} from "node-mocks-http";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";

jest.mock("../middleware/mongoose");
jest.mock("mongoose");
jest.mock("../models/User");

describe("Get User API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should Get An Already Existing User", async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            walletAddress: "12345",
            imgid: "testimgid",
            links: {
                instagram: "testinsta",
                twitter: "testtwitter",
            },
        };

        const {req, res} = createMocks({
            method: "POST",
            body: {walletAddress: "12345"},
        });

        await getUser(req, res);

        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(res._getStatusCode()).toBe(400);
    });


});
