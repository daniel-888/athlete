import React from 'react';
import {Avatar, Typography, Button, Grid, Stack, Chip} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import {useDispatch, useSelector} from "store";
import {gridSpacing} from "store/constant";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getList} from "store/slices/profile";

const Preview = ({ handleNext }) => {
  const dispatch = useDispatch();
  const { athlete } = useSelector(state => state.profile);

  const handleGetList = () => {
    dispatch(getList(handleNext))
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container item spacing={gridSpacing}>
          <Grid item sx={12} md={3}>
            <Avatar
              alt={athlete.name}
              src={'http://localhost:5000/upload/avatar/'+athlete?.avatar}
              sx={{ width: 200, height: 200, borderRadius: 5 }}
            />
          </Grid>
          <Grid item sx={12} md={9}>
            <Typography variant={'h1'}>
              {athlete.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <LocationOnIcon sx={{ fontSize: 20 }}/>
              <Typography variant={'h6'}>
                {athlete.location}
              </Typography>
            </Stack>
            <Typography variant={'h5'} sx={{ mt: 1 }}>
              {athlete?.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Typography variant="h2" sx={{ mt: 2 }}>
            Personal Info
          </Typography>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">
                Gender:
              </Typography>
              <Typography gutterBottom>{athlete?.gender}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">
                Date of birth:
              </Typography>
              <Typography gutterBottom>{athlete?.dateOfBirth}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">
                Phone number:
              </Typography>
              <Typography gutterBottom>{athlete?.phone}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">
                Interests:
              </Typography>
              <Typography gutterBottom>{athlete?.interests}</Typography>
            </Stack>
          </Grid>
          <Typography variant="h2" sx={{ mt: 2 }}>
            Sports Info
          </Typography>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h5">
                Sports:
              </Typography>
              {
                athlete.sports.map((sport, index) => (
                  <Chip key={index} label={sport} />
                ))
              }
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">
                Team:
              </Typography>
              <Typography gutterBottom>{athlete?.team}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end">
          <AnimateButton>
            <Button color={'secondary'} variant="contained" sx={{ my: 3, ml: 1 }} onClick={handleGetList}>
              Next
            </Button>
          </AnimateButton>
        </Stack>
      </Grid>
    </>
  );
};

export default Preview;
