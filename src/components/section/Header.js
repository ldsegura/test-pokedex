import React, { useEffect, useState } from "react";
import { Container, Button, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useMediaQuery } from "react-responsive";
import breakpointConstants from "../../constants/breakpointConstants";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import authAction from "../../actions/authAction";
import { useNavigate, Link, useLocation } from "react-router-dom";
import localstorageConstants from "../../constants/localstorageConstants";
import languageUtils from "../../utils/languageUtils";
import pagesContants from "../../constants/pagesContants";
import { useIntl } from "react-intl";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: breakpointConstants.MD });
  const expand = isMobile ? false : true;
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [hasActiveLink, setHasActiveLink] = useState(false);

  const dispatch = useDispatch();
  const { auth, locale } = useGlobalState();
  const intl = useIntl();

  const handleClose = () => setShowOffCanvas(false);
  const handleShow = () => setShowOffCanvas(true);
  const handleLogout = () => {
    window.localStorage.removeItem(localstorageConstants.AUTH);
    authAction.logout(dispatch);

    const location = {
      pathname: `${languageUtils.linksLocale(locale)}`,
    };
    navigate(location);
  };

  useEffect(() => {
    let auxActive = 0;
    if (
      location.pathname
        .toLowerCase()
        .startsWith(
          `${languageUtils.linksLocale(locale)}${pagesContants.search}`
        )
    )
      auxActive = 1;
    else if (
      location.pathname
        .toLowerCase()
        .startsWith(
          `${languageUtils.linksLocale(locale)}${pagesContants.myPokemons}`
        )
    )
      auxActive = 2;
    else if (
      location.pathname
        .toLowerCase()
        .startsWith(
          `${languageUtils.linksLocale(locale)}${pagesContants.settings}`
        )
    )
      auxActive = 3;

    setHasActiveLink(auxActive);
    handleClose();
  }, [locale, location]);

  return (
    <header>
      {!isMobile && (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand
              as={Link}
              to={`${languageUtils.linksLocale(locale)}`}
            >{`${process.env.REACT_APP_SITENAME}`}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Collapse className="justify-content-end">
              {auth.complete && (
                <>
                  <p className="mb-0">{`${intl.formatMessage({
                    id: "login.wellcome",
                  })} ${auth.name}`}</p>
                </>
              )}
              {!auth.complete && (
                <>
                  <Button
                    className="text-white me-1"
                    size="sm"
                    as={Link}
                    to={`${languageUtils.linksLocale(locale)}${
                      pagesContants.login
                    }`}
                  >
                    {intl.formatMessage({ id: "login.login" })}
                  </Button>
                  <Button
                    className="text-white"
                    size="sm"
                    as={Link}
                    to={`${languageUtils.linksLocale(locale)}${
                      pagesContants.register
                    }`}
                  >
                    {intl.formatMessage({ id: "login.singup" })}
                  </Button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Navbar expand={expand} bg="primary" data-bs-theme="dark">
        <Container>
          {isMobile && (
            <Navbar.Brand
              as={Link}
              to={`${languageUtils.linksLocale(locale)}`}
            >{`${process.env.REACT_APP_SITENAME}`}</Navbar.Brand>
          )}
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={handleShow}
          />
          <Navbar.Offcanvas
            show={showOffCanvas}
            onHide={handleClose}
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div
                className={`justify-content-between d-flex w-100 ${
                  isMobile ? "flex-column" : ""
                }`}
              >
                <Nav>
                  <Nav.Link
                    active={hasActiveLink === 1}
                    href={`${languageUtils.linksLocale(locale)}${
                      pagesContants.search
                    }`}
                  >
                    {intl.formatMessage({ id: "websiteTextLink.search" })}
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link
                    active={hasActiveLink === 2}
                    href={`${languageUtils.linksLocale(locale)}${
                      pagesContants.myPokemons
                    }`}
                  >
                    {intl.formatMessage({ id: "websiteTextLink.myPokemons" })}
                  </Nav.Link>
                  {isMobile && (
                    <>
                      <hr />
                      {auth.complete && (
                        <>
                      <Button
                        className="text-white mb-1"
                        size="sm"
                      >
                        {`${intl.formatMessage({
                            id: "login.wellcome",
                          })} ${auth.name}`}
                      </Button>
                        </>
                      )}
                    </>
                  )}
                </Nav>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
