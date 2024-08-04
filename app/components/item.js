// displays individual inventory items and action buttons
import React from 'react';
import { Paper, Typography, Stack, Button, Accordion, AccordionSummary, AccordionDetails, CardMedia } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Item({ name, quantity, addItem, removeItem }) {
    return (
        <Paper
            sx={{
                minHeight: '9rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 3,
                borderRadius: 1,
                boxShadow: 1,
                width: '100%',
                margin: 'auto',
            }}
        >
            <Typography variant="h6">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h6">
                {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" onClick={() => addItem(name)}>
                    Add
                </Button>
                <Button variant="contained" color="error" onClick={() => removeItem(name)}>
                    Remove
                </Button>
            </Stack>
        </Paper>
    );
}

export default Item;

