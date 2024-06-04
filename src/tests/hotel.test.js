const request = require('supertest');
const app = require('../app'); 

  let hotelId; // Variable para almacenar el ID del City creado
  let token;

  beforeAll( async () =>{
      const credencials = {
        email: "userTest@dominio.com",
        password: "123456"
      }
      const res = await request(app)
                  .post('/users/login')
                  .send(credencials)
                  .set("Authorization", `Bearer ${token}`);
      token = res.body.token;

  });

  // Test de creación de get
  test('GET show all Hotel', async () => {
    const res = await request(app)
      .get(`/hotels/${hotelId}`);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
  });

  // test('GET  show Hotel for id/name', async () => {
  //   const res = await request(app)
  //     .get(`/hotels/${hotelId}`);

  //     expect(res.status).toBe(200);
  //     expect(res.body).toBeInstanceOf(Array);
  // });

  // Test de creación de Hotels
  test('POST create a new Hotels', async () => {
    const newHotel ={
      name: "Test Hotel_create",
      description: "Test_description",
      price: 1.00,
      address: "test_city",
      lat: 154.11,
      lon: 4111.56
    }
    const res = await request(app)
      .post('/hotels')
      .send(newHotel)
      .set("Authorization", `Bearer ${token}`);

    hotelId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newHotel.name)
  });


  // Test de actualización de Hotels
  test('Put update a hotel', async () => {
    const updHotel = {
      name: "Test hotel_update"
    }
    const res = await request(app)
      .put(`/hotels/${hotelId}`)
      .send(updHotel)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(updHotel.name);
  });

   // Test de eliminación de Hotel
  test('Delete delete a Hotel', async () => {
    const res = await request(app)
      .delete(`/hotels/${hotelId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
