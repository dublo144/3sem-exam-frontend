import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button, Dropdown } from 'semantic-ui-react';
import NewModal from '../utils/NewModal.jsx';
import LoginModalForm from '../login/LoginModalForm.jsx';
import Logout from '../login/Logout.jsx';
import { useAuthState } from '../../contexts/AuthContext.jsx';

export default function Header() {
  const { isLoggedIn, username } = useAuthState();

  const [openModal, setOpenModal] = useState(false);

  const handleLoginLogOut = () => {
    return isLoggedIn ? (
      <Menu.Item position='right'>
        <Button
          as={NavLink}
          id='userpageBtn'
          to={`/user/${username}`}
          content={username}
          icon='user'
          primary
          style={{ marginRight: '0.5em' }}
        />
        <Dropdown text='Shopping' pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item>
              <Dropdown text='Clothing'>
                <Dropdown.Menu>
                  <Dropdown.Header>Mens</Dropdown.Header>
                  <Dropdown.Item>Shirts</Dropdown.Item>
                  <Dropdown.Item>Pants</Dropdown.Item>
                  <Dropdown.Item>Jeans</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Womens</Dropdown.Header>
                  <Dropdown.Item>Dresses</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Item>Bags</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>Home Goods</Dropdown.Item>
            <Dropdown.Item>Bedroom</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Order</Dropdown.Header>
            <Dropdown.Item>Status</Dropdown.Item>
            <Dropdown.Item>Cancellations</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <NewModal
          trigger={<Button>Logout</Button>}
          headerMessage='Log out'
          handleCloseModal={() => setOpenModal(false)}
        >
          <Logout hideModal={() => setOpenModal(false)} />
        </NewModal>
      </Menu.Item>
    ) : (
      <>
        <Menu.Item position='right'>
          <Button
            primary
            style={{ marginRight: '0.5em' }}
            onClick={() => setOpenModal(true)}
          >
            Sign Up
          </Button>

          <Button onClick={() => setOpenModal(true)}>Login</Button>

          <NewModal
            open={openModal}
            handleCloseModal={() => setOpenModal(false)}
          >
            <LoginModalForm hideModal={() => setOpenModal(false)} />
          </NewModal>
        </Menu.Item>
      </>
    );
  };

  return (
    <Menu>
      <Container>
        <Menu.Item as={NavLink} exact to='/' name='home'>
          Home
        </Menu.Item>

        <Menu.Item as={NavLink} to='/jokes' name='jokes'>
          Jokes
        </Menu.Item>

        <Menu.Item as={NavLink} to='/scrape' name='scrape'>
          Scrape
        </Menu.Item>

        <Menu.Item as={NavLink} to='/content3' name='content3'>
          Adv. State
        </Menu.Item>

        <Menu.Item as={NavLink} to='/counter' name='counter'>
          Counter
        </Menu.Item>

        <Menu.Item as={NavLink} to='/asyncUsers' name='asyncUsers'>
          Async users
        </Menu.Item>

        {handleLoginLogOut()}
      </Container>
    </Menu>
  );
}
