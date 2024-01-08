import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {

  // const [data, setData] = useState({});
  const [isFetching, setFetch] = useState(true);

  useEffect(() => {
    // setData({});
    setTimeout(()=> {
      setFetch(false);
    }, 1000)
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Statistiques globales 👋
      </Typography>

      {!isFetching && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Votes journaliers"
            total={7000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag1.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tickets achetés"
            total={1351}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_billet.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Nombre de visites"
            total={1725}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Avis de sondages"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Suivie système sur les 10 derniers jours"
            subheader="(+43%) moins que la période précédentes"
            chart={{
              labels: [
                '12/01/2023',
                '12/02/2023',
                '12/03/2023',
                '12/04/2023',
                '12/05/2023',
                '12/06/2023',
                '12/07/2023',
                '12/08/2023',
                '12/09/2023',
                '12/10/2023',
              ],
              series: [
                {
                  name: 'Votes',
                  type: 'column',
                  fill: 'solid',
                  data: [11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Billeteries',
                  type: 'area',
                  fill: 'gradient',
                  data: [55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Visites',
                  type: 'line',
                  fill: 'solid',
                  data: [25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Dernier sondage"
            subheader="La miss de Côte d'ivoire de l'année 2023 a été la meilleur miss de la dernière décenie"
            chart={{
              series: [
                { label: 'Oui', value: 4344 },
                { label: 'Non', value: 5435 },
                { label: 'Peut-être', value: 1443 },
                { label: 'Absolument pas', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Classement vôtes en cours"
            subheader="(Top 10)"
            chart={{
              series: [
                { label: 'KASSI MARIE PAULE', value: 400 },
                { label: 'KOUASSI MARLENE-KANY', value: 430 },
                { label: 'ASSUI KAREL', value: 448 },
                { label: 'VANGAH ELLA', value: 470 },
                { label: 'SOULAMA FATOUMATA', value: 540 },
                { label: 'DIAKO NASSITA', value: 580 },
                { label: 'KOUAME PRISCILLA', value: 690 },
                { label: 'COMARA LAURA', value: 1100 },
                { label: 'GNAKPA LAUREL', value: 1200 },
                { label: 'COULIBALY LOU', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Achats tickets"
            subheader="34ème édition Miss CI 2023"
            chart={{
              series: [
                { label: 'Ticket 5000', value: 4344 },
                { label: 'Ticket 10000', value: 5435 },
                { label: 'Tickets Restant', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Dernières vidéos"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Partenariat COMICI- Kaydan Groupe : Mylène Djihony reçoit les clés d’une superbe villa-duplex',
                "Miss Côte d'Ivoire 2023 : WEEK-END DE CÉLÉBRATION À DIMBOKRO DE LA MISS CI Mylène DJIHONI",
                "Ruth CUSSO BAH : Elle veut faciliter l’insertion des femmes dans l’industrie de la beauté",
                "COULIBALY Matchény : Partisane de la lutte contre la maltraitance des enfants",
                "Élodia GNAGBO : Engagée pour l’amélioration du système sanitaire ",
              ][index],// faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Dernières actualités"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Partenariat COMICI- Kaydan Groupe : Mylène Djihony reçoit les clés d’une superbe villa-duplex',
                "Miss Côte d'Ivoire 2023 : WEEK-END DE CÉLÉBRATION À DIMBOKRO DE LA MISS CI Mylène DJIHONI",
                "Ruth CUSSO BAH : Elle veut faciliter l’insertion des femmes dans l’industrie de la beauté",
                "COULIBALY Matchény : Partisane de la lutte contre la maltraitance des enfants",
                "Élodia GNAGBO : Engagée pour l’amélioration du système sanitaire ",
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={6}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={6}>
          <AppTasks
            title="Actions rapide vote en ligne"
            list={[
              { id: 1, name: 'Edition Miss 2023', isActive: false },
              { id: 2, name: 'Edition Miss 2022', isActive: true },
              { id: 3, name: 'Edition Miss 2021', isActive: false },
              { id: 4, name: 'Edition Miss 2020', isActive: false },
              { id: 5, name: 'Edition Miss 2019', isActive: false },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <AppTasks
            title="Actions rapide sondage"
            list={[
              { id: 1, name: 'Edition Miss 2023', isActive: false },
              { id: 2, name: 'Edition Miss 2022', isActive: true },
              { id: 3, name: 'Edition Miss 2021', isActive: false },
              { id: 4, name: 'Edition Miss 2020', isActive: false },
              { id: 5, name: 'Edition Miss 2019', isActive: false },
            ]}
          />
        </Grid>
      </Grid>
      )
      }
      {isFetching && (
        <Grid container spacing={3}>
          {Array.from(new Array(4)).map((item, index) => (
            <Grid xs={12} key={`skeleton-${index}`} sm={6} md={3}>
              <Skeleton variant="rectangular" width="100%" height={120} />
            </Grid>
          )
          )}

          <Grid xs={12} md={6} lg={8}>
            <Card sx={{ padding: 1}}>
              <Skeleton width="30%" variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton width="60%" variant="text" sx={{ fontSize: '1em' }} />
              <Grid container direction="row" justifyContent="flex-end" spacing={1} sx={{pr: 1, mb:3}}>
                {Array.from(new Array(3)).map((item, index) => (
                  <Grid direction="row" key={`skeleton-sondage-${index}`} item xs={2} md={1}>
                    <Skeleton variant="circular" width={10} height={10}  />
                    <Skeleton width="70%" variant="text" sx={{ fontSize: '0.4em' }} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={3}>
                <Skeleton variant="rectangular" width="100%" height={450} animation="pulse" />
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card sx={{ padding: 1, height: 540, pt: 4}}>
                <Skeleton width="30%" variant="text" sx={{ fontSize: '1rem' }} />
                
                <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{pt: 10, mb:3}}>
                  <Skeleton variant="circular" width="60%" height={300} />
                </Grid>
                
              </Card>
          </Grid>


          <Grid xs={12} md={6} lg={8}>
            <Card sx={{ padding: 1}}>
              <Skeleton width="30%" variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton width="60%" variant="text" sx={{ fontSize: '1em' }} />
              <Grid container spacing={3}>
                <Skeleton variant="rectangular" width="100%" height={450} animation="pulse" />
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card sx={{ padding: 1, height: 490, pt: 3}}>
                <Skeleton width="30%" variant="text" sx={{ fontSize: '1rem' }} />
                
                <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{pt: 10, mb:3}}>
                  <Skeleton variant="circular" width="60%" height={300} />
                </Grid>
                
              </Card>
          </Grid>

        </Grid>
      )
      }
    </Container>
  );
}
