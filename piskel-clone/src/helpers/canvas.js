import { colors } from '../assets/data';

const createMatrix = (matrixLength, matrix = []) =>
{
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) => Array.from({ length: matrixLength }, (newVal, index) => ({
    id: ind * matrixLength + index,
    width: 512 / matrixLength,
    place: { row: ind, column: index },
    color: matrix.length ? matrix[ind * matrixLength + index].color : colors[0],
  })));
  return modifiedArray.reduce((a, b) => a.concat(b));
};

export { createMatrix };


const drawOnCanvas = (ctx, part, color, frameSize) =>
{
  const minX = part.width * part.place.column;
  const minY = part.width * part.place.row;
  const element = part;
  ctx.fillStyle = color;
  ctx.fillRect(
    minX / (frameSize ? 0.5 : 4),
    minY / (frameSize ? 0.5 : 4),
    element.width / (frameSize ? 0.5 : 4),
    element.width / (frameSize ? 0.5 : 4),
  );
};


const framesUpdater = (frames, element) => frames.map((frame) =>
{
  if (frame.id === element.id)
  {
    return element;
  }
  return frame;
});

// const drawOnCanvas = (ctx, place, color = colors[0], frames) => {
//   const minX = place.width * place.place.column;
//   const minY = place.width * place.place.row;
//   const element = place;
//   element.color = color;
//   ctx.fillStyle = color;
//   ctx.clearRect(minX, minY, element.width, element.width);
//   ctx.fillRect(minX, minY, element.width, element.width);
//   if (frames) {
//     updatedFrames = frames.map((frame) => {
//       if (frame.id === element.id) {
//         return element;
//       }
//       return frame;
//     });
//   }
// };
