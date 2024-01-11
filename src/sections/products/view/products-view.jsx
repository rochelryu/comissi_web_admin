import { message } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContentText from '@mui/material/DialogContentText';

import { useRouter } from 'src/routes/hooks';

import ConsumApi from 'src/services_workers/consum_api';

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';

export default function ProductsView() {
  // const [checked, setOpenFilter] = useState(false);
  const { eventId } = useParams();
  const router = useRouter();
  const [openCreateDepartement, setOpenCreateDepartement] = useState(false);

  const [isFetching, setFetch] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDisplay, toogleDisplay] = useState(false);
  const [event, setEvent] = useState({});
  const [ranking, setRanking] = useState('');
  const [indexToEdit, setIndexToEdit] = useState(-1);
  const [nominateId, setNominateId] = useState('');
  

  const alert = ({type, content}) => {
    messageApi.open({
      type,
      content,
    });
  };
  
  useEffect(() => {
    loadInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInfo = async () => {
    const {success, data} = await ConsumApi.getDetailsEvent({eventId});
    if(success) {
      setEvent(data[0]);
      toogleDisplay(data[0].display === 1);
      setFetch(false);
    }
  }

  const toogleDisplayEvent = async () => {
    const nominateWithoutRanking = event.candidates.filter((candidate) => !candidate.pivot.ranking)
    if(nominateWithoutRanking.length === 0) {
      toogleDisplay((prev) => !prev);
      await ConsumApi.toogleEvent({event_id:eventId, display: !isDisplay});
    } else {
      alert({type: 'error', content: "Veuillez renseigner le numero de toutes les dauphines d'abiord"});
    }

  }

  const handleToogleDialogCreateDepartement = () => {
    setOpenCreateDepartement(!openCreateDepartement);
  };

  const createNumeroDauphine = async () => {
    const {candidates} = event;
    candidates[indexToEdit].pivot.ranking = ranking;

    setEvent({...event, candidates});
    handleToogleDialogCreateDepartement();
    await ConsumApi.setNumberNominate({event_id:eventId, ranking, candidate_id: nominateId});
  };

  const setNumberNominate = ({rankingNumber, idCandidate, index}) => {
    setNominateId(idCandidate);
    setRanking(rankingNumber);
    setIndexToEdit(index);
    handleToogleDialogCreateDepartement();
  };

  return (
    <Container>
      {contextHolder}
      <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1}>
        <IconButton onClick={() => router.back()}>
          <Iconify icon="typcn:arrow-back-outline" />
        </IconButton>
        <Typography variant="h4">Listes des candidats(es)</Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
        spacing={2}
      >
          
          <FormControlLabel control={<Switch checked={isDisplay} onChange={toogleDisplayEvent} color="warning" />} label={isDisplay ? 'Actif': 'Inactif' } />
          <ProductSort />
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                Ajouter Candidat
          </Button>
      </Stack>

      <Grid container spacing={3}>
        {isFetching ?
        (Array.from(new Array(7))).map((product, index) => (
          <Grid key={`skeleton-${index}`} xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height={300} animation="pulse" />
          </Grid>
        ))
        :
        event.candidates.map((candidate, index) => (
          <Grid key={`candidate-${candidate.id}`} xs={12} sm={6} md={3}>
            <ProductCard onChange={setNumberNominate} candidate={candidate} index={index} />
          </Grid>
        ))
        }
      </Grid>
      <Dialog disableEscapeKeyDown open={openCreateDepartement} onClose={handleToogleDialogCreateDepartement}>
        <DialogTitle>Modification numero de dauphine</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 3}}>
            Veuillez faire entrer le numero de la dauphine
          </DialogContentText>
          <TextField
            value={ranking}
            onChange={(e)=> {
              setRanking(e.target.value);
            }}
            sx={{width: '80%',}} name="numero" label="Numero de dautphine" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToogleDialogCreateDepartement}>Annuler</Button>
          <Button onClick={createNumeroDauphine}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
      {/* <ProductCartWidget /> */}
    </Container>
  );
}
