export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Rooms',
      url: '/rooms',
      icon: 'icon-puzzle',
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-star',
      children: [
        {
          name: 'LineChart',
          url: '/chart/line',
          icon: 'icon-star',
        },
        {
          name: 'DoughnutChart',
          url: '/chart/doughnut',
          icon: 'icon-star',
        },
        {
          name: 'BarChart',
          url: '/chart/bar',
          icon: 'icon-star',
        },
        {
          name: 'Filter',
          url: '/chart/filter',
          icon: 'icon-star',
        }
      ]
    },
    {
      name: 'D3',
      url: '/d3',
      icon: 'icon-puzzle',
    },
    {
      name: 'FixTable',
      url: '/fixtable',
      icon: 'icon-puzzle',
    },
    {
      name: 'RoleManagement',
      url: '/role-management',
      icon: 'icon-puzzle',
    },
    {
      name: 'NavManagement',
      url: '/nav-management',
      icon: 'icon-puzzle',
    },
    {
      name: 'ADMIN',
      url: '/admin',
      icon: 'icon-puzzle',
    },
  ],
};
