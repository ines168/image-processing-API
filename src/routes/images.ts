import express from 'express';
import { promises as fsPromises } from 'fs';
import resizeImg from '../utils/resizeImg';

const router = express.Router();

router.get('/api', async (req, res, next) => {
  try {
    const images = await fsPromises.readdir('images/full');
    res.render('index', { images });
  } catch (error) {
    next(error);
  }
});

router.get('/api/images', async (req, res, next) => {
  try {
    // const {filename, w, h}: {filename:string, w:number, h:number} = req.query; destructuring doesnt work
    const filename = req.query.filename as string;
    const w = req.query.w as unknown as number;
    const h = req.query.h as unknown as number;
    if (!filename || !w || !h) {
      req.flash('error', 'You must provide filename, width and height!');
      return res.redirect('/api');
    }
    const newFile = await resizeImg(filename, w, h);
    res.sendFile(newFile, { root: __dirname + '/../../' });
  } catch (error) {
    next(error);
  }
});

export default router;
