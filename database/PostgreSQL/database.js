const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('images', 'postgres', 'Wantagh1!@#', {
  host: 'localhost',
  dialect: 'postgres'
});

let x = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

x()