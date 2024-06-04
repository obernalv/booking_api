const request = require('supertest');
const app = require('../app'); 

  let imageId; // Variable para almacenar el ID del image creado
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
  test('GET show all image', async () => {
    const res = await request(app)
      .get('/images')
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test de creación de image
  test('POST create a new image', async () => {
    // if (!req.file) return res.status(400).json({message: "Envie la imagen"})
    // const {url} = await uploadToCloudinary(req.file);

    const newImage = {
       url: "abc.png"
    }
    const res = await request(app)
      .post('/images')
      .send(newImage)
      .set("Authorization", `Bearer ${token}`);

      console.log(res.body);

    imageId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.url).toBe(newImage.url);
  });



  // Test de eliminación de image
  test('Delete delete a image', async () => {
    const res = await request(app)
      .delete(`/images/${imageId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
