import * as React from 'react';

// material-ui
import {Box, Button, Grid, Divider, Stack, Typography, Avatar, Tooltip} from '@mui/material';
import dayjs from "dayjs";
import Error from '@mui/icons-material/Error';
import AnimateButton from "ui-component/extended/AnimateButton";
import {useDispatch, useSelector} from "store";
import { hasError, createAthlete } from "store/slices/profile";
import { openSnackbar } from "store/slices/snackbar";
import {useEffect, useState} from "react";
import isEmpty from "utils/isEmpty";

export default function Review({handleNext, handleBack, sportsData, personalData}) {
    const { error } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [ isValid, setIsValid ] = useState(false);

    const handleSubmit = () => {
        const data = new FormData();
        data.append('file', personalData.avatarFile);
        data.append('name', personalData.name);
        data.append('gender', personalData.gender);
        data.append('dateOfBirth', personalData.dateOfBirth);
        data.append('location', personalData.location);
        data.append('phone', personalData.phone || '');
        data.append('interests', personalData.interests || '');
        data.append('description', personalData.description || '');
        if(typeof sportsData.sports === 'string') data.append('sports', sportsData.sports);
        else sportsData.sports.forEach(sport => {
            data.append('sports', sport);
        })
        data.append('team', sportsData.team || '');
        dispatch(createAthlete(data, () => {
            dispatch(
              openSnackbar({
                  open: true,
                  message: 'You created an athlete successfully',
                  variant: 'alert',
                  alert: {
                      color: 'success'
                  },
                  close: false
              })
            );
            handleNext()
        }))
    }

    const validateData = async () => {
        let errors = {};
        if(!personalData.avatarFile)
            errors = {
                ...errors,
                avatar: "Please choose image file"
            }
        if(!personalData.name || isEmpty(personalData.name))
            errors = {
                ...errors,
                name: "Please input the name"
            }
        if(!personalData.dateOfBirth || isEmpty(personalData.dateOfBirth))
            errors = {
                ...errors,
                dateOfBirth: "Please select the date of birth"
            }
        if(!personalData.location || isEmpty(personalData.location))
            errors = {
                ...errors,
                location: "Please select the location"
            }
        if(!personalData.gender || isEmpty(personalData.gender))
            errors = {
                ...errors,
                gender: "Please select the gender"
            }
        if(!sportsData.sports || isEmpty(sportsData.sports))
            errors = {
                ...errors,
                sports: "Please select the sports"
            }
        dispatch(hasError({
            ...errors,
        }))
        if(Object.keys(errors).length === 0) setIsValid(true);
    }

    useEffect(() => {
        validateData()
    }, [])

    return (
      <>
          <Divider>Personal Data</Divider>
          <Grid container>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                      <Avatar alt="User 1" src={personalData?.avatar} sx={{ width: 140, height: 140 }} />
                      {
                          error.avatar && (
                            <Tooltip placement="right" title={error?.avatar} >
                                <Error color={'error'} sx={{ fontSize: 30, position: 'absolute', top: 10, right: 10 }}/>
                            </Tooltip>
                          )
                      }
                  </Box>
              </Grid>
              <Grid item xs={12} sm={9}>
                  <Grid container>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h5">
                                  Name
                              </Typography>
                              {
                                  error.name && (
                                    <Tooltip placement="right" title={error?.name}>
                                        <Error color={'error'} sx={{ ml: 1, fontSize: 18 }}/>
                                    </Tooltip>
                                  )
                              }
                          </div>
                          <Typography gutterBottom>{personalData?.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h5">
                                  Gender
                              </Typography>
                              {
                                  error.gender && (
                                    <Tooltip placement="right" title={error?.gender}>
                                        <Error color={'error'} sx={{ ml: 1, fontSize: 18 }}/>
                                    </Tooltip>
                                  )
                              }
                          </div>
                          <Typography gutterBottom>{personalData?.gender}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h5">
                                  Date of birth
                              </Typography>
                              {
                                  error.dateOfBirth && (
                                    <Tooltip placement="right" title={error?.dateOfBirth}>
                                        <Error color={'error'} sx={{ ml: 1, fontSize: 18 }}/>
                                    </Tooltip>
                                  )
                              }
                          </div>
                          <Typography gutterBottom>{personalData.dateOfBirth ? dayjs(personalData.dateOfBirth).format('YYYY/MM/DD') : ''}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h5">
                                  Location
                              </Typography>
                              {
                                  error.location && (
                                    <Tooltip placement="right" title={error?.location}>
                                        <Error color={'error'} sx={{ ml: 1, fontSize: 18 }}/>
                                    </Tooltip>
                                  )
                              }
                          </div>
                          <Typography gutterBottom>{personalData?.location?.description}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <Typography variant="h5">
                              Phone number
                          </Typography>
                          <Typography gutterBottom>{personalData?.phone}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                          <Typography variant="h5">
                              Interests
                          </Typography>
                          <Typography gutterBottom>{personalData?.interests}</Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                          <Typography variant="h5">
                              Description
                          </Typography>
                          <Typography gutterBottom>{personalData?.description}</Typography>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }}>Sports Data</Divider>
          <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5">
                          Sports
                      </Typography>
                      {
                          error.sports && (
                            <Tooltip placement="right" title={error?.sports}>
                                <Error color={'error'} sx={{ ml: 1, fontSize: 18 }}/>
                            </Tooltip>
                          )
                      }
                  </div>
                  <Typography gutterBottom>
                      {
                          sportsData.sports ?
                            typeof  sportsData.sports === 'string' ?
                              sportsData.sports :
                              sportsData.sports.join(', ') :
                            ''
                      }
                  </Typography>
              </Grid>
              <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                      Team
                  </Typography>
                  <Typography gutterBottom>{sportsData?.team}</Typography>
              </Grid>
          </Grid>
          <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                  <AnimateButton>
                      <Button color={'secondary'} variant="outlined" sx={{ my: 3, ml: 1 }} onClick={handleBack}>
                          Back
                      </Button>
                  </AnimateButton>
                  <AnimateButton>
                      <Button color={'secondary'} variant="contained" sx={{ my: 3, ml: 1 }} disabled={!isValid} onClick={handleSubmit}>
                          Submit
                      </Button>
                  </AnimateButton>
              </Stack>
          </Grid>
      </>
    );
}
