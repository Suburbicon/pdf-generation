/**
 * @description converts px to pt
 * return Generic type as is to improve DX
 * @see https://react-pdf.org/styling#valid-units
 * @see https://pixelsconverter.com/px-to-pt
 */
const px = <PX extends number>(value: PX) => {
  return (value * 0.75) as PX;
};

export const CSS = {
  px,
};
