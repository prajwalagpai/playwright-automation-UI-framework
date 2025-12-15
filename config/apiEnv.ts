import dotnev from 'dotenv';
dotnev.config();

export const REQRES_API_KEY = process.env.Reqres_API_KEY || '';

if (!REQRES_API_KEY) {
    throw new Error('REQRES_API_KEY environment variable is required');
};

