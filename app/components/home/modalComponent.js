import { Box, TextField, Button, Typography, Stack, Modal, Snackbar, useMediaQuery, Alert} from '@mui/material';
import React, { useState } from 'react';
import MyDropzone from './dropzone';
import { useTheme } from '@mui/material/styles';

function ModalComponent({ open, handleClose, itemName, setItemName, addItem, handleUpload, setSelectedFiles: setParentSelectedFiles}) {
  // for uploading pictures
  const [localSelectedFiles, setLocalSelectedFiles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilesSelected = (files) => {
    setLocalSelectedFiles(files); // update local state
    setParentSelectedFiles(files); // update parent state
  }

  const handleAddItem = async () => {
    if (!itemName) {
      setAlertOpen(true);
      return;
    }

    try {
      await addItem(itemName);
      if (localSelectedFiles.length > 0) {
        await handleUpload(localSelectedFiles, itemName); // upload files if any 
      }
      setLocalSelectedFiles([]);
      setParentSelectedFiles([]);
      setItemName('');
      handleClose();
    } catch (err) {
      console.error('error adding item/uploading files from modal component');
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={{ xs: '60vw', sm: '50vw', md: '50vw', lg: '50vw', xl: '40vw' }}
        maxWidth="90vw"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          // maxWidth: '100%',
        }}
      >
        <Typography variant="h6"> Add Item </Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Item name"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value)
            }}
          />
          <Button
            variant="outlined"
            onClick={handleAddItem}
            sx={{ width: { xs: '100%' } }}
          >Add</Button>
        </Stack>

        {/* pass file selection handler to MyDropzone */}
        <MyDropzone onFilesSelected={handleFilesSelected} />

        {/* alert snackbar if user has uploaded pic but not itemName */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={8000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          sx={{
            width: isSmallScreen ? '90%' : '100%',
            maxWidth: '90%', // Maximum width for larger screens
          }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            Please provide an item name!
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  )
}

export default ModalComponent;