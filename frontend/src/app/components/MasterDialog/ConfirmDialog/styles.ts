import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    width: 'fit-content',
    minWidth: '22.5vw',
    overflow: 'hidden !important',
    zIndex: 10,
  },
  title: {
    display: 'flex',
    padding: '8px 12px !important',
    alignItems: 'center',
  },
  content: {},

  button: {
    width: '50%',
    backgroundColor: '#1D1C1A !important',
    color: 'white !important',
    '&:hover': {
      color: '#FF884B !important',
      transitionDuration: '0.5s',
    },
  },

  action: {
    width: '50%',
    backgroundColor: '#FF884B !important',
    color: 'white !important',
    '&:hover': {
      color: '#1D1C1A !important',
      transitionDuration: '0.5s',
    },
  },
}));

export default useStyles;
