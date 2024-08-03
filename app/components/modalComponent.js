import { Box, TextField, Button, Typography, Stack, Modal } from '@mui/material';
import MyDropzone from './dropzone.js';

function ModalComponent({open, handleClose, itemName, setItemName, addItem}) {
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
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              sx={{width: {xs:'100%'}}}
            >Add</Button>
          </Stack>

          <MyDropzone/>
        </Box>
      </Modal>
    )
}

export default ModalComponent;