import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0), // Add spacing on the top and bottom
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checkbox: {
    marginLeft: theme.spacing(1), // This will ensure checkboxes are not clubbed with labels
  },
  submitButton: {
    marginTop: theme.spacing(3), // Increase spacing above the submit button
    marginBottom: theme.spacing(2), // Add some spacing below the submit button
  },
  formGroup: {
    border: '1px solid #ccc', // Optional: add a border around the form group
    borderRadius: theme.shape.borderRadius, // Use theme's border radius
    padding: theme.spacing(2), // Add padding inside the form group
    marginBottom: theme.spacing(2), // Add spacing below the form group
  },
  formLabel: {
    marginBottom: theme.spacing(1), // Add spacing below the form label
  },
  paper: {
    padding: theme.spacing(3), // Added padding for the paper
    marginBottom: theme.spacing(3), // Added margin below the paper
  },
}));

export default useStyles;
