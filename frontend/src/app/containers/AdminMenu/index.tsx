import React, { memo, useEffect, useLayoutEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Tab, Tabs } from '@mui/material';

import useStyles from './style';
import paths from 'paths';
import path from 'path';
import FilmManagementPage from '../../pages/FilmManagementPage/index';

function AdminMenu(props: { className: string }) {
  const classes = useStyles();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [tab, setTab] = useState(-1);

  useLayoutEffect(() => {
    setPathname(location.pathname);
    switch (location.pathname) {
      case paths.CustomerManagement:
        setTab(0);
        break;
      case paths.RoomManagement:
        setTab(1);
        break;
      case paths.FilmManagement:
        setTab(2);
        break;
      case paths.TicketManagement:
        setTab(3);
        break;
      case paths.PriceManagement:
        setTab(4);
        break;
      default:
        setTab(0);
        break;
    }
  }, [location]);

  return (
    <Container className={props.className}>
      <Tabs
        value={tab === -1 ? false : tab}
        orientation={'vertical'}
        textColor="inherit"
      >
        <Tab
          className={tab === 0 ? classes.activeTab : classes.tab}
          component={Link}
          label="Khách hàng"
          to={paths.CustomerManagement}
        />
        <Tab
          className={tab === 1 ? classes.activeTab : classes.tab}
          component={Link}
          label="Phòng chiếu"
          to={paths.RoomManagement}
        />
        <Tab
          className={tab === 2 ? classes.activeTab : classes.tab}
          component={Link}
          label="Phim"
          to={paths.FilmManagement}
        />
        <Tab
          className={tab === 3 ? classes.activeTab : classes.tab}
          component={Link}
          label="Lịch sử đặt vé"
          to={paths.TicketManagement}
        />
        <Tab
          className={tab === 4 ? classes.activeTab : classes.tab}
          component={Link}
          label="Giá vé"
          to={paths.PriceManagement}
        />
      </Tabs>
    </Container>
  );
}

export default AdminMenu;
