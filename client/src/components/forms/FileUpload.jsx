import React, { useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '80px',
    width: '80px',
  },
  delete: {
    cursor: 'pointer',
  },
  input: {
    color: 'primary',
  },
}));

const FileUpload = ({ values, setValues, setLoading }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    //   resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG, PNG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authToken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })

              .catch((err) => {
                setLoading(false);
              });
          },
          'base64'
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in parent component
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(
          (img) => img.public_id !== public_id
        );
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className='row py-5'>
        {values.images &&
          values.images.map((img) => (
            <Badge
              key={img.public_id}
              badgeContent={
                <HighlightOffIcon
                  color={'error'}
                  onClick={() => handleImageRemove(img.public_id)}
                  className={classes.delete}
                />
              }
            >
              <Avatar
                className={classes.avatar}
                src={img.url}
                variant='square'
                size={160}
              />
            </Badge>
          ))}
      </div>
      <div className='row'>
        <Button
          component='label'
          variant='contained'
          htmlFor='image_file'
          color='primary'
        >
          Choose Images
        </Button>

        <input
          type='file'
          multiple
          accept='images/*'
          name='image_file'
          id={'image_file'}
          onChange={fileUploadAndResize}
          hidden
        />
      </div>
    </>
  );
};

export default FileUpload;
