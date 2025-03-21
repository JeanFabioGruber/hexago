import request from 'supertest';
import { app } from '../../src/index'; // Ou 'import app from '../../src/index';' se o app for exportado como default

describe('Testando a rota raiz', () => {
  test('Deve responder ao método GET com status 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });
});
