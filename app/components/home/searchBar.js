import { TextField, Grid } from '@mui/material';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search items..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ width: '50%', '& .MuiOutlinedInput-root': {backgroundColor:'#fff'}}}
    />
  )
}

export default SearchBar;