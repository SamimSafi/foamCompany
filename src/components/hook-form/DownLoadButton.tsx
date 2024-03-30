import React from 'react';
import Button from '@mui/material/Button';
interface Prop{
    filePath:string
}
const DownloadButton = ({filePath}:Prop) => {
    const handleDownload = async () => {
    
        try {
          const response = await fetch(filePath);
          const blob = await response.blob();
    
          // Create a temporary URL to the blob object
          const url = URL.createObjectURL(blob);
    
          // Create a temporary anchor element
          const link = document.createElement('a');
          link.href = url;
          link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    
          // Simulate a click event to initiate the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          // Clean up the temporary URL
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the file:', error);
        }
      };
    
      return (
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download File
        </Button>
      );
};

export default DownloadButton;