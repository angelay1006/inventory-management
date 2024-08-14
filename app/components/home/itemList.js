import { Grid, Typography, Paper } from '@mui/material';
import Item from './item.js';

function ItemList({ inventory, addItem, removeItem }) {
    return (
        <Grid container spacing={2} justifyContent="center" 
            sx={{width: {xs:'95%', sm:'70%'},
                overflow: 'auto', 
                maxHeight: '50vh', 
                mb: '3rem', 
                mt: '1rem' }}
        >
            {inventory.length > 0 ? (
                inventory.map(item => (
                    <Grid item xs={12} sx={{ mt: '2rem', mb: '2rem', margin: 'auto' }} key={item.name}>
                        <Item 
                            name={item.name} 
                            quantity={item.quantity} 
                            addItem={addItem} 
                            removeItem={removeItem} 
                            images={item.images} // passing image prop
                        />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12} sx={{ maxWidth: '65%', width: '65%', mt: '2rem' }}>
                    <Paper sx={{ width: '100%', padding: 3, display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', elevation:2 }}>
                        <Typography variant="h6">No matches found. </Typography>
                        <Typography variant="h7" sx={{paddingTop: '1vh', color: 'gray'}}> Add some items! </Typography>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
}

export default ItemList;