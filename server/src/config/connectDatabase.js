const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phongtro123', 'phung', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3300  // Sử dụng đúng cổng
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDatabase