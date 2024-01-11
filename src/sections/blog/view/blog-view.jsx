import { message } from 'antd';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { posts } from 'src/_mock/blog';
import {routesName} from 'src/constants/routes';
import ConsumApi from 'src/services_workers/consum_api';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
// ----------------------------------------------------------------------

export default function BlogView() {
  const router = useRouter();

  const [actualities, setActualities] = useState([]);
  const [isFetching, setFetch] = useState(true);

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const allActuality = await ConsumApi.getAllActuality();
    if(allActuality.success) {
      setActualities(allActuality.data);
      setFetch(false);
    } else {
      message.error(allActuality.message);
      if(allActuality.message === "Session Expiré veuillez vous réconnecter") {
        setTimeout(() => {
          router.reload();
        }, 1000);
      }
    }
    
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Actualités</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={
          () => {router.push(routesName.createActuality);}
          }
        >
          Ajouter
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Recent' },
            { value: 'popular', label: 'Populaire' },
            { value: 'oldest', label: 'Ancien' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {
        isFetching ?
        (Array.from(new Array(9))).map((item, index) => (
          <Grid key={`skeleton-${index}`} xs={12} sm={6} md={3}>
            <Card sx={{width: '100%', height: 400, marginBottom: 2}} >
              <Skeleton variant="rectangular" width="100%" height="100%" animation="pulse" />
            </Card>
          </Grid>
        ))
        :
        actualities.map((actuality, index) => (
          <PostCard key={actuality.id} actuality={actuality} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
