/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import sharp from "sharp";

export async function resizeImage(
  imgBlob: Buffer,
  width: number,
  height?: number,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const imgBuffer = await sharp(imgBlob)
    .resize(width, height ?? width)
    .webp({ quality: 85 })
    .toBuffer();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return imgBuffer;
}
