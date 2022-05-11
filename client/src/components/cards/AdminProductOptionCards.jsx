import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: '0',
    paddingTop: '0',
    color: 'black',
  },
  card: {
    margin: '1rem 0',
    padding: '0',
  },
}));

const AdminProductOptionCards = ({ list, handleDelete }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const classes = useStyles();
  return (
    <>
      {list.map((item) => (
        <Card key={item._id} className={classes.card} variant='outlined'>
          <CardContent className={classes.cardContent}>
            <Typography>{item.name}</Typography>
            <div>
              <IconButton aria-label='edit'>
                <Link to={`${pathname}/${item.slug}`}>
                  <EditOutlinedIcon color='primary' />
                </Link>
              </IconButton>
              <IconButton
                aria-label='delete'
                onClick={() => handleDelete(item.slug)}
              >
                <DeleteOutlineIcon color='error' />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AdminProductOptionCards;
