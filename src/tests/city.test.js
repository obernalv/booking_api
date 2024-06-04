const request = require('supertest');
const app = require('../app'); 

  let cityId; // Variable para almacenar el ID del City creado
  let token;

  beforeAll( async () =>{
      const credencials = {
        email: "userTest@dominio.com",
        password: "123456",
      }
      const res = await request(app)
                  .post('/users/login')
                  .send(credencials)
                  .set("Authorization", `Bearer ${token}`);
      token = res.body.token;

  });

  // Test de creación de get
  test('GET show all City', async () => {
    const res = await request(app)
      .get('/cities')
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test de creación de City
  test('POST create a new City', async () => {
    const newCity ={
      name: "Test City_create",
      country: "Test_country",
      countryId:"Tes"
    }
    const res = await request(app)
      .post('/cities')
      .send(newCity)
      .set("Authorization", `Bearer ${token}`);

    cityId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCity.name)
  });


  // Test de actualización de City
  test('Put update a City', async () => {
    const updCity = {
      name: "Test city_update"
    }
    const res = await request(app)
      .put(`/cities/${cityId}`)
      .send(updCity)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(updCity.name);
  });

  // Test de eliminación de City
  test('Delete delete a City', async () => {
    const res = await request(app)
      .delete(`/cities/${cityId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

