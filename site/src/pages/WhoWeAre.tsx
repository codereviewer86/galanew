import React from 'react';
import Zoom from 'react-medium-image-zoom';
import { IMAGES } from '../utils/staticJSON';
import MultiCarousel from 'react-multi-carousel';
import { useSection } from '../hooks/useSections';
import { useLanguage } from '../context/LanguageContext';
import { VITE_API_BASE_URL } from '../utils/axiosInstance';

const WhoWeAre: React.FC = () => {
  const { language } = useLanguage();
  const { section: aboutUsSection } = useSection('about_us');
  const aboutUsData = aboutUsSection?.data?.[language] || {};
  const { section: whoWeAreSection } = useSection('who_we_are');
  const whoWeAreData = whoWeAreSection?.data?.[language] || {};
  const { section: servicesSection } = useSection('services');
  const servicesData = servicesSection?.data?.[language] || {};
  const { section: registrationLicenseSection } = useSection(
    'company_registration_license'
  );
  const registrationLicenseData = registrationLicenseSection?.data || {};
  const { section: partnersSection } = useSection('our_partners');
  const partnersData = partnersSection?.data || {};
  const { section: accreditationsSection } = useSection('our_accreditations');
  const accreditationsData = accreditationsSection?.data || {};
  return (
    <>
      <div className="tg-section pt-0"></div>

      <section id="who-we-are" className="tg-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <p className="text-primary fw-medium mb-2">
                  {whoWeAreData?.heading}
                </p>
                <h1 className="title">{whoWeAreData?.title}</h1>
              </div>
              {whoWeAreData?.paragraphs?.map(
                (paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
            <div className="col-lg-6">
              <img
                className="d-flex rounded-3 h-100 object-fit-cover"
                src={IMAGES.banner_who_we_are}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="tg-section">
        <div className="bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading-box">
                  <p className="text-primary fw-medium mb-2">
                    {aboutUsData?.title}
                  </p>
                  <h2 className="title">{aboutUsData?.headline}</h2>
                  <p>{aboutUsData?.approach}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 flex">
                <img
                  src={IMAGES.AquariumsPoolsAndPonds1}
                  className="img-fluid"
                  alt="Turkmen Gala"
                />
              </div>
              <div className="col-lg-6 flex">
                <div className="row">
                  <div className="col-lg-6">
                    <h3 className="title-sm">
                      {aboutUsData?.sections?.[0]?.title}
                    </h3>
                    <p>{aboutUsData?.sections?.[0]?.description}</p>
                  </div>
                  <div className="col-lg-6">
                    <h3 className="title-sm">
                      {aboutUsData?.sections?.[1]?.title}
                    </h3>
                    <p>{aboutUsData?.sections?.[1]?.description}</p>
                  </div>
                  <div className="col-l">
                    <h3 className="title-sm">
                      {aboutUsData?.sections?.[2]?.title}
                    </h3>
                    <p>{aboutUsData?.sections?.[2]?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our-core-values" className="tg-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading-box">
                <p className="text-primary fw-medium mb-2">
                  {servicesData?.heading}
                </p>
                <h2 className="title">{servicesData?.title}</h2>
                <p>{servicesData?.description}</p>
              </div>
            </div>
          </div>
          <div className="row gy-3">
            {servicesData?.values?.map((value: any) => (
              <div key={value.id} className="col-lg-4 col-md-6 col-sm-6">
                <div className="our-core-values text-start">
                  <div className="d-flex">
                    <div className="our-core-values-iocn">
                      <img
                        className="img-fluid"
                        //@ts-ignore
                        src={IMAGES[value.icon] || IMAGES.family_ocv}
                        loading="lazy"
                        alt={`${value.title} icon`}
                      />
                    </div>
                  </div>
                  <div className="our-core-values-title">{value.title}</div>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="our-partners" className="tg-section">
        <div className="container">
          <div className="heading-box">
            <h2 className="title text-center">
              {partnersData?.title?.[language]}
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-12 aos-init">
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
                  {partnersData?.partnersList?.length > 0 &&
                    partnersData.partnersList.map(
                      (partner: any, index: number) => (
                        <div
                          key={partner.id || index}
                          className="m-3 text-center"
                        >
                          <img
                            src={partner.image.startsWith('https') ? partner.image : partner.image ? `${VITE_API_BASE_URL}${partner.image}` : IMAGES.slide1}
                            loading="lazy"
                            width="120"
                            alt={partner.alt?.[language]}
                          />
                        </div>
                      )
                    )}
                </MultiCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="company-registration-license" className="tg-section">
        <div className="bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading-box">
                  <h2 className="title">
                    {registrationLicenseData?.title?.[language]}
                  </h2>
                  <p>{registrationLicenseData?.description?.[language]}</p>
                </div>
              </div>
            </div>
            <div className="row gy-4 justify-content-center">
              {registrationLicenseData?.images?.length > 0 &&
                registrationLicenseData.images.map(
                  (image: any, index: number) => (
                    <div
                      key={image.id || index}
                      className="col-lg-3 col-md-3 col-sm-4 col-6"
                    >
                      <Zoom>
                        <img
                          src={image.image.startsWith('https') ? image.image : image.image ? `${VITE_API_BASE_URL}${image.image}` : IMAGES.slide1}
                          style={{ cursor: 'pointer' }}
                          loading="lazy"
                          width="200"
                          height="200"
                          alt={image.alt?.[language]}
                        />
                      </Zoom>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </section>

      <section id="our-accreditations" className="tg-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="title text-center">
                {accreditationsData?.title?.[language]}
              </h2>
            </div>
            <div className="col-lg-12 aos-init">
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
                  {accreditationsData?.accreditationsList?.length > 0 &&
                    accreditationsData.accreditationsList.map(
                      (accreditation: any, index: number) => (
                        <div
                          key={accreditation.id || index}
                          className="m-3 text-center d-flex align-items-center justify-content-center"
                          style={{ minHeight: '120px' }}
                        >
                          <img
                            src={accreditation.image.startsWith('https') ? accreditation.image : accreditation.image ? `${VITE_API_BASE_URL}${accreditation.image}` : IMAGES.slide1}
                            loading="lazy"
                            width="120"
                            alt={accreditation.alt?.[language]}
                          />
                        </div>
                      )
                    )}
                </MultiCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
