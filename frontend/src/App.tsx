import React, { useState } from 'react';
import './App.css';

import { Grid, Container, BottomNavigation, BottomNavigationAction } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import DiscoverScreen from './pages/discover/discover';

const BottomBar = () => {
  const [currentTab, setCurrentTab] = useState<any>('');

  return <BottomNavigation
    style={{ marginTop: 16, borderRadius: 30, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
    showLabels
    value={currentTab}
    onChange={(event, newValue) => setCurrentTab(newValue)}
  >
    <BottomNavigationAction
      component={Link}
      to="/"
      label="Discover"
      value=""
      icon={<TravelExploreIcon />} />
    <BottomNavigationAction
      component={Link}
      to="/liked"
      value="liked"
      label="Liked"
      icon={<ThumbUpIcon />} />
    <BottomNavigationAction
      component={Link}
      to="/matches"
      value="matches"
      label="Matches" icon={<JoinInnerIcon />} />
  </BottomNavigation>
}

const App = () => {
  return (
    <BrowserRouter>
      <Container fixed style={{ height: '100vh', padding: 0 }}>
        <Grid container justifyContent={'center'} height={'100%'}>
          <Grid item md={6} xs={12} height={'100%'} padding={2} style={{ backgroundColor: 'white' }}>
            <Grid height={'calc(100% - 72px)'} >
              <Routes>
                <Route path="/" element={<DiscoverScreen />} />
              </Routes>
            </Grid>
            <BottomBar />
          </Grid>
        </Grid>
      </Container>
    </BrowserRouter >
  );
};

export default App;