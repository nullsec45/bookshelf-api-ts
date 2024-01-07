import { Request } from 'express';

type User = {
    id: number;
    email: string;
    name: string;
};

type AuthenticatedRequest = Request & {
    user?: {
        sub: number;
        name: string;
        email: string;
        iat: number;
        exp: number;
    };
};
