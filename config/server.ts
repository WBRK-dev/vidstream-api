import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4030;
export const URL = process.env.URL || `http://localhost:${PORT}`;