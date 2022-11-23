import React, { useEffect } from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper'
import { MovieCard } from 'app/components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getNewMoviesThunk } from '../Movies/slice';

export default function NewMovieList(this: any) {

  const classes = useStyles();

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();
  useEffect(() => {
    if (!store.movies.getNewMovies) {
      dispatch(getNewMoviesThunk())
    };
  }, [store.movies.getNewMovies])

  const upcomingMovies: any = [
    {
      id: 0,
      name: 'Bỗng Dưng Trúng Số',
      img: require('./assets/images/movie1.png'),
    },
    {
      id: 1,
      name: 'Mười: Lời Nguyền Trở Lại',
      img: require('./assets/images/movie2.png'),
    },
    {
      id: 2,
      name: 'Cười',
      img: require('./assets/images/movie3.png'),
    },
    {
      id: 3,
      name: 'Ngược Dòng Thời Gian Để Yêu Anh',
      img: require('./assets/images/movie4.png'),
    },
    {
      id: 4,
      name: 'Avatar',
      img: require('./assets/images/movie5.png'),
    },
    {
      id: 5,
      name: 'Evangelion: 3.0+1.01 Ba Lần Ngày Xưa',
      img: require('./assets/images/movie6.png')
    }
  ]

  return (
    <Container className={classes.container}>
      <Divider sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }} color='secondary' fontWeight={900}>
          Phim Đang Chiếu
        </Typography>
      </Divider>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        navigation
        effect='coverflow'
        centeredSlides
        coverflowEffect={{
          rotate: 25,
          stretch: -15,
          depth: 50,
          modifier: 1,
        }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
        }}
        slidesPerView={3}>
        {
          store.movies.newMovieList.map((movie: any, index: number) => {
            return <SwiperSlide className={classes.movie} key={index}>
              <MovieCard
                id={movie.id}
                name={movie.title}
                img={movie.imageUrl}
                duration={movie.duration + ' phút'} />
            </SwiperSlide>
          })}
      </Swiper>
    </Container >
  );
}


