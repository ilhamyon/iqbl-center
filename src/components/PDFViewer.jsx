import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file, scale }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale || 1} />
      </Document>
      <p className="text-center text-xs mt-2">
        Page {pageNumber} of {numPages}
      </p>
      <div className="flex justify-center space-x-2 mt-2">
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
        )}
        {pageNumber < numPages && (
          <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
