module.exports = {
    PORT: "3000",
    SECRET: "</project_name>_secret",
    DATA_COLLECTION: "</project_name>",
    SESSION: {
        name: 'session_</project_name>',
        proxy: true,
        resave: true,
        secret: "session_</project_name>.secrect", // session secret
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false /*Use 'true' without setting up HTTPS will result in redirect errors*/,
        }
    },
    DEBUG: {
        server: "</project_name>"
    }
}