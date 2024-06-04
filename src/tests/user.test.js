const request = require('supertest');
const app = require('../app');

  let userId; // Variable para almacenar el ID del User creado
  let token;

    // Test de creación de User
    test('POST create a new User', async () => {
      const newUser ={
        firstName: 'firt test_user',
        lastName: 'last test_user',
        email: 'test_user@dominio.com',
        password: '123456',
        gender: 'other'
      }
      const res = await request(app)
        .post('/users')
        .send(newUser);
  
      userId = res.body.id;
      expect(res.status).toBe(201);
      expect(res.body).toBeDefined();
      expect(res.body.firstName).toBe(newUser.firstName)
    });

    //Test Login
    test('POST /user/login debe loggear al usuario', async () => {
      const credencials = {
        email: 'test_user@dominio.com',
        password: '123456'
      }
      const rpta = await request(app)
      .post('/users/login')
      .send(credencials);
      token = rpta.body.token;
      expect(rpta.status).toBe(200);
      expect(rpta.body.token).toBeDefined();
      expect(rpta.body.user.email).toBe(credencials.email);
    });

    
  // Test de creación de get
  test('GET show all User', async () => {
    const res = await request(app)
      .get('/users')
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    //console.log(res.body);
  });

  // Test de actualización de User
  test('Put update a User', async () => {
    const updUser = {
      firstName: 'test update_user'
    }
    const res = await request(app)
      .put(`/users/${userId}`)
      .send(updUser)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.firstName).toBe(updUser.firstName);
  });

//verificar
  test('POST', async () => { 
    const credencials = {
      email: 'incorrrecto@domini.com',
      password: '5615165'
    }
    const res = await request(app).post('/users/login')
    .send(credencials);

    expect(res.status).toBe(401);
  });

  // Test de eliminación de User
  test('Delete delete a User', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
  });

