import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  adminPage: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  adminMenu: {
    width: 'fit-content !important',
    minWidth: '17%',
    display: 'flex',
    padding: '0 !important',
    borderRight: '1px solid #ccc',
    backgroundColor: '#fff',
    height: '100vh',
    float: 'left',
    textAlign: 'center',
  },

  adminContent: {
    // display: 'flex',
    // minHeight: '100%',
    // marginTop: '1%',
    // justifyContent: 'center',
    // textAlign: 'center',
    marginLeft: '20px',
  },
}));

export default useStyles;
