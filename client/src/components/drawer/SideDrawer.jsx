// import { Drawer, Button } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import laptop from '../../images/laptop.png';

// const SideDrawer = () => {
//   const dispatch = useDispatch();
//   const { drawer, cart } = useSelector((state) => ({ ...state }));

//   const imageStyle = {
//     width: '100%',
//     height: '50px',
//     objectFit: 'cover',
//   };

//   const handleClose = () => {
//     dispatch({
//       type: 'SET_SIDE_DRAWER',
//       payload: false,
//     });
//   };

//   return (
//     <Drawer
//       visible={drawer}
//       title={`Cart | ${cart.length} Products`}
//       maskStyle={{ background: 'transparent' }}
//       //   closable={false}
//       onClose={handleClose}
//     >
//       {cart.map((p) => (
//         <div className='row' key={p._id}>
//           <div className='col'>
//             {p.images[0] ? (
//               <>
//                 <img src={p.images[0].url} alt={p.title} style={imageStyle} />
//                 <p className='text-center bg-secondary text-light'>
//                   {p.title} x {p.count}
//                 </p>
//               </>
//             ) : (
//               <>
//                 <img src={laptop} alt='of laptop' style={imageStyle} />
//                 <p className='text-center bg-secondary text-light'>
//                   {p.title} x {p.count}
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       ))}

//       <Link to='/cart'>
//         <button
//           className='text-center btn btn-primary btn-raised btn-block'
//           onClick={handleClose}
//         >
//           Go To Cart
//         </button>
//       </Link>
//     </Drawer>
//   );
// };

// export default SideDrawer;
