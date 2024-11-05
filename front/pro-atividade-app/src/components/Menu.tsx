import {
  faFlorinSign,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation } from "react-router-dom";

const Menu = () => {
  const getActiveRoute = useLocation().pathname ? "Active" : "";
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/home">
            <FontAwesomeIcon icon={faFlorinSign} className="me-2" />
            FullStack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={getActiveRoute} as={NavLink} to="/cliente">
                Clientes
              </Nav.Link>
              <Nav.Link className={getActiveRoute} as={NavLink} to="/atividade">
                Atividades
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                align={"end"}
                title="Matheus"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <FontAwesomeIcon icon={faGear} className="me-2" />
                  Configurações
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">
                  <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
