import PropTypes from 'prop-types';

// material-ui
import {
    Button,
    Grid,
    Stack,
    Typography,
    TextField,
    Avatar,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const PersonalForm = ({ personalData, setPersonalData, handleNext, errors }) => {
    const handleFileChange = ({ target }) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setPersonalData({
                ...personalData,
                avatar: e.target.result,
                avatarFile: target.files[0]
            });
        };
    };

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Personal Information
            </Typography>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={4}>
                    <SubCard title="Photo" contentSX={{ textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <Avatar alt="User 1" src={personalData?.avatar} sx={{ width: 150, height: 150, margin: '0 auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Upload/Change Your Profile Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color={personalData.avatar ? 'primary' : 'secondary'}
                                    component={'label'}
                                    size="small"
                                >
                                    {personalData.avatar ? 'Change file' : 'Choose file'}
                                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} hidden />
                                </Button>
                                {personalData.avatar && (
                                    <Button
                                        variant={'outlined'}
                                        size="small"
                                        onClick={() =>
                                            setPersonalData({
                                                ...personalData,
                                                avatar: null,
                                                avatarFile: null
                                            })
                                        }
                                        sx={{ margin: 1 }}
                                    >
                                        {' '}
                                        Reset{' '}
                                    </Button>
                                )}
                            </AnimateButton>
                            {errors.avatar && (
                                <FormHelperText error sx={{ textAlign: 'center' }}>
                                    {errors.avatar}
                                </FormHelperText>
                            )}
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item sm={12} md={8}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="name"
                                fullWidth
                                label="Name"
                                value={personalData?.name}
                                onChange={(e) =>
                                    setPersonalData({
                                        ...personalData,
                                        name: e.target.value
                                    })
                                }
                                error={Boolean(errors?.name)}
                                helperText={errors?.name}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personalData?.gender}
                                    defaultValue={'Male'}
                                    onChange={(e) =>
                                        setPersonalData({
                                            ...personalData,
                                            gender: e.target.value
                                        })
                                    }
                                    label={'Gender'}
                                    sx={{ width: '100%' }}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="YYYY/MM/DD"
                                value={personalData?.dateOfBirth}
                                onChange={(date) => {
                                    setPersonalData({
                                        ...personalData,
                                        dateOfBirth: date
                                    });
                                }}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="location"
                                fullWidth
                                label="Location"
                                value={personalData?.location}
                                onChange={(e) =>
                                    setPersonalData({
                                        ...personalData,
                                        location: e.target.value
                                    })
                                }
                                error={Boolean(errors?.location)}
                                helperText={errors?.location}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phone"
                                fullWidth
                                label="Phone number"
                                value={personalData?.phone}
                                onChange={(e) =>
                                    setPersonalData({
                                        ...personalData,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="interests"
                                fullWidth
                                label="Interests"
                                value={personalData?.interests}
                                onChange={(e) =>
                                    setPersonalData({
                                        ...personalData,
                                        interests: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                fullWidth
                                value={personalData?.description}
                                onChange={(e) =>
                                    setPersonalData({
                                        ...personalData,
                                        description: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent={'flex-end'}>
                                <AnimateButton>
                                    <Button color={'secondary'} variant="contained" onClick={handleNext}>
                                        Next
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

PersonalForm.propTypes = {
    personalData: PropTypes.object,
    setPersonalData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default PersonalForm;
