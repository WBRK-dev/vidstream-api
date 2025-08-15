import dotenv from 'dotenv';
dotenv.config();

export const EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/firefox';