import React, { useState, useMemo, useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import '../assets/css/MobileResponsiveMenu.css';

interface MenuItem {
  id: number;
  name: string;
  nameRu: string;
  link: string;
}

interface Subcategory {
  id: number;
  name: string;
  nameRu: string;
  items?: MenuItem[];
}

interface Category {
  id: number;
  name: string;
  nameRu: string;
  icon?: string;
  brands?: string[];
  subcategories?: Subcategory[];
}

interface MobileResponsiveMenuProps {
  categories: Category[];
  language: 'en' | 'ru' | 'tk';
  navigation_section?: {
    data?: {
      featuredBrands?: {
        title?: string;
        titelRussian?: string;
      };
    };
  };
  onClose: () => void;
}

export const MobileResponsiveMenu: React.FC<MobileResponsiveMenuProps> = ({
  categories,
  language,
  onClose,
}) => {
  const [menuView, setMenuView] = useState<{
    level: 0 | 1 | 2;
    activeCategoryId: number | null;
    activeSubcategoryId: number | null;
  }>({
    level: 0,
    activeCategoryId: null,
    activeSubcategoryId: null,
  });

  const getDisplayName = (item: { name: string; nameRu: string }) => {
    return language === 'ru' && item.nameRu ? item.nameRu : item.name;
  };

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === menuView.activeCategoryId),
    [categories, menuView.activeCategoryId]
  );

  const activeSubcategory = useMemo(
    () =>
      activeCategory?.subcategories?.find(
        (s) => s.id === menuView.activeSubcategoryId
      ),
    [activeCategory, menuView.activeSubcategoryId]
  );

  const handleCategoryClick = useCallback((categoryId: number) => {
    setMenuView({
      level: 1,
      activeCategoryId: categoryId,
      activeSubcategoryId: null,
    });
  }, []);

  const handleSubcategoryClick = useCallback((subcategoryId: number) => {
    setMenuView((prev) => ({
      ...prev,
      level: 2,
      activeSubcategoryId: subcategoryId,
    }));
  }, []);
  
  const handleBack = useCallback(() => {
    setMenuView((prev) => {
      if (prev.level === 2) return { ...prev, level: 1, activeSubcategoryId: null };
      if (prev.level === 1) return { level: 0, activeCategoryId: null, activeSubcategoryId: null };
      return prev;
    });
  }, []);

  const handleFinalLinkClick = () => {
    onClose();
  };

  return (
    <>
      <div className="mobile-menu-container">
        <div className={`mobile-menu-panel mt-3 ${menuView.level === 0 ? 'active' : ''}`}>
          <Nav className="flex-column">
            {categories.map((category) => (
              <Nav.Link
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="mobile-menu-item"
              >
                <span>
                  {getDisplayName(category)}
                </span>
                <i className="bi bi-chevron-right"></i>
              </Nav.Link>
            ))}
            <Nav.Link href="/who_we_are" className="mobile-menu-item static-link" onClick={handleFinalLinkClick}>Who We Are</Nav.Link>
            <Nav.Link href="/business_with_us" className="mobile-menu-item static-link" onClick={handleFinalLinkClick}>Business with Us</Nav.Link>
          </Nav>
        </div>
        <div className={`mobile-menu-panel ${menuView.level === 1 ? 'active' : ''}`}>
          {activeCategory && (
            <>
              <div className="mobile-menu-header">
                  <button onClick={handleBack} className="back-button" aria-label='back icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 22, height: 22}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <h5>{getDisplayName(activeCategory)}</h5>
              </div>
              <Nav className="flex-column">
                  {activeCategory.subcategories?.map((sub) => (
                  <Nav.Link
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(sub.id)}
                      className="mobile-menu-item"
                  >
                      <span>{getDisplayName(sub)}</span>
                      <i className="bi bi-chevron-right"></i>
                  </Nav.Link>
                  ))}
              </Nav>
            </>
          )}
        </div>
        <div className={`mobile-menu-panel ${menuView.level === 2 ? 'active' : ''}`}>
          {activeSubcategory && (
            <>
              <div className="mobile-menu-header">
                <button onClick={handleBack} className="back-button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 22, height: 22}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <h5>{getDisplayName(activeSubcategory)}</h5>
              </div>
              <Nav className="flex-column">
                {activeSubcategory.items?.map((item) => (
                  <Nav.Link key={item.id} href={item.link} onClick={handleFinalLinkClick} className="mobile-menu-item final-link">
                    {getDisplayName(item)}
                  </Nav.Link>
                ))}
              </Nav>
              {/* {activeCategory?.brands && activeCategory.brands.length > 0 && (
                <div className='p-3 mt-4 border-top'>  
                  <h6>
                    {language === 'ru' && navigation_section?.data?.featuredBrands?.titelRussian 
                      ? navigation_section.data.featuredBrands.titelRussian 
                      : navigation_section?.data?.featuredBrands?.title || 'Featured Brands'}
                  </h6>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {activeCategory.brands.map((brand, i) => (
                        <a
                          key={i}
                          href={`#${brand}`}
                          className="badge bg-light text-dark p-2 text-decoration-none"
                          onClick={handleFinalLinkClick}
                        >
                          {brand}
                        </a>
                      )
                    )}
                  </div>
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
};