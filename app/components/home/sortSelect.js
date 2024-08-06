import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function SortSelect({sortOrder, setSortOrder}) {
    return (
        <FormControl 
            sx={{width: '50%', '& .MuiOutlinedInput-root': {backgroundColor:'#fff'}}}
        >
            <InputLabel id="sort-label"> Sort By </InputLabel>
            <Select
                labelId="sort-label"
                value={sortOrder}
                label="Sort by"
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <MenuItem value="name_asc">Name Ascending</MenuItem>
                <MenuItem value="name_desc">Name Descending</MenuItem>
                <MenuItem value="quantity_asc">Quantity Ascending</MenuItem>
                <MenuItem value="quantity_desc">Quantity Descending</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SortSelect;
