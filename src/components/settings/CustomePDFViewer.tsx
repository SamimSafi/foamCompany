type Props = {
  pdfData?: any;
};

function CustomePDFViewer({ pdfData }:Props) {
    return (
      <iframe
        id="pdfIframe"
        title="PDF Viewer"
        style={{
          width: '100%',
          height: '800px',
          border: '3px',
          borderStyle: 'dotted',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
        }}
        src={`data:application/pdf;base64,${pdfData}`}
      />
    );
  }
  export default CustomePDFViewer;