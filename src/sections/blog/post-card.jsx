import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import {routesName} from 'src/constants/routes';
import {apiUrlAsset} from 'src/constants/apiUrl';

import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function PostCard({ actuality, index }) {
  const { cover, title, numberVue, numberLikes, created_at, id } = actuality;
  const router = useRouter();


  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      onClick={()=> {
        router.push(routesName.setDetailEvent(id));
      }}
      sx={{
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        color: 'common.white',
        typography: 'h5', height: 60,
        
      }}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: numberVue, icon: 'eva:eye-fill' },
        { number: numberLikes, icon: 'iconamoon:like-duotone' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            opacity: 0.48,
            color: 'common.white',
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={`${apiUrlAsset.actualites}/${cover}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        opacity: 0.48,
        // color: 'common.white',
      }}
    >
      {fDate(created_at)}
    </Typography>
  );

  

  return (
    <Grid xs={12} sm={4}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.42),
              },
          }}
        >

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
              width: 1,
              bottom: 0,
              position: 'absolute',
          }}
        >
          {renderDate}

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  actuality: PropTypes.object.isRequired,
  index: PropTypes.number,
};
