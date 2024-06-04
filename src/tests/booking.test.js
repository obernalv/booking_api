const request = require('supertest');
const app = require('../app'); 

  let bookingId; // Variable para almacenar el ID del City creado
  let token;

  beforeAll( async () =>{
      const credencials = {
        email: "userTest@dominio.com",
        password: "123456",
      }
      await request(app).post('/users/login').send(credencials);
      token = res.body.token;
  });

  // Test de creación de get
  test('GET show all Booking', async () => {
    const res = await request(app)
      .get('/booking');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test de creación de City
  test('POST create a new Booking', async () => {
    const newBooking ={
      checkIn: "",
      checkOut: ""
    }
    const res = await request(app)
      .post('/bookings')
      .send(newBooking);

    cityId = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.checkIn).toBe(newCity.checkIn)
  });

  // Test de obtención de City por ID
  test('Search get a Booking by id', async () => {
    const res = await request(app)
      .get(`/bookings/${bookingIdId}`)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  // Test de actualización de City
  test('Put update a Booking', async () => {
    const updBooking = {
      name: "Test booking_update"
    }
    const res = await request(app)
      .put(`/cities/${bookingId}`)
      .send(updCity);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.checkIn).toBe(updBooking.checkIn);
  });

  // Test de eliminación de City
  test('Delete delete a Booking', async () => {
    const res = await request(app)
      .delete(`/cities/${bookingId}`);

    expect(res.status).toBe(204);
  });

  // Test de verificación de eliminación
  test('should not find the deleted Booking', async () => {
    const res = await request(app)
      .get(`/cities/${bookingId}`);

    expect(res.status).toBe(404);
  });
