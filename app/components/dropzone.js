import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import { Grid, Alert, Snackbar, useMediaQuery, Box } from '@mui/material';
import { useTheme, theme } from '@mui/material/styles';

// handles file selection and provides previews

function MyDropzone() {
    const [previews, setPreviews] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles, fileRejections) => {
            // Handle accepted files
            const newPreviews = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setPreviews(newPreviews);

            // Handle rejected files
            if (fileRejections.length > 0) {
                setAlertOpen(true);
            }

            console.log('Accepted files:', acceptedFiles);
            console.log('Rejected files:', fileRejections);
        },
    });

    // cleanup
    React.useEffect(() => {
        return () => previews.forEach(file => URL.revokeObjectURL(file.preview));
    }, [previews]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            paddingBottom: '4vh', // Add space for the Snackbar
        }} >
            <div {...getRootProps()}
                style={{
                    border: '2px dashed #ddd',
                    padding: '2vh',
                    textAlign: 'center',
                    cursor: 'pointer',
                    paddingBottom: '1vh',
                    marginBottom: '2.5vh'
                }}
            >
                <input {...getInputProps({ capture: 'environment' })} />
                <p>Drag & drop an image here, or click to select files</p>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '1vh' }}>
                    {previews.map((file, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                            <img
                                src={file.preview}
                                alt="uploaded image preview"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        </Grid>
                    ))}
                </Grid>

                
            </div>

            {/* on drop rejected */}
            <Box > </Box>
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
                        Only image files are accepted!
                    </Alert>
                </Snackbar>
        </Box>

    );
}

export default MyDropzone;