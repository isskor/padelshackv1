import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const user = useSelector((state) => state.user);
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  const cartItems = () => cart.reduce((acc, cur) => acc + cur.count, 0);
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<MailOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>
      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to='/cart'>
          <Badge count={cartItems()} offset={[15, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <>
          <Item key='login' icon={<MailOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
          <Item key='register' icon={<MailOutlined />} className='float-right'>
            <Link to='/register'>Register</Link>
          </Item>
        </>
      )}

      {user && (
        <SubMenu
          key='SubMenu'
          icon={<UserOutlined />}
          title={user.email && user.email.split('@')[0]}
          className='float-right'
        >
          {user && user.role === 'subscriber' && (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          <Item onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
