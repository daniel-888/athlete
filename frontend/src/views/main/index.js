import React, { useEffect } from 'react';

// material-ui
import { Button, Box, Step, Stepper, StepLabel, Stack, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserIcon from '@mui/icons-material/Person';
import SportsIcon from '@mui/icons-material/SportsScore';
import SummaryIcon from '@mui/icons-material/Summarize';
import PreviewIcon from '@mui/icons-material/Visibility';
// project imports
import PersonalForm from './PersonalForm';
import SportsForm from './SportsForm';
import Review from './Review';
import Preview from './Preview';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';
import AthleteList from './athleteList';
import { useDispatch, useSelector } from '../../store';
import { getSports } from 'store/slices/profile';

const StepContent = styled('main')(() => ({
    paddingRight: '10px',
    maxHeight: '75vh',
    minHeight: '75vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '0.4em',
        left: '-100px'
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
        borderRadius: '2px'
    }
}));

// step options
const steps = ['Personal Information', 'Sports Information', 'Summary', 'Profile'];

const getStepContent = (step, handleNext, handleBack, personalData, setPersonalData, sportsData, setSportsData, errors) => {
    switch (step) {
        case 0:
            return <PersonalForm handleNext={handleNext} personalData={personalData} setPersonalData={setPersonalData} errors={errors} />;
        case 1:
            return (
                <SportsForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    personalData={personalData}
                    sportsData={sportsData}
                    setSportsData={setSportsData}
                    errors={errors}
                />
            );
        case 2:
            return (
                <Review
                    handleNext={handleNext}
                    handleBack={handleBack}
                    errors={errors}
                    personalData={personalData}
                    sportsData={sportsData}
                />
            );
        case 3:
            return <Preview handleNext={handleNext} />;
        default:
            throw new Error('Unknown step');
    }
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.grey[700],
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary[800]} 50%, ${theme.palette.secondary.dark} 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    }),
    ...(ownerState.completed && {
        backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary[800]} 50%, ${theme.palette.secondary.dark} 100%)`
    })
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <UserIcon />,
        2: <SportsIcon />,
        3: <SummaryIcon />,
        4: <PreviewIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = () => {
    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:900px)');
    const [activeStep, setActiveStep] = React.useState(0);
    const [personalData, setPersonalData] = React.useState({
        dateOfBirth: Date.now(),
        gender: 'Male'
    });
    const [sportsData, setSportsData] = React.useState({});
    const { error } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getSports());
    }, []);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Grid container item>
            <Grid item xs={12} md={3}>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} orientation={matches ? 'vertical' : 'horizontal'}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item xs={12} md={9}>
                {activeStep === steps.length ? (
                    <StepContent>
                        <AthleteList />
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        setPersonalData({
                                            gender: 'Male',
                                            dateOfBirth: Date.now()
                                        });
                                        setSportsData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Init Form
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </StepContent>
                ) : (
                    <StepContent>
                        {getStepContent(
                            activeStep,
                            handleNext,
                            handleBack,
                            personalData,
                            setPersonalData,
                            sportsData,
                            setSportsData,
                            error
                        )}
                    </StepContent>
                )}
            </Grid>
        </Grid>
    );
};

export default ValidationWizard;
