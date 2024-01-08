import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ConsumApi from 'src/services_workers/consum_api';
import {AdminStorage} from 'src/storages/admins_storage';

import Iconify from 'src/components/iconify';

import VotingCard from '../voting-card';
// import PostSearch from '../../blog/post-search';
import VotingCompetion from '../voting-competition';
import CreateVotingSystem from '../create-voting-system';
// ----------------------------------------------------------------------

export default function VotingView() {
  const [isFetching, setFetch] = useState(true);
  const [loadCreateComponent, setLoadCreateComponent] = useState(false);
  const [levelCreateComponent, setLevelCreateComponent] = useState(0);
  const [competition, setCompetition] = useState({});
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    loadInfo();
    window.scrollTo(0, 0);
  }, []);

  const loadInfo = async () => {
    const {success, data} = await ConsumApi.getCompisition();
    console.log(data);
    if(success) {
      if(data.length === 0) {
        setLoadCreateComponent(true);
        setLevelCreateComponent(0);
        setFetch(false);
      } else if (data.length > 0 && data[0].events.length === 0) {
        setLoadCreateComponent(true);
        setLevelCreateComponent(1);
        // eslint-disable-next-line no-unused-vars
        const {events, ...rest} = data[0];
        setCompetition(rest);
        AdminStorage.saveCompetition(rest);
        setFetch(false);
      } else if(data.length > 0 && data[0].events.length > 0) {
        setLoadCreateComponent(false);
        setLevelCreateComponent(2);
        const {events, ...rest} = data[0];
        setCompetition(rest);
        setEditions(events);
        // AdminStorage.saveCompetition(rest);
        setFetch(false);
      }
    }
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>Compétitions & Évènements de votes</Typography>

      {!isFetching && !loadCreateComponent && (
        <>
          <VotingCompetion  post={competition} index={2} sx={{marginBottom: 2}} />

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            {/* <PostSearch posts={posts} /> */}
            <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
              Ajouter Évènement
            </Button>
          </Stack>


          <Grid container spacing={2}>

            {editions.map((edition, index) => (
              <VotingCard key={`edition-${edition.id}`} post={edition} index={index} />
            ))}
          </Grid>
        </>
      )}

      {isFetching && (
        <>
          <Card sx={{width: '100%', height: 300, marginBottom: 2}} >
            <Skeleton variant="rectangular" width="100%" height="100%" animation="pulse" />
          </Card>
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
           <Skeleton variant="rectangular" sx={{width: '18%' , height: 50, borderRadius: 1, marginRight: 2}} animation="pulse" />
           <Skeleton variant="rectangular" sx={{width: '12%' , height: 37, borderRadius: 1}} animation="pulse" />
          </Stack>

          <Grid container spacing={2} sx={{width: '100%'}}>

            {Array.from(new Array(4)).map((item, index) => (
              <Grid key={`skeleton-${index}`} item xs={12} sm={6} md={6}>
                <Stack direction="row" alignItems="flex-start" justifyContent="flex-start">
                  <Skeleton variant="rectangular" sx={{width: '40%' , height: 160, borderRadius: 1, marginRight: 2}} animation='wave' />
                  <Skeleton variant="rectangular" sx={{width: '50%' , height: 100, borderRadius: 1}} animation='wave' />
                </Stack>
                  
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {!isFetching && loadCreateComponent && (
        <CreateVotingSystem levelActiveStep={levelCreateComponent}  />
      )}

    </Container>
  );
}
