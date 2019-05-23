import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
const Home = React.lazy(() => import('./components/home'));
const RoomTable = React.lazy(() => import('./components/Table/RoomPage'));

const AddRoom = React.lazy(() => import('./components/Table/AddRoom'));

const About = React.lazy(() => import('./components/about'));

const Bar = React.lazy(() => import('./components/Charts/Bar'));
const Doughnut = React.lazy(() => import('./components/Charts/Doughnut'));
const Line = React.lazy(() => import('./components/Charts/Line'));
const Filter = React.lazy(() => import('./components/Charts/FilterChart'));
const D3 = React.lazy(() => import('./components/d3js'));
const FixTable = React.lazy(() => import('./components/fixTable'));
const RoleManagement = React.lazy(() => import('./components/RoleManagement'));
const NavManagement = React.lazy(() => import('./components//NavManagement'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  
  { path: '/rooms', name: 'Rooms', component: RoomTable },
  { path: '/addroom', name: 'AddRoom', component: AddRoom },
  { path: '/editroom/:id', name: 'EditRoom', component: AddRoom },
  { path: '/admin', name: 'ADMIN', component: About},
  { path: '/chart/line', name: 'LineChart', component: Line },
  { path: '/chart/doughnut', name: 'DoughnutChart', component: Doughnut },
  { path: '/chart/bar', name: 'BarChart', component: Bar },
  { path: '/chart/filter', name: 'Filter', component: Filter },
  { path: '/d3', name: 'D3', component: D3},
  { path: '/fixtable', name: 'Fixtable', component: FixTable},
  { path: '/role-management', name: 'RoleManagement', component: RoleManagement},
  { path: '/nav-management', name: 'NavManagement', component: NavManagement},

];

export default routes;
