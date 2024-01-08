import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
// import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {apiUrlAsset} from 'src/constants/apiUrl';
import {AdminStorage} from 'src/storages/admins_storage';

import Iconify from 'src/components/iconify';

// import { fDate } from 'src/utils/format-time';
// import { fShortenNumber } from 'src/utils/format-number';

// import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
export default function VotingCompetion({ post, sx }) {
  const { cover, title, id, describe } = post;
  const admin = AdminStorage.getInfoAdmin();

  const renderDescription = (
    <Link
      color="white"
      variant="subtitle2"
      underline="hover"
      onClick={()=> {
        console.log(id);
      }}
      sx={{
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        typography: 'h5',
        marginBottom: 3,
        color: 'common.whitesmoke'
      }}
    >
      {describe}
    </Link>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={`${apiUrlAsset.competitions}/${cover}`}
      sx={{
        width: '75%',
        height: 230,
        borderRadius: 3,
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
      }}
    />
  );

  return (
    <Grid item xs={12} sm={12} md={12} sx={sx}>
      <Card sx={{width: '100%', background: "linear-gradient(to left, #bc4e9c, #f80759);", height: 300, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;'}}>
        <Grid container spacing={2} padding={2} sx={{height: "100%"}}>
          <Grid item xs={6} sm={6} md={6} sx={{height: "100%"}}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
              <Avatar src={`${apiUrlAsset.avatars}/${admin.gravatars}`} alt={admin.gravatars} />
              <Typography color="white" variant="h4" sx={{marginLeft: 2}}>{title.toString().toLocaleUpperCase()}</Typography>
            </Stack>
            {renderDescription}
            <ColorButton variant='contained' startIcon={<Iconify icon="iconamoon:edit-light" />}>
              Modifier
            </ColorButton>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={{justifyContent: 'flex-end', alignItems: 'center', display:'flex' ,height: "100%"}}>
            {renderCover}
          </Grid>

        </Grid>
        

          {/* {renderInfo} */}
      </Card>
    </Grid>
  );
}

VotingCompetion.propTypes = {
  post: PropTypes.object.isRequired,
  sx: PropTypes.any,
};
