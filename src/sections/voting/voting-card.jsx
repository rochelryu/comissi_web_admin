import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fDateByDateString } from 'src/utils/format-time';

import {routesName} from 'src/constants/routes';
import {apiUrlAsset} from 'src/constants/apiUrl';

import Iconify from 'src/components/iconify';
// import { fShortenNumber } from 'src/utils/format-number';

// import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function VotingCard({ post, index }) {
  const { cover, title, id, beginDate, endDate, display } = post;
  const router = useRouter();

  const renderTitle = (
    <Box
      component='span'
      color="inherit"
      variant="subtitle2"
      sx={{
        overflow: 'hidden',
        textDecoration: 'underline',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        typography: 'h6',
        color: 'common.black'
      }}
    >
      {title.toString().toLocaleUpperCase()}
    </Box>
  );
  

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={`${apiUrlAsset.events}/${cover}`}
      sx={{
        width: '100%',
        height: 160,
        objectFit: 'cover',
        borderRadius: 1
      }}
    />
  );

  const renderDate = (date) => (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        mr: 1,
        ml: 1,
        color: 'text.disabled',
      }}
    >
      {fDateByDateString(date)}
    </Typography>
  );

  

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Grid container>
        <Grid item xs={5} sm={5} md={5} sx={{
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={()=> {
            router.push(routesName.setDetailEvent(id));
          }}
          >
          {renderCover}
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card sx={{width: '100%', marginBottom: 1, cursor: 'pointer'}} onClick={()=> {
            router.push(routesName.setDetailEvent(id));
          }} >
          
            <Box sx={{padding: 1}}>
              <Stack direction="row" alignItems="center">
              {renderDate(beginDate)}
              -
              {renderDate(endDate)}

              </Stack>
              {renderTitle}
            </Box>
          </Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button variant="contained" onClick={(event) => { event.preventDefault()}} color="info" startIcon={<Iconify icon="iconamoon:edit-light" />}>
                Modifier
              </Button>
              <Button onClick={(event) => {
                console.log(`${display !== 0 ? 'Désactiver': 'Activer'} ${id}`);
                // event.preventDefault();
                // return false;
                }}  variant="contained" color={display !== 0 ? 'warning': 'success'} startIcon={<Iconify icon={display !== 0 ? "lets-icons:cancel-duotone": "icon-park-twotone:success"} />}>
                {display !== 0 ? 'Désactiver' : 'Activer'}
              </Button>
            </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

VotingCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
