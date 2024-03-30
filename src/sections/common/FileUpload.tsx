import React, { useRef, useState } from 'react';
import { Button, Typography, Box, styled } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const FileUploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
}));

interface Props {
  name?: string;
  setSelectedFile: (file: File | null) => void; // Callback function to set the selected file
}

const FileUpload = ({name,setSelectedFile }:Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFileState] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file!); // Call the parent component's setSelectedFile to set the selected file
    setSelectedFileState(file!); // Set the selected file in the FileUpload component
  };


  const setFileInputValue = (file: File | null) => {
    if (fileInputRef.current) {
      const input = fileInputRef.current;
      const fileList = file ? [file] : [];
      const dataTransfer = new DataTransfer();

      fileList.forEach((f) => {
        dataTransfer.items.add(f);
      });

      input.files = dataTransfer.files;
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <PictureAsPdfIcon fontSize="large" />;
      case 'doc':
      case 'docx':
        return <DescriptionIcon fontSize="large" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon fontSize="large" />;
      case 'svg':
        return <PictureInPictureIcon fontSize="large" />;
      default:
        return <InsertDriveFileIcon fontSize="large" />;
    }
  };

  return (
    <FileUploadContainer>
      <input
       ref={fileInputRef}
        type="file"
        name={name}
        accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .svg"
        onChange={handleFileChange}
        id="file-upload"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
      {selectedFile && (
        <Box display="flex" alignItems="center" mt={2}>
          {getFileTypeIcon(selectedFile.name.split('.').pop()!.toLowerCase())}
          <Typography variant="body1" ml={1}>
            {selectedFile.name}
          </Typography>
        </Box>
      )}
    </FileUploadContainer>
  );
};

export default FileUpload;
