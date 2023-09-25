import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import app from '../index';
import resizeImg from '../utils/resizeImg';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('expects successful response from the /api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('expects successful response from the /api/images?query endpoint', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&w=200&h=100',
    );
    expect(response.status).toBe(200);
  });
});

describe('Test image transform', () => {
  it('creates a file with resized image', async () => {
    const newFile = path.resolve('images/thumb', `fjord_200x200.jpg`);
    if (fs.existsSync(newFile)) {
      fs.unlinkSync(newFile);
    }
    await resizeImg('fjord', 200, 200);
    expect(fs.existsSync(newFile)).toBeTruthy();
  });
});
