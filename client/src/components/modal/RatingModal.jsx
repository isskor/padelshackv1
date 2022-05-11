import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Modal } from 'antd';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '1rem',
  },
}));

const RatingModal = ({ children }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleModal = () => {
    if (user && user.token) {
      setShowModal(true);
    } else {
      history.push({
        pathname: '/login',
        state: { from: history.location },
      });
    }
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarBorderOutlinedIcon className='text-danger' />
        {user ? 'Leave Rating' : 'Log in to rate'}
      </div>
      <Modal open={showModal} onClose={handleClose} className={classes.modal}>
        <Paper className={classes.paper} onClick={handleClose}>
          {children}
        </Paper>
      </Modal>
    </>
  );
};

export default RatingModal;
