import PropTypes from 'prop-types';

// material-ui
import {
    Button,
    Grid,
    Stack,
    Typography,
    FormControl,
    OutlinedInput,
    Select,
    InputLabel,
    MenuItem,
    TextField, FormHelperText
} from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import {useSelector} from "store";

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const SportsForm = ({ sportsData, setSportsData, handleNext, handleBack, errors }) => {
    const { sports } = useSelector(state => state.profile);

    return (
      <>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Sports Information
          </Typography>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <FormControl sx={{ width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Sports</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={sportsData.sports || []}
                        onChange={e => setSportsData({
                            ...sportsData,
                            sports: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                        })}
                        input={<OutlinedInput label="Sports" />}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 48 * 4.5 + 8,
                                    width: 250,
                                },
                            },
                        }}
                      >
                          {sports.map((sport) => (
                            <MenuItem
                              key={sport.label}
                              value={sport.label}
                            >
                                {sport.label}
                            </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                  {errors.sports && (
                    <FormHelperText error>
                        {errors.sports}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Team name"
                    value={sportsData?.team}
                    onChange={(e) => setSportsData({
                        ...sportsData,
                        team: e.target.value
                    })}
                    error={Boolean(errors?.team)}
                    helperText={errors?.team}
                  />
              </Grid>
              <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between">
                      <AnimateButton>
                          <Button color={'secondary'} variant="outlined" sx={{ my: 3, ml: 1 }} onClick={handleBack}>
                              Back
                          </Button>
                      </AnimateButton>
                      <AnimateButton>
                          <Button color={'secondary'} variant="contained" sx={{ my: 3, ml: 1 }} onClick={handleNext}>
                              Next
                          </Button>
                      </AnimateButton>
                  </Stack>
              </Grid>
          </Grid>
      </>
    );
};

SportsForm.propTypes = {
    sportsData: PropTypes.object,
    setSportsData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default SportsForm;
