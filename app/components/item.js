// displays individual inventory items and action buttons
import React from 'react';
import { Paper, Typography, Grid, Box, Stack, Button, Accordion, AccordionSummary, AccordionDetails, CardMedia } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

function Item({ name, quantity, addItem, removeItem, images }) {
    return (
        <Accordion
            sx={{ width: '100%', marginBottom: 2 }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${name}-content`}
                id={`${name}-header`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: 2,
                    width: '100%',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        minHeight: '5rem',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 2,
                        paddingRight: 5,
                        paddingLeft: 5,
                        paddingTop: 3,
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        width: '100%',
                        margin: 'auto',
                    }}
                >
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="h6" noWrap>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Typography>

                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Typography variant="h6">
                                {quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button variant="contained" color="success" onClick={(e) => { e.stopPropagation(); addItem(name) }}>
                                    Add
                                </Button>
                                <Button variant="contained" color="error" onClick={(e) => { e.stopPropagation(); removeItem(name) }}>
                                    Remove
                                </Button>
                            </Stack>

                        </Grid>

                    </Grid>



                </Paper>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: 1,
                    marginBottom: 3
                }}
            >
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <CardMedia
                            component="img"
                            key={index}
                            image={image.url}
                            alt={image.name}
                            sx={{ maxHeight: '25vh', width: 'auto', borderRadius: 1, objectFit: 'cover' }}
                        />
                    ))
                ) : (
                    <Typography sx={{ paddingBottom: 2, color: 'grey' }}>No images available.</Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
}

export default Item;


