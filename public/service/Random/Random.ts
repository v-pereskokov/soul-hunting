export default function randomInteger(min: number, max: number): number {
  let rand: number = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
