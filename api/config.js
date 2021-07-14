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
            user: 'b3183215058c38',
            password: 'add55320',
            db: 'heroku_be358c470ac88c6'
        },
    }
};
module.exports = config;