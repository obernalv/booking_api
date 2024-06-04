const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');


const main = async() => {

    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        //se creo para utilizarlo en todos los test
        const testUser = {
            firstName: "userTest_global",
            lastName: "userTest_global",
            email: "userTest@dominio.com",
            password: "123456",
            gender: "other"
        }

        const user = await User.findOne({Where: {email: testUser.email}});
        if(!user){
            await request(app).post('/users').send(testUser);
        }
        

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();