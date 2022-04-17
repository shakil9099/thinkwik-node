process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.HOST = process.env.HOST || '127.0.0.1';
process.env.PORT = 3000;

const oEnv = {};

oEnv.dev = {
    BASE_URL: 'http://localhost:3000',
    BASE_API_PATH: 'http://localhost:3000/api/v1',
    DB_URL: 'mongodb+srv://shakil:shakil9099@cluster0.kvp24.mongodb.net/thinkwik?retryWrites=true&w=majority',
};

process.env.BASE_URL = oEnv[process.env.NODE_ENV].BASE_URL;
process.env.BASE_API_PATH = oEnv[process.env.NODE_ENV].BASE_API_PATH;
process.env.JWT_SECRET = 'jwt-secret';
process.env.DB_URL = oEnv[process.env.NODE_ENV].DB_URL;

// console.log(process.env.NODE_ENV, process.env.HOST, 'configured');
