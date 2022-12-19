import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as LinkMUI,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CustomInput } from 'app/components/CustomInput';
import useStyles from './styles';
import { useForm } from 'hooks/useForm';
import { updateMovie, useGetAllMovies, useGetMovieById } from 'queries/movies';
import { usegetActors } from 'queries/actors';
import { useGetNationalities } from 'queries/nationality';
import { useGetDirectors } from 'queries/directors';
import { useGetCategories } from 'queries/categories';
import { useGetAllRooms, useGetRooms, useUpdateRoom } from 'queries/rooms';
import { notify } from 'app/components/MasterDialog';
import { useUpdatePrice } from 'queries/prices';
import { formatDate, formatHour, Dayof } from 'utils/date';
export default function UpdatePriceDialog(props: any) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };
    if ('startTime' in fieldValues) {
      tmp.startTime = '';
      const today = new Date();
      if (fieldValues.startTime > today) tmp.startTime = '';
    }
    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every(x => x == '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      id: 0,
      value: 0,
      type: '2D',
    },
    true,
    validate,
  );

  const update = useUpdatePrice(values.id.toString(), parseInt(values.value));

  const handleCloseDialog = () => {
    props.onClose();
  };

  const handleUpdatePrice = () => {
    update.refetch();
    handleCloseDialog();
  };
  console.log(values);

  useEffect(() => {
    if (props.data.id !== 0) {
      setValues({
        ...values,
        id: props.data.id,
        value: props.data.value.toString(),
        type: props.data.type,
        dayCode: props.data.dayCode,
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (update.isSuccess) {
      setTimeout(() => {
        notify({
          type: 'success',
          content: 'Thay đổi giá vé thành công',
          autocloseDelay: 1500,
        });
      }, 100);
      props.refetch();
      update.remove();
    }

    if (update.isError) {
      setTimeout(() => {
        notify({
          type: 'error',
          content: 'Thay đổi thất bại',
          autocloseDelay: 1500,
        });
      }, 100);
      update.remove();
    }
  });
  function Dayof(dayCode: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="xs"
      scroll="paper"
    >
      <Box className={classes.EditRoomBox}>
        <Typography
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Thay đổi giá vé
        </Typography>
        <DialogContent>
          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Ngày"
                name="dayCode"
                disabled
                value={Dayof(values?.dayCode)}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Loại phòng"
                name="type"
                disabled
                value={values.type}
              />
            </Grid>
          </Grid>
          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={12} item={true}>
              <CustomInput.TextField
                label="Giá mới"
                name="value"
                type="number"
                value={values?.value}
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Grid item={true} container xs={12} spacing={2}>
          <Grid item={true} xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
              disableFocusRipple
              className={classes.CancelButton}
              onClick={handleCloseDialog}
            >
              Hủy thao tác
            </Button>
          </Grid>
          <Grid item={true} xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
              disableFocusRipple
              className={classes.EditRoomButton}
              onClick={handleUpdatePrice}
            >
              Thay đổi giá vé
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
