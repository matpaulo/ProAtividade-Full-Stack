import { faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <Navbar expand="lg" bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href="#home">FSProject</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"   />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Clientes</Nav.Link>
            <Nav.Link href="#link">Atividades</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown align={"end"} title="Matheus" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <FontAwesomeIcon icon={faUser} className='me-2' />
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <FontAwesomeIcon icon={faGear} className='me-2' />
                Configurações
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <FontAwesomeIcon icon={faRightFromBracket} className='me-2' />
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );  
}

export default Menu;