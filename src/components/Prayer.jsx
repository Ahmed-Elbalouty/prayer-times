import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';

function Prayer(props) {
    // console.log(props);
    return (
        <Grid xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center" alignItems="center" >
            <Card sx={{ maxWidth: 350, width: "100%" }} >
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.img}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ fontSize: "30px", textAlign: "center" }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "50px", textAlign: "center" }}>
                        {props.time}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

Prayer.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default Prayer;
