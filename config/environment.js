
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbUri = process.env.MONGODB_URI || `mongodb://localhost/rest-comments-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'YghT5s617/1{%sDt';

module.exports = { port, env, dbUri, sessionSecret };
