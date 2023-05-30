import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
interface FormData {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

export const DishForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);

    try {
      const response = await axios.post(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
    navigate('/dishes-app/success');
  };

  const selectedDishType = watch('type');

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ maxWidth: 400 }}>
          <TextField
            sx={{ marginBottom: '10px' }}
            label="Dish Name"
            {...register('name', { required: true })}
            error={!!errors.name}
            fullWidth={true}
            helperText={errors.name ? 'Dish Name is required' : ''}
          />
          <TextField
            sx={{ marginBottom: '10px' }}
            label="Preparation Time (hh:mm:ss)"
            {...register('preparation_time', {
              required: true,
              pattern: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
            })}
            fullWidth={true}
            error={!!errors.preparation_time}
            helperText={
              errors.preparation_time
                ? 'Invalid preparation time format (hh:mm:ss)'
                : ''
            }
          />
          <FormControl fullWidth>
            <InputLabel>Dish Type</InputLabel>
            <Select
              label="Dish Type"
              {...register('type', { required: true })}
              error={!!errors.type}
              sx={{ marginBottom: '10px' }}
              defaultValue=""
            >
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="sandwich">Sandwich</MenuItem>
            </Select>
          </FormControl>
          {selectedDishType === 'pizza' ? (
            <>
              <TextField
                label="Number of Slices"
                {...register('no_of_slices', { required: true })}
                error={!!errors.no_of_slices}
                sx={{ marginBottom: '10px' }}
                helperText={
                  errors.no_of_slices ? 'Number of slices is required' : ''
                }
              />
              <TextField
                label="Diameter"
                {...register('diameter', {
                  required: true,
                  pattern: /^\d+(\.\d+)?$/,
                })}
                sx={{ marginBottom: '10px' }}
                error={!!errors.diameter}
                helperText={errors.diameter ? 'Invalid diameter format' : ''}
              />
            </>
          ) : selectedDishType === 'soup' ? (
            <TextField
              label="Spiciness Scale(1-10)"
              {...register('spiciness_scale', {
                required: true,
                pattern: /^(10|[1-9])$/,
              })}
              sx={{ marginBottom: '10px' }}
              error={!!errors.spiciness_scale}
              helperText={
                errors.spiciness_scale ? 'Invalid spiciness scale (1-10)' : ''
              }
            />
          ) : (
            selectedDishType === 'sandwich' && (
              <TextField
                label="Slices of Bread Required"
                {...register('slices_of_bread', { required: true })}
                error={!!errors.slices_of_bread}
                helperText={
                  errors.slices_of_bread
                    ? 'Slices of bread required is required'
                    : ''
                }
              />
            )
          )}{' '}
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: '1rem' }}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
