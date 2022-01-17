const getDBConfig = () => {
    return {
        host: "localhost",
        database: "stonks",
        user: "web",
        password: process.env.MYSQL_PASSWORD,
    };
};

export default getDBConfig;