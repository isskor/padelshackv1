import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../api/sub';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((s) => {
      setSubs(s.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
        key={s._id}
      >
        <Link to={`/sub/${s.slug}`} className='w-100 d-block'>
          {s.name}
        </Link>
      </div>
    ));

  return (
    <div className='contianer'>
      <div className='row'>
        {loading ? <h4 className='text-center'> Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
