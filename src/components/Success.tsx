import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();

  const handleSubmitAnotherDish = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        width: '500px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '2rem',
        margin: 'auto',
      }}
    >
      <Box sx={{ maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Success!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your dish has been submitted successfully.
        </Typography>
        <Button
          variant="contained"
          onClick={handleSubmitAnotherDish}
          sx={{ marginTop: '1rem' }}
        >
          Submit Another Dish
        </Button>
      </Box>
    </Box>
  );
};
