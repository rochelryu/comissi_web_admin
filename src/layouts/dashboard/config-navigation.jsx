import {routesName} from 'src/constants/routes';

import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'statistiques',
    path: routesName.dashboard,
    childrenPath: ['/'],
    icon: icon('ic_analytics'),
  },
  
  {
    title: 'Compétitions',
    path: routesName.voting,
    childrenPath: ['/voting', '/detailEvent'],
    icon: icon('nomine'),
  },
  {
    title: 'Sondages',
    path: routesName.sondages,
    childrenPath: ['/sondages',],
    icon: icon('sondage'),
  },
  {
    title: 'Actualités',
    path: routesName.blog,
    childrenPath: ['/blog',],
    icon: icon('actuality'),
  },
  {
    title: 'Admins',
    path: routesName.user,
    childrenPath: [routesName.user, routesName.createAdmin],
    icon: icon('ic_user'),
  },
];

export default navConfig;
