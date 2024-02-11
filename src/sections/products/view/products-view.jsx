import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Modal,  Space, Select, Avatar, message } from 'antd';

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

import {apiUrlAsset} from 'src/constants/apiUrl';
import ConsumApi from 'src/services_workers/consum_api';

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';

export default function ProductsView() {
  // const [checked, setOpenFilter] = useState(false);
  const { eventId } = useParams();
  const router = useRouter();
  const [modalUpdateDauphine, toogleModalUpdateDauphine] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [candidatesChoice, setCandidatesChoice] = useState([]);

  const [isFetching, setFetch] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDisplay, toogleDisplay] = useState(false);
  const [event, setEvent] = useState({});
  const [ranking, setRanking] = useState('');
  const [indexToEdit, setIndexToEdit] = useState(-1);
  const [nominateId, setNominateId] = useState('');
  const [modalAddDauphin, toogleModalAddDauphin] = useState(false);
  

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
    setFetch(true);
    const {success, data} = await ConsumApi.getDetailsEvent({eventId});
    const allCandidateActivate = await ConsumApi.getAllCandidateActive();
    const options = allCandidateActivate.data.map((item) => ({
      label: item.matricule,
      value: `${item.matricule.trim()}_${item.firstName.trim()} ${item.lastName.trim()}`,
      img: item.photo,
      desc: `${item.firstName} ${item.lastName}`,
      id: item.id,
    }));
    if(success) {
      setCandidates(options);
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

  const handleToogleUpdateDauphine = () => {
    toogleModalUpdateDauphine(!modalUpdateDauphine);
  };
  const handleToogleAddDauphine = () => {
    toogleModalAddDauphin(!modalAddDauphin);
  };

  const choiceCandidate = (value) => {
    setCandidatesChoice(value);
  }

  const createNumeroDauphine = async () => {
    const {candidates:candidatesEvent} = event;
    candidatesEvent[indexToEdit].pivot.ranking = ranking;

    setEvent({...event, candidates:candidatesEvent});
    handleToogleUpdateDauphine();
    await ConsumApi.setNumberNominate({event_id:eventId, ranking, candidate_id: nominateId});
  };

  const addDauphineToEvent = async () => {
    if(candidatesChoice.length > 0) {
      alert({type: 'loading', content: "Enregistrement en cours..."});
      const nominate = candidatesChoice.map((item) => {
        const matricule = item.split('_')[0];
        const {id} = candidates.filter((itemFilter) => itemFilter.label.trim() === matricule.trim())[0];
        return id;
      });
      const {success} = await ConsumApi.setNominate({nominate, event_id:eventId });
      if(success) {
        handleToogleAddDauphine();
        await loadInfo();
      } else {
        handleToogleAddDauphine();
        alert({type: 'error', content: "Un problème rencontré, veuillez réssayer"});
      }
    } else {
      alert({type: 'error', content: "Veuillez choisir au moins une nominée"});
    }
  };

  const setNumberNominate = ({rankingNumber, idCandidate, index}) => {
    setNominateId(idCandidate);
    setRanking(rankingNumber);
    setIndexToEdit(index);
    handleToogleUpdateDauphine();
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
          <Button variant="contained" onClick={handleToogleAddDauphine} color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                Ajouter Candidates
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
      <Dialog disableEscapeKeyDown open={modalUpdateDauphine} onClose={handleToogleUpdateDauphine}>
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
          <Button onClick={handleToogleUpdateDauphine}>Annuler</Button>
          <Button onClick={createNumeroDauphine}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
      <Modal
      centered
      title="Ajouter des dauphines"
      open={modalAddDauphin}
      onOk={handleToogleAddDauphine}
      onCancel={handleToogleAddDauphine}
      footer={[
        <>
          <Button onClick={handleToogleAddDauphine}>Annuler</Button>
          <Button onClick={addDauphineToEvent}>Enregistrer</Button>
        </>
      ]}
      >
          <Typography variant='h6'>Veuillez selectionner des dauphines pour y ajouter à cet évènement.</Typography>
          <Select
                size='large'
                  mode="multiple"
                  style={{
                    width: '100%',
                    marginTop: 10
                  }}
                  placeholder="Choisir les candidates"
                  // value={allNomine}
                  onChange={choiceCandidate}
                  optionLabelProp="label"
                  options={candidates}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        <Avatar src={`${apiUrlAsset.candidate}/${option.data.img}`} />
                      </span>
                      {option.data.desc} ({option.data.label})
                    </Space>
                  )}
                />
      </Modal>
      {/* <ProductCartWidget /> */}
    </Container>
  );
}
