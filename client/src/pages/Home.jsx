import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HighlightProducts from '../components/home/HighlightProducts';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: ' auto',
    width: '100%',
    height: 'calc(100vh - 64px)',
    backgroundImage:
      "url('https://res.cloudinary.com/sweden/image/upload/v1619768758/1TTf_900-1080x675_ggm3so.jpg'), linear-gradient(0deg, #000000 0%, rgba(0,0,8,1) 4%, rgba(115,115,115,1) 70%)",
    backgroundBlendMode: 'multiply',
    backgroundSize: 'cover',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
      alignContent: 'center',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '180px calc(100vh - 184px)',
      padding: '1rem 5rem',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '5rem 10rem',
    },
  },
  header1: {
    color: 'white',
    fontWeight: 700,
    alignSelf: 'end',
    padding: '2rem 1rem 0',
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 2',
      paddingLeft: '5rem',
    },
  },
  heroGroup: {
    paddingTop: '3rem',
    color: 'white',
    // marginTop: '2rem',
    marginTop: '15%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5rem',
      justifySelf: 'start',
    },
  },
  header2: {
    color: 'white',
    // fontSize: '1rem',
    padding: '1rem',
    maxWidth: '50ch',
    lineHeight: '2.5rem',
    // alignSelf: 'center',
    // width: 500,
    // textAlign: 'center',
    fontWeight: 700,
  },
  img: {
    // display: 'none',
    width: '100%',
    maxWidth: '500px',
    opacity: 0.8,
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      justifySelf: 'center',
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      gridArea: '2/2/2/2',
      paddingTop: '2rem',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  shopBtn: {
    display: 'block',
    margin: '2rem auto',
    background: '#0a0a0a',
    color: '#fafafa',
    // padding: '0.75em 1.5em',
    boxShadow: '0 0px 30px 10px rgb(255, 255, 255, 10%)',
    transition: ' all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    padding: '1rem 3rem',
    '&:hover': {
      transform: 'scale(1.1)',
      color: 'black',
    },
  },
  highlight: {
    margin: '1rem auto',
    display: 'grid',
    gap: '5px',
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      gridTemplateColumns: '50% 50%',
      gridTemplateRows: '1fr',
      maxWidth: '1600px',
      '&:hover': {
        '& > a': {
          textDecoration: 'none',
        },
      },
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '40% 40%',
    },
  },
  paper: {
    overflow: 'hidden',
    // borderRadius: '1rem',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    width: '100%',
    height: '100%',
    '&:hover': {
      '& > img': {
        transform: 'scale(1.05)',
      },
    },
  },
  highlightImg: {
    transition: ' all 350ms cubic-bezier(0.61, 1, 0.88, 1) 0ms',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    gridArea: '1/1/1/1',
  },
  highlight1: {
    [theme.breakpoints.up('sm')]: {
      gridArea: '1/1/2/2',
    },
  },
  highlight2: {
    [theme.breakpoints.up('sm')]: {
      gridArea: '2/1/3/2',
    },
  },
  highlight3: {
    [theme.breakpoints.up('sm')]: {
      gridArea: '1/2/3/3',
    },
  },

  highlightHover: {
    gridArea: '1/1/1/1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0, 20%)',
    width: '100%',
    height: '100%',
    zIndex: 5,
  },

  highlightText: {
    color: '#cecece',
    border: '1px solid rgba(0,0,0, 20%)',
    padding: '1em',
    backgroundColor: 'rgb(0,0,0, 30%)',
    backdropFilter: 'blur(2px)',
    textDecoration: 'none',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const dispatch = useDispatch();

  const handleClickToBrands = (brandId) => {
    dispatch({ type: 'FILTER_BRAND', payload: [brandId] });
  };

  return (
    <>
      <div className={classes.root}>
        {/* <Paper elevation={0} /> */}
        <Typography variant='h2' component='h1' className={classes.header1}>
          Start your padel journey here
        </Typography>
        <div className={classes.heroGroup}>
          <Typography variant='h6' component='h3' className={classes.header2}>
            We love padel and assume you do too. If you are looking to buy a new
            padel racket, you have come to the right place.
          </Typography>
          <Link to='/shop' className={classes.link}>
            <Button
              variant='contained'
              size='large'
              className={classes.shopBtn}
            >
              Shop Now
            </Button>
          </Link>
        </div>
        <img
          src='https://res.cloudinary.com/sweden/image/upload/v1619773778/Artboard_2_l2e0fd.png'
          alt='3 padel rackets'
          className={classes.img}
        />
      </div>
      <div className={classes.highlight}>
        <Link
          to='/shop?Bullpadel'
          onClick={() => handleClickToBrands('608fe6b66a5fa563c09ccd9c')}
          className={classes.highlight1}
        >
          <Paper
            elevation={8}
            className={`${classes.paper} `}
            onMouseOver={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            <img
              src='https://res.cloudinary.com/sweden/image/upload/v1619783677/NEW-BULLPADEL-COLLETION-BLOG_pg29tu.jpg'
              className={classes.highlightImg}
              alt=''
            />
            {hover1 && (
              <div className={`${classes.highlightHover}`}>
                <Typography variant='h4' className={`${classes.highlightText}`}>
                  Shop BullPadel
                </Typography>
              </div>
            )}
          </Paper>
        </Link>
        <Link
          to='/shop?Adidas'
          onClick={() => handleClickToBrands('608fe6ae6a5fa563c09ccd9b')}
          className={classes.highlight2}
        >
          <Paper
            elevation={8}
            className={`${classes.paper} `}
            onMouseOver={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
          >
            <img
              src='https://res.cloudinary.com/sweden/image/upload/v1619783678/adidas-padel-2021_ql8soy.jpg'
              className={classes.highlightImg}
              alt=''
            />
            {hover2 && (
              <div className={`${classes.highlightHover}`}>
                <Typography variant='h4' className={`${classes.highlightText}`}>
                  Shop Adidas
                </Typography>
              </div>
            )}
          </Paper>
        </Link>
        <Link
          to='/shop?Head'
          onClick={() => handleClickToBrands('608ab840f8f63a34502f2780')}
          className={classes.highlight3}
        >
          <Paper
            elevation={8}
            className={`${classes.paper} `}
            onMouseOver={() => setHover3(true)}
            onMouseLeave={() => setHover3(false)}
          >
            <img
              src='https://res.cloudinary.com/sweden/image/upload/v1620135029/Untitled-3_ejalmb.jpg'
              className={`${classes.highlightImg} `}
              alt=''
            />
            {hover3 && (
              <div className={`${classes.highlightHover}`}>
                <Typography variant='h3' className={`${classes.highlightText}`}>
                  Shop Head
                </Typography>
              </div>
            )}
          </Paper>
        </Link>
      </div>
      {/* <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={['New Arrivals', 'Best Sellers']} />
      </div> */}
      <HighlightProducts />

      {/* <br />
      <h4 className='text-center p-3 my-5 display-4 jumbotron'>Categories</h4>
      <CategoryList />
      <h4 className='text-center p-3 my-5 display-4 jumbotron'>
        Sub Categories
      </h4>
      <SubList />
      <br />
      <br /> */}
    </>
  );
};

export default Home;
