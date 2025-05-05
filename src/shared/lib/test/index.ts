import { pdfToPng } from 'pdf-to-png-converter';
import ReactPDF, { renderToBuffer } from '@react-pdf/renderer';

function reactPdfToImage(
  doc: React.ReactElement<ReactPDF.default.DocumentProps>
) {
  return renderToBuffer(doc).then(pdfToPng);
}

export const testLib = {
  reactPdfToImage,
};
