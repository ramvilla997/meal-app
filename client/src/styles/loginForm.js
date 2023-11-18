// styles.js

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url('../assets/1.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paper: {
    marginTop: 0,
    padding: theme.spacing(4),
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    borderRadius: '10px', // Add border radius for a rounded appearance
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', // Add a shadow for depth
    background: 'rgba(255, 255, 255, 0.9)', // Add a light background color
    maxWidth: '400px', // Limit the container width for readability
    width: '90%', // Make it responsive
    textAlign: 'center', // Center align content within the container
    padding:"20%",

  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  registerLink: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
}));


export default useStyles;

