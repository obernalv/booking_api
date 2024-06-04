const request = require('supertest');
const app = require('../app'); 

  let reviewId; // Variable para almacenar el ID del City creado
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

  // Test de creación de get Reviews
  test('GET show all Review', async () => {
    const res = await request(app)
      .get('/reviews')
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test de creación de Reviews
  test('POST create a new Reviews', async () => {

    const newReview ={
      rating: "Test Review_create",
      comment: "Test_comment",
    }

    const res = await request(app)
      .post('/reviews')
      .send(newReview)
      .set("Authorization", `Bearer ${token}`);

      
    reviewId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rating).toBe(newReview.rating)
  });

  // Test de actualización de Reviews
  test('Put update a Review', async () => {
    const updReview = {
      name: "Test review_update"
    }
    const res = await request(app)
      .put(`/reviews/${reviewId}`)
      .send(updReview)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    //expect(res.body.rating).toBe(updReview.rating);
  });
