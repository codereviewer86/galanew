import React, { useEffect, useState } from 'react';
import { Carousel, Col, Nav, Row, Tab } from 'react-bootstrap';
import MultiCarousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import { IMAGES } from '../utils/staticJSON';
import { useLanguage } from '../context/LanguageContext';
import axiosInstance, { VITE_API_BASE_URL } from '../utils/axiosInstance';
import { useSection } from '../hooks/useSections';

const Home: React.FC = () => {
  const { language } = useLanguage();

  const [sectorItems, setSectorItems] = useState<any[]>([]);
  const { section: about_us_section } = useSection('about_us');
  const aboutUsContent = about_us_section?.data[language] || {};
  const { section: who_we_are_section } = useSection('who_we_are');
  const whoWeAreContent = who_we_are_section?.data[language] || {};
  const { section: comprehensive_section } = useSection('comprehensive');
  const comprehensiveContent = comprehensive_section?.data[language] || {};
  const { section: our_partners_section } = useSection('our_partners');
  const ourPartnersContent = our_partners_section?.data || {};
  const { section: our_accreditations_section } =
    useSection('our_accreditations');
  const ourAccreditationsContent = our_accreditations_section?.data || {};
  const { section: banner_carousel_section } = useSection('banner_carousel');
  const bannerCarouselData = banner_carousel_section?.data?.slidesList || [];
  const { section: homepage_section } = useSection('homepage');
  const homepageData = homepage_section?.data?.[language] || {};
  const reliablePartnerData = homepageData?.reliable || {};
  const energyData = homepageData?.energy || {};
  const infraData = homepageData?.infra || {};
  const isRu = language === 'ru';

  useEffect(() => {
    axiosInstance
      .get('/api/sector-items')
      .then((res) => setSectorItems(res.data))
      .catch(() => setSectorItems([]));
  }, []);

  return (
    <>
      <main className="homepage-container">
        <section className="banner slider-banner tg-section py-0">
          <Carousel
            indicators={true}
            controls={false}
            draggable={false}
            fade
            interval={2000}
            style={{ width: '100%', height: '500px' }}
          >
            {bannerCarouselData.length > 0 &&
              bannerCarouselData.map((slide: any, index: number) => (
                <Carousel.Item key={index} style={{ width: '100%' }}>
                  <img
                    className="d-block w-100"
                    style={{
                      height: '500px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    src={slide.image.startsWith('https') ? slide.image : slide.image ? VITE_API_BASE_URL + slide.image : IMAGES.slide1}
                    alt={
                      slide.alt?.[language] ||
                      slide.alt?.['en'] ||
                      'Banner slide'
                    }
                  />
                  <Carousel.Caption>
                    <div
                      className="carousel-caption aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <h5>
                        {slide.caption?.[language] ||
                          slide.caption?.['en'] ||
                          ''}
                      </h5>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </section>

        <section className="tg-section service">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <h1 className="title">{reliablePartnerData.title}</h1>
                <p>{reliablePartnerData.description}</p>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="vstack">
                  <span className="title">
                    {reliablePartnerData.yearsOfServiceNumber}
                  </span>
                  <p className="mb-1">{reliablePartnerData.yearsOfService}</p>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="vstack">
                  <span className="title">
                    {reliablePartnerData.internationalPartnersNumber}
                  </span>
                  <p className="mb-1">
                    {reliablePartnerData.internationalPartners}
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="vstack">
                  <span className="title">
                    {reliablePartnerData.employeesNumber}
                  </span>
                  <p className="mb-1">{reliablePartnerData.employees}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tg-section service">
          <div className="bg-light py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="title">{energyData.title}</div>
                  <p className="py-2">
                    {energyData.description}
                  </p>
                </div>
              </div>
              <MultiCarousel
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                draggable={false}
                swipeable={true}
                transitionDuration={500}
                slidesToSlide={1}
                responsive={{
                  desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 4,
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
                {sectorItems
                  .filter((item) => item.type === 'ENERGY')
                  .map((service) => (
                    <div className="service-box m-2" key={service.id}>
                      <Link
                        className="service-box-img"
                        to={`/items/${service.id}`}
                        state={{ service }}
                      >
                        <img
                          className="img-fluid"
                          src={service.img && service.img !== " " ? `${VITE_API_BASE_URL}${service.img}` : '/upstream.jpg'}
                          alt={isRu ? service.labelRu : service.label}
                        />
                        <div className="arrow-hover">{isRu ? service.labelRu : service.label}</div>
                      </Link>
                    </div>
                  ))}
              </MultiCarousel>
            </div>
          </div>
        </section>

        <section className="tg-section service">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="title">{infraData.title}</div>
                <p>
                  {infraData.description}
                </p>
              </div>
            </div>
            <MultiCarousel
              className="multi-carousel2"
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              swipeable={true}
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 2,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
            >
              {sectorItems
                .filter((item) => item.type === 'INFRA')
                .map((service) => (
                  <div key={service.id} className="service-box m-2">
                    <Link
                      className="service-box-img"
                      to={`/items/${service.id}`}
                      state={{ service }}
                    >
                      <img
                        className="img-fluid"
                        src={service.img && service.img !== " " ? `${VITE_API_BASE_URL}${service.img}` : IMAGES.AquariumsPoolsAndPonds1}
                        alt={isRu ? service.labelRu : service.label}
                      />
                      <div className="arrow-hover">{isRu ? service.labelRu : service.label}</div>
                    </Link>
                  </div>
                ))}
            </MultiCarousel>
          </div>
        </section>

        <section className="tg-section">
          <div className="bg-light py-5">
            <div className="container">
              <div className="heading-box">
                <div className="row align-items-center">
                  <div className="col-sm">
                    <h2 className="title">{homepageData?.latestNews?.title}</h2>
                  </div>
                  {/* <div className="col-auto">
                    <Link to={'/news'}>{homepageData?.latestNews?.viewAll}</Link>
                  </div> */}
                </div>
              </div>

              <iframe src='https://widgets.sociablekit.com/linkedin-page-posts/iframe/25584448' frameBorder='0' width='100%' height='1000'></iframe>

              {/* <MultiCarousel
                infinite={true}
                autoPlay={true}
                showDots={false}
                arrows={true}
                responsive={{
                  desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 3,
                  },
                  tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 2,
                  },
                  mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                  },
                }}
              >
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-box m-2">
                  <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                      <svg
                        className="size-28"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="56" height="56" rx="10" fill="white" />
                        <path
                          d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                          fill="url(#paint0_linear_2204_541)"
                        />
                        <path
                          d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                          fill="#2684FF"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2204_541"
                            x1="24.734"
                            y1="29.2284"
                            x2="16.1543"
                            y2="44.0429"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#0052CC" />
                            <stop offset="0.92" stopColor="#2684FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-3xl font-semibold mb-[100px]">
                        Atlassian
                      </h3>
                      <p className="">
                        A software that develops products for software
                        developers and developments.
                      </p>
                    </div>
                  </div>
                </div>
              </MultiCarousel> */}
            </div>
          </div>
        </section>

        <section className="tg-section">
          <div className="container">
            <div className="heading-box">
              <h2 className="title text-center">
                {ourPartnersContent.title?.[language] ||
                  ourPartnersContent.title?.en ||
                  'Our Partners'}
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
                    {(ourPartnersContent.partnersList || []).map(
                      (partner: any, index: number) => (
                        <div
                          key={partner.id || index}
                          className="m-3 text-center d-flex align-items-center justify-content-center"
                          style={{ minHeight: '120px' }}
                        >
                          <img
                            src={partner.image.startsWith('https') ? partner.image : partner.image ? `${VITE_API_BASE_URL}${partner.image}` : IMAGES.slide1}
                            loading="lazy"
                            width="120"
                            alt={
                              partner.alt?.[language] ||
                              partner.alt?.en ||
                              partner.alt
                            }
                            style={{ objectFit: 'contain' }}
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

        <section className="tg-section">
          <div className="container">
            <div className="heading-box">
              <h2 className="title">{comprehensiveContent.title}</h2>
            </div>
            <div className="tg-default-tabs">
              <Tab.Container id="tg-tabs" defaultActiveKey="id1">
                <Row className="tw-mt-6">
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      {comprehensiveContent?.tabs?.map((tab: any) => (
                        <Nav.Item key={tab.id}>
                          <Nav.Link eventKey={tab.id}>{tab.title}</Nav.Link>
                        </Nav.Item>
                      ))}
                      {/* <Nav.Item>
                        <Nav.Link eventKey="id1">Oil & Gas</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id2">Pulp & Paper</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id3">Power Generation</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id4">Chemical</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id5">Water & Waste water</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id6">Medical</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id7">
                          Mining, Minerals & Metals
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="id8">Automotive & others</Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content className="tg-tab-content">
                      {comprehensiveContent?.tabs?.map((tab: any) => (
                        <Tab.Pane eventKey={tab.id} key={tab.id}>
                          <h3 className="h4 fw-bold">{tab.title}</h3>
                          <p>{tab.description}</p>
                          <ul className="list-group list-group-flush gap-2">
                            {tab.services.map((service: any, index: number) => (
                              <li key={index}>
                                <a
                                  href={service.link}
                                  className="page-link text-decoration-underline"
                                >
                                  {service.name} &gt;
                                </a>
                              </li>
                            ))}
                          </ul>
                        </Tab.Pane>
                      ))}
                      {/* <Tab.Pane eventKey="id1">
                        <h3 className="h4 fw-bold">Oil & gas</h3>
                        <p>
                          Exploration, production, and processing of oil and
                          gas.
                        </p>
                        <ul className="list-group list-group-flush gap-2">
                          <li>
                            <a
                              href=""
                              className="page-link text-decoration-underline"
                            >
                              Exploration and Drilling &gt;
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="page-link text-decoration-underline"
                            >
                              Production Optimization &gt;
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="page-link text-decoration-underline"
                            >
                              Pipeline Maintenance &gt;
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="page-link text-decoration-underline"
                            >
                              Refinery Services &gt;
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="page-link text-decoration-underline"
                            >
                              Safety and Compliance &gt;
                            </a>
                          </li>
                        </ul>
                      </Tab.Pane>
                      <Tab.Pane eventKey="id2">Second tab content</Tab.Pane>
                      <Tab.Pane eventKey="id3">Second tab content</Tab.Pane>
                      <Tab.Pane eventKey="id4">Second tab content</Tab.Pane>
                      <Tab.Pane eventKey="id5">Second tab content</Tab.Pane> */}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </section>

        <section className="tg-section">
          <div className="bg-light py-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="heading-box">
                    <h2 className="title">{aboutUsContent.headline}</h2>
                    <p>{aboutUsContent.approach}</p>
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
                        {aboutUsContent?.sections?.[0]?.title}
                      </h3>
                      <p>{aboutUsContent?.sections?.[0]?.description}</p>
                    </div>
                    <div className="col-lg-6">
                      <h3 className="title-sm">
                        {aboutUsContent?.sections?.[1]?.title}
                      </h3>
                      <p>{aboutUsContent?.sections?.[1]?.description}</p>
                    </div>
                    <div className="col-l">
                      <h3 className="title-sm">
                        {aboutUsContent?.sections?.[2]?.title}
                      </h3>
                      <p>{aboutUsContent?.sections?.[2]?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tg-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-flex">
                <div>
                  <h2 className="title">{whoWeAreContent.title}</h2>
                  <p>{whoWeAreContent?.paragraphs?.[0]}</p>
                  <p>{whoWeAreContent?.paragraphs?.[1]}</p>
                  <p>{whoWeAreContent?.paragraphs?.[2]}</p>
                  <p>{whoWeAreContent?.paragraphs?.[3]}</p>
                  <Link className="btn d-inline-flex btn-outline-primary border shadow-none" to={'/who_we_are'}>
                    {whoWeAreContent?.button?.text}{' '}
                    <img src={IMAGES.ArrowR} className="ms-2" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <img
                  src={IMAGES.AquariumsPoolsAndPonds1}
                  className="img-fluid"
                  alt="Turkmen Gala"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="tg-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="title text-center">
                  {ourAccreditationsContent.title?.[language]}
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
                    {(ourAccreditationsContent.accreditationsList || []).map(
                      (accreditation: any, index: number) => (
                        <div
                          key={accreditation.id || index}
                          className="m-3 text-center d-flex align-items-center justify-content-center"
                          style={{ minHeight: '150px' }}
                        >
                          <img
                            src={accreditation.image.startsWith('https') ? accreditation.image : accreditation.image ? VITE_API_BASE_URL + accreditation.image : IMAGES.slide1}
                            loading="lazy"
                            width="120"
                            height={150}
                            alt={accreditation.alt?.[language]}
                            style={{ objectFit: 'contain' }}
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
      </main>
    </>
  );
};

export default Home;
