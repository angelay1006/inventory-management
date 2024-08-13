import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{fontSize:'0.6rem'}}>
            {'Copyright © '}
            <Link color="inherit" href="https://angela-yeung-portfolio.vercel.app/">
                Angela Yeung
            </Link>{' '}
            {new Date().getFullYear()}
            {'. Made with Material UI :)'}
        </Typography>
    );
}

export default Copyright;