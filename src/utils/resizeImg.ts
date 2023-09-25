import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';

const resizeImg = async (
  name: string,
  width: number,
  height: number,
): Promise<string> => {
  const img = `images/full/${name}.jpg`;
  const newFile = `images/thumb/${name}_${width}x${height}.jpg`;
  try {
    // check if image already exists in the output folder
    const files = await fsPromises.readdir('images/thumb');
    const fileName = path.basename(newFile);
    if (!files.includes(fileName)) {
      await sharp(img).resize(Number(width), Number(height)).toFile(newFile);
    }
  } catch (e) {
    console.log('Something went wrong!');
  }
  return newFile;
};

export default resizeImg;
