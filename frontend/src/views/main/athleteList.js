import React from 'react';
import {
  Avatar,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {useSelector} from "store";
import dayjs from "dayjs";

const AthleteList = () => {
  const theme = useTheme()
  const { athletes } = useSelector(state => state.profile)

  return (
    <TableContainer>
      <Table
        sx={{
          '& td': {
            whiteSpace: 'nowrap'
          },
          '& td:first-of-type': {
            pl: 0
          },
          '& td:last-of-type': {
            pr: 0,
            minWidth: 260
          },
          '& tbody tr:last-of-type  td': {
            borderBottom: 'none'
          },
          [theme.breakpoints.down('xl')]: {
            '& tr:not(:last-of-type)': {
              borderBottom: '1px solid',
              borderBottomColor: theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
            },
            '& td': {
              display: 'inline-block',
              borderBottom: 'none',
              pl: 0
            },
            '& td:first-of-type': {
              display: 'block'
            }
          }
        }}
      >
        <TableBody>
          {athletes.map((athlete, index) => (
            <TableRow key={index}>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar alt="User 1" src={'http://localhost:5000/upload/avatar/'+athlete?.avatar} sx={{ width: 60, height: 60 }} />
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography align="left" variant="subtitle1">
                          {athlete.name}{' '}
                        </Typography>
                        <Typography align="left" variant="subtitle2" sx={{ whiteSpace: 'break-spaces' }}>
                          {athlete.location}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography align="left" variant="body2" sx={{ whiteSpace: 'break-spaces' }}>
                          {athlete.description ? athlete.description.slice(0, 200)+'...' : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="caption">Date of birth</Typography>
                    <Typography variant="h6">{dayjs(athlete.dateOfBirth).format('YYYY/MM/DD')}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption">Gender</Typography>
                    <Typography variant="h6">{athlete.gender}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="caption">Team</Typography>
                    <Typography variant="h6">{athlete.team || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="caption">Sports</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {
                          !!athlete.sports &&
                          athlete.sports.map((sport, index) => (
                            <Chip key={index} size={'small'} label={sport} sx={{ mr: 1 }}/>
                          ))
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AthleteList;
