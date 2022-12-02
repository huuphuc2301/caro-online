import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Button, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getNewMoviesThunk, getUpcomingMoviesThunk } from 'app/components/Movies/slice';
import { formatDate } from 'utils/date';
import Grid from '@mui/material/Unstable_Grid2';
import RatedTag from 'app/components/RatedTag';
import { notify } from 'app/components/MasterDialog';
import { bookTicketActions } from '../../pages/BookTicketPage/slice';

export default function MoviePanel() {

  const store = useSelector<RootState, RootState>(state => state)

  const selectedTabRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (selectedTabRef.current != null) {
      if (!store.bookTicket.stepBack)
        window.scrollTo({
          top: selectedTabRef.current.offsetTop,
        })
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    if (!store.movies.getNewMovies) {
      dispatch(getNewMoviesThunk())
    };
  }, [])

  useEffect(() => {
    if (!store.movies.getUpcomingMovies) {
      dispatch(getUpcomingMoviesThunk())
    };
  }, [])

  const handleSelectMovie = (event: React.SyntheticEvent, newMovie: string) => {
    dispatch(bookTicketActions.selectMovie(newMovie))
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSelectShowtime = (showtime: number) => {
    if (!store.login.isLoggedin) {
      notify({
        type: 'error',
        content: 'Cần đăng nhập để tiếp tục',
        autocloseDelay: 2000
      })
    } else {
      dispatch(bookTicketActions.selectShowtime(showtime))
    }
  }

  const classes = useStyles()

  return (
    <TabContext value={store.bookTicket.selectedMovie}>
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <div className={classes.title} >CHỌN PHIM</div>
          <TabList
            className={classes.tabContainer}
            orientation='vertical'
            onChange={(event, newMovie) => handleSelectMovie(event, newMovie)}
          >
            <Tab value={'0'} sx={{ all: 'unset' }}
              ref={store.bookTicket.selectedMovie == '0' ? selectedTabRef : null} />
            {(store.movies.newMovieList.concat(store.movies.upcomingMovieList)).map(
              (movie: any, index: number) => {
                return <Tab
                  className={classes.movieTab}
                  key={index}
                  ref={movie.id == store.bookTicket.selectedMovie ? selectedTabRef : null}
                  label={
                    <>
                      <img src={movie.imageUrl}
                        className={classes.movieIcon} />
                      {movie.title}
                    </>
                  }
                  disableFocusRipple
                  value={movie.id?.toString()}
                  icon={
                    movie.rated ?
                      <RatedTag rated={movie.rated} size='small'
                        styles={{ color: '#FFFFFF', marginLeft: 'auto' }} /> : undefined
                  }
                  iconPosition='end'
                />
              })}
          </TabList>
        </Box>
        <Box className={classes.container}>
          <div className={classes.title} >CHỌN SUẤT CHIẾU</div>
          <TabPanel className={classes.showtimeList} value='0'>
            Vui lòng chọn phim
          </TabPanel>
          {store.movies.newMovieList.concat(store.movies.upcomingMovieList).map((movie: any) => {
            {
              return (
                [1, 2].map((showtimeDate: any, index: number) => {
                  return <TabPanel
                    className={classes.showtimeList}
                    key={index}
                    value={movie.id != undefined ? movie?.id?.toString() : ''}>
                    <Grid container xs={12} >
                      <Grid xs={12}>
                        {formatDate(new Date)}
                      </Grid>
                      <Grid xs={3} />
                      <Grid container xs={9} >
                        {[1, 2, 3, 4, 5].map((showtime: any, index: number) => {
                          return (
                            <Grid xs={4} key={index}>
                              <Button
                                className={classes.timeButton}
                                disableRipple
                                onClick={() => handleSelectShowtime(showtime)}>
                                10:10
                              </Button>
                            </Grid>)
                        })}
                      </Grid>
                    </Grid>
                  </TabPanel>
                }))
            }
          })}
        </Box>
      </Box>
    </TabContext >
  )
}
