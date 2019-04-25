const Sequelize = require('sequelize');

const dbOptions = {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
};

const sequelize = new Sequelize(
  'book_app',
  'root',
  'password',
  dbOptions,
);

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

const Books = sequelize.define('books', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  genre: Sequelize.STRING,
  author: Sequelize.STRING,
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
},
{
  indexes: [{
    unique: true,
    fields: ['name', 'author'],
    name: 'name_author'
  }]
});

sequelize.sync();

module.exports = {
  Books
}