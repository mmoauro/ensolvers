let config = {
    development: {
        database: {
            host:   'localhost',
            user: 'root',
            password:'',
            db:     'ensolvers'
        }
    },
    production: {
        database: {
            host: 'us-cdbr-east-04.cleardb.com',
            user: 'bdfdb875fa246f',
            password: 'e51f8d14',
            db: 'heroku_667d6b641070553'
        },
    }
};
module.exports = config;