import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Button,
  CloseButton,
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Offcanvas,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';

import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/staticJSON';
import { useSection } from '../hooks/useSections';

interface Category {
  id: number | string;
  name: string;
  nameRu: string;
  icon?: string;
  brands?: string[];
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number | string;
  name: string;
  nameRu: string;
  items?: { id: number | string; name: string; nameRu: string; link: string }[];
}

type MenuItem = (Category | Subcategory | { id: string | number; name: string; nameRu: string; link: string });

interface MenuPanel {
  id: string;
  title: string;
  data: MenuItem[];
}

const Header: React.FC = () => {
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<number | string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [menuStack, setMenuStack] = useState<MenuPanel[]>([]);
  
  const { language, setLanguage } = useLanguage();
  const { section: homepage_section } = useSection('homepage');
  const { section: navigation_section } = useSection('navigation');
  
  const headerData = homepage_section?.data?.[language]?.header;
  const categories: Category[] = useMemo(() => navigation_section?.data?.categories ?? [], [navigation_section]);

  const getDisplayName = useCallback((item: { name: string; nameRu: string }) => {
    return language === 'ru' && item.nameRu ? item.nameRu : item.name;
  }, [language]);

  const toggleMegaMenu = (categoryId: number | string | null = null) => {
    setActiveCategory(categoryId);
    setShowMegaMenu(categoryId !== null);
    
    if (categoryId !== null) {
      const category = categories.find(c => c.id === categoryId);
      const firstSubcategory = category?.subcategories?.[0];
      if (firstSubcategory) {
        setActiveSubcategory(String(firstSubcategory.id));
      }
    } else {
      setActiveSubcategory('');
    }
  };

  const handleForward = useCallback((item: Category | Subcategory) => {
    let panelData: MenuItem[] = [];
    if ('subcategories' in item) {
      panelData = item.subcategories || [];
    } else if ('items' in item) {
      panelData = item.items || [];
    }

    const newPanel: MenuPanel = {
      id: String(item.id),
      title: getDisplayName(item),
      data: panelData,
    };
    
    setMenuStack(prevStack => [...prevStack, newPanel]);
  }, [getDisplayName]);

  const handleBack = useCallback(() => {
    setMenuStack(prevStack => prevStack.slice(0, -1));
  }, []);

    useEffect(() => {
    if (!categories && !headerData) return;

    const topLevelItems: MenuItem[] = [
      ...categories,
      { id: 'who_we_are', name: headerData?.whoWeAre || 'Who We Are', nameRu: 'О нас', link: '/who_we_are' },
      {
        id: 'business_with_us_parent',
        name: headerData?.businessWithUs || 'Business With Us',
        nameRu: 'Бизнес с нами',
        subcategories: [
          {
            id: 'bwu-sub',
            name: headerData?.businessWithUs || 'Business With Us',
            nameRu: 'Бизнес с нами',
            items: [
              { id: 'contact_us', name: 'Contact Us', nameRu: 'Связаться с нами', link: '/work_with_us' },
              { id: 'bwu', name: 'Business With Us', nameRu: 'Бизнес с нами', link: '/business_with_us' },
            ]
          }
        ],
      } as Category,
    ];

    setMenuStack([{
      id: 'root',
      title: language === 'ru' ? 'Меню' : 'Menu',
      data: topLevelItems,
    }]);
  }, [categories, headerData, language]);
  
  const mobileMenuStyles = `
    .mobile-menu-panels {
      position: relative; overflow-x: hidden; height: 100%;
    }
    .mobile-menu-panel {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: white; transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
    .mobile-menu-panel.active { transform: translateX(0); }
    .mobile-menu-panel.exit { transform: translateX(-100%); }
  `;

  const renderMobileMenu = () => (
    <Offcanvas
      show={showMobileMenu}
      onHide={() => setShowMobileMenu(false)}
      placement="start"
      className="mobile-menu-canvas"
    >
      <style>{mobileMenuStyles}</style>
      <Offcanvas.Header className="border-bottom">
        <Offcanvas.Title>
          <Navbar.Brand href="/">
            <img src={IMAGES.logoDark} alt="Turkmen Gala" style={{ height: 40 }}/>
          </Navbar.Brand>
        </Offcanvas.Title>
        <CloseButton onClick={() => setShowMobileMenu(false)} />
      </Offcanvas.Header>

      <div className="mobile-menu-panels">
        {menuStack.map((panel, index) => {
          const isActive = index === menuStack.length - 1;
          const isExiting = index < menuStack.length - 1;
          
          return (
            <div key={panel.id} className={`mobile-menu-panel ${isActive ? 'active' : ''} ${isExiting ? 'exit' : ''}`}>
              <Offcanvas.Body>
                <div className="d-flex align-items-center pb-2 mb-auto">
                  {menuStack.length > 1 && (
                    <Button variant="link" onClick={handleBack} className="p-0 me-2 shadow-none text-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 22, height: 22}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </Button>
                  )}
                  <h6 className="mb-0 flex-grow-1">{panel.title}</h6>
                </div>
                
                <Nav className="flex-column border-top mt-2 pt-2">
                  {panel.data.map((item) => {
                    const hasChildren = 'subcategories' in item || 'items' in item;
                    if (hasChildren) {
                      return (
                        <Nav.Link key={item.id} onClick={() => handleForward(item)} className="d-flex justify-content-between align-items-center px-0 py-2 text-dark fw-medium">
                          {getDisplayName(item)}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </Nav.Link>
                      );
                    } else if ('link' in item) {
                      return (
                        <Nav.Link key={item.id} href={item.link} onClick={() => setShowMobileMenu(false)} className="py-2 px-0 text-dark fw-medium">
                          {getDisplayName(item)}
                        </Nav.Link>
                      );
                    }
                    return null;
                  })}
                </Nav>
              </Offcanvas.Body>
            </div>
          );
        })}
      </div>
    </Offcanvas>
  );

  return (
    <>
      <header className="ecommerce-header">
        <div className="mega-menu-container" onMouseLeave={() => toggleMegaMenu(null)}>
          <Navbar bg="white" expand="lg" className="main-navbar py-2 border-bottom">
            <Container className="d-flex align-items-center justify-content-between">
              <Navbar.Brand href="/">
                <img src={IMAGES.logoDark} alt="Turkmen Gala" className="white-logo" style={{ height: 40 }}/>
              </Navbar.Brand>

              {/* Desktop Navigation */}
              <Nav className="d-none d-lg-flex align-items-center mx-auto">
                {categories.map((category) => (
                  <Nav.Link key={category.id} className="px-2 position-relative" onMouseEnter={() => toggleMegaMenu(category.id)} style={{ fontWeight: 500 }}>
                    {getDisplayName(category)}
                    <i className={`theme-downicon ${category.icon} me-1`}></i>
                  </Nav.Link>
                ))}
                <Nav.Link href="/who_we_are" className="py-2">{headerData?.whoWeAre}</Nav.Link>
                <Dropdown align='end'>
                  <Dropdown.Toggle variant="white" id="dropdown-bws" className="shadow-none border-0 p-2">
                    {headerData?.businessWithUs}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='/work_with_us'>Contact Us</Dropdown.Item>
                    <Dropdown.Item href='/business_with_us'>Business With Us</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>

              <div className="d-flex align-items-center">
                <Dropdown align='end' className='d-none d-md-block'>
                  <Dropdown.Toggle variant="white" id="dropdown-social" className="shadow-none border-0 px-2">
                    {headerData?.followUs}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='#' className='d-flex align-items-center gap-2'>
                      <svg role="img" className='text-dark' width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>LinkedIn</title>
                        <path
                          fill="currentColor"
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                      <span>LinkedIn</span>
                    </Dropdown.Item>
                    <Dropdown.Item href='#' className='d-flex align-items-center gap-2'>
                      <svg role="img" className='text-dark' width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>YouTube</title>
                        <path
                          fill="currentColor"
                          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                      </svg>
                      <span>YouTube</span>
                    </Dropdown.Item>
                    <Dropdown.Item href='#' className='d-flex align-items-center gap-2'>
                      <svg role="img" className='text-dark' width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Instagram</title>
                        <path
                          fill="currentColor"
                          d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
                        />
                      </svg>
                      <span>Instagram</span>
                    </Dropdown.Item>
                    <Dropdown.Item href='#' className='d-flex align-items-center gap-2'>
                       <svg role="img" className='text-dark' width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>X</title>
                        <path
                          fill="currentColor"
                          d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                        />
                      </svg>
                      <span>X</span>
                    </Dropdown.Item>
                    <Dropdown.Item href='#' className='d-flex align-items-center gap-2'>
                      <svg role='img' className='text-dark' width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Facebook</title>
                        <path
                          fill="currentColor"
                          d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
                        />
                      </svg>
                      <span>Facebook</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown align={'end'}>
                  <Dropdown.Toggle variant="white" id="dropdown-language" className="shadow-none border-0 px-2">{language.toUpperCase()}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item active={language === 'en'} onClick={() => setLanguage('en')}>EN</Dropdown.Item>
                    <Dropdown.Item active={language === 'ru'} onClick={() => setLanguage('ru')}>RU</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Navbar.Toggle
                  className="d-lg-none mobile-menu-btn"
                  aria-controls="offcanvasNavbar"
                  onClick={() => setShowMobileMenu(true)}
                  >
                    <span className="navbar-toggler-icon">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="19.7222"
                          stroke="#000"
                          strokeWidth="0.555556"
                        ></circle>
                        <path
                          d="M28.7246 13.3333L11.1103 13.3333"
                          stroke="#000"
                          strokeWidth="2.22222"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M28.7246 20L11.1103 20"
                          stroke="#000"
                          strokeWidth="2.22222"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M28.7246 26.6666L11.1103 26.6666"
                          stroke="#000"
                          strokeWidth="2.22222"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </span>
                </Navbar.Toggle>
              </div>
            </Container>
          </Navbar>

          {/* Desktop Mega Menu */}
          {showMegaMenu && activeCategory && (
            <div className="mega-menu d-none d-lg-block" style={{ position: 'absolute', left: 0, right: 0, zIndex: 1050, top: '100%' }}>
              <Container className="bg-white">
                <Row>
                  <Col md={3} className="border-end">
                    <h5 className="mb-3">{getDisplayName(categories.find(c => c.id === activeCategory)!)}</h5>
                    <Nav className="flex-column">
                      {categories.find(c => c.id === activeCategory)?.subcategories?.map((sub) => (
                        <Nav.Link key={sub.id} className={`py-2 ${activeSubcategory === String(sub.id) ? 'active' : ''}`} onMouseEnter={() => setActiveSubcategory(String(sub.id))} onClick={() => setShowMegaMenu(false)}>
                          {getDisplayName(sub)}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Col>
                  <Col md={9}>
                    <Tabs activeKey={activeSubcategory} onSelect={(k) => setActiveSubcategory(k || '')} className="border-0">
                      {categories.find(c => c.id === activeCategory)?.subcategories?.map((sub) => (
                        <Tab key={sub.id} eventKey={String(sub.id)} title={getDisplayName(sub)} tabClassName="d-none">
                          <Row className='px-3'>
                            {sub.items?.map((item) => (
                              <Col key={item.id} xs={6} md={4} className="mb-3">
                                <a href={item.link} className="text-dark">{getDisplayName(item)}</a>
                              </Col>
                            ))}
                            <Col xs={12} className='border-top pt-3'>  
                              <h6>{navigation_section?.data?.featuredBrands?.[`title${language === 'ru' ? 'Russian' : ''}`] || 'Featured Brands'}</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {categories.find(c => c.id === activeCategory)?.brands?.map((brand, i) => (
                                  <a key={i} href={`#${brand}`} className="badge bg-light text-dark p-2 text-decoration-none">{brand}</a>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </Tab>
                      ))}
                    </Tabs>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
        
        {renderMobileMenu()}
      </header>
    </>
  );
};

export default Header;