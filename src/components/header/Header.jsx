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
        <Dropdown
          text={username}
          pointing
          className='link item'
          style={{ marginRight: '0.5em' }}
        >
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item as={NavLink} to={`/myMenuPlans`}>
              My Menu Plans
            </Dropdown.Item>
            <Dropdown.Item>My Shopping Lists</Dropdown.Item>
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
