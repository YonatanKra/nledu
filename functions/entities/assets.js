const Sequelize = require('sequelize');



// Option 1: Passing parameters separately
const sequelize = new Sequelize('d3lhr997fs4s47', 'ztuqhnkbhhwcgl', '76bbecf6b927b8c80c00b0701f1b18b5a7cc9af29da5796945629ea230a243ad', {
  host: 'ec2-54-228-243-238.eu-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  dialectOptions : {ssl:true},
  port: '5432',
      define: {
        timestamps: false
    }
});

const Asset = require('../models/tbl_assets.js')(sequelize, Sequelize.DataTypes);
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/
  
const getRoles = ()=>{
	Asset.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});
}

getRoles();