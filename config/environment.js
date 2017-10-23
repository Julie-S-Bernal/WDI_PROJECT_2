
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbUri = process.env.MONGODB_URI || `mongodb://localhost/project-2-tea${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'YghTjhbjhb5s617/1{%sDt';

module.exports = { port, env, dbUri, sessionSecret };
