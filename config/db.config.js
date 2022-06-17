const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    HOST: process.env.DB_HOST ,
    USER: process.env.DB_USER ,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
};

module.exports = config;