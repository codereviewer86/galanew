import React from 'react';
import { IMAGES } from '../utils/staticJSON';
import MultiCarousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import { useSection } from '../hooks/useSections';
import { useLanguage } from '../context/LanguageContext';

const BusinessWithUs: React.FC = () => {
  const { language } = useLanguage();
  const { section: ourPartnersSection } = useSection('our_partners');
  const { section: businessPageSection } = useSection('business_with_us');
  const ourPartnersData = ourPartnersSection?.data || {};
  const businessPageData = businessPageSection?.data || {};
  const businessWithUsData = businessPageData?.[language]?.businessWithUs || {};
  const businessUnitsData = businessPageData?.[language]?.businessUnits || {};
  return (
    <>
      <section className="banner page-banner">
        <img src={IMAGES.banner_business_with_us} width="100%" />
      </section>
      <section className="py-5 mb-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto text-center">
              <div
                className="title pb-1 pt-2 fw-normal text-primary aos-init aos-animate"
                data-aos="fade-up"
              >
                {businessWithUsData?.title}
              </div>
              <p
                className="pt-3 pb-0 text-center fw-bold aos-init aos-animate"
                data-aos="fade-up"
              >
                {businessWithUsData?.description}
              </p>
              <p className="aos-init" data-aos="fade-up">
                <b>
                  {businessWithUsData?.countryValue?.title}
                  <br />
                  {businessWithUsData?.countryValue?.subtitle}{' '}
                </b>
              </p>
              <p className="aos-init" data-aos="fade-up">
                {businessWithUsData?.countryValue?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="business-units">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 m-auto text-center">
              <div
                className="title pb-1 pt-2 fw-normal text-primary aos-init"
                data-aos="fade-up"
              >
                {businessUnitsData?.title}
              </div>
              <p
                className="pt-3 pb-0 text-center text-white aos-init"
                data-aos="fade-up"
              >
                {businessUnitsData?.description}
              </p>
              <div className="btn-bssines-units aos-init" data-aos="fade-up">
                <Link className="btn btn-grey" to={'/energy_sector'}>
                  {businessUnitsData?.buttons?.energy}
                </Link>
                <Link className="btn btn-warning" to={'/infra_sector'}>
                  {businessUnitsData?.buttons?.infra}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 mb-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto text-center ">
              <div
                className="title pb-1 pt-2 fw-normal text-primary aos-init"
                data-aos="fade-up"
              >
                {ourPartnersData?.title?.[language]}
              </div>
              <p className="pt-3 pb-0 text-center aos-init" data-aos="fade-up">
                {ourPartnersData?.description?.[language]}
              </p>
            </div>
          </div>
          <div className="row our-partners-logo mt-3 justify-content-center">
            <MultiCarousel
              infinite={true}
              autoPlay={true}
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 6,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 3,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
            >
              {ourPartnersData?.partnersList?.length > 0 &&
                ourPartnersData?.partnersList?.map(
                  (partner: any, index: number) => (
                    <div className="m-3 text-center" key={index}>
                      <img
                        src={partner.image}
                        loading="lazy"
                        width="120"
                        alt={partner.name}
                      />
                    </div>
                  )
                )}
            </MultiCarousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessWithUs;
