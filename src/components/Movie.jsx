import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import photo from "../images/nophoto.jpg"
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteMovie } from '../redux/moviesSlice';

export default function Movie({id, title, releaseDate, poster_path}) {
  const img = "https://image.tmdb.org/t/p/w500/";
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this movie?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted successfully", "", "success");
        dispatch(deleteMovie(id));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <Card>
      {poster_path ? <CardMedia
        sx={{ height: 600 }}
        image={`${img}${poster_path}`}
        title={`${title}`}
      /> : <CardMedia
      sx={{ height: 600 }}
      image={photo}
      title="nophoto"
    />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {releaseDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`movie/${id}`}><Button>Read More</Button></Link>
        <Button onClick={()=>{handleDelete(id)}} color="error">Delete movie</Button>
      </CardActions>
    </Card>
  )
}