import React, { useEffect } from 'react';
import { IMAGES } from '../utils/staticJSON';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSection } from '../hooks/useSections';
import axiosInstance from '../utils/axiosInstance';

const InfraSector: React.FC = () => {
  const { language } = useLanguage();
  const [sectorItems, setSectorItems] = React.useState([]);
  const { section: infraSectorSection } = useSection('infra_sector');
  const infraSectorData = infraSectorSection?.data?.[language] || {};

  useEffect(() => {
    axiosInstance
      .get('/api/sector-items?type=INFRA')
      .then((res) => setSectorItems(res.data))
      .catch(() => setSectorItems([]));
  }, []);
  return (
    <>
      <section className="banner page-banner">
        <img src={IMAGES.banner_infra_sector} width="100%" />
      </section>
      <section className="service py-5 mb-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div
                className="title pb-1 pt-2 text-center aos-init aos-animate"
                data-aos="fade-up"
              >
                {infraSectorData.title}
              </div>
              <p
                className="pt-3 pb-4 text-center aos-init aos-animate"
                data-aos="fade-up"
              >
                <strong>{infraSectorData.subtitle}</strong>
                <br />
                <br />
                {infraSectorData.description}
              </p>
            </div>
          </div>
          <div className="row g-4 g-lg-4 justify-content-center">
            {sectorItems.map((item: any) => (
              <div className="col-lg-4">
                <div
                  className="service-box aos-init aos-animate"
                  data-aos="fade-up"
                  key={item.id}
                >
                  <Link className="service-box-img" to={`/items/${item.id}`} state={{ service: item}}>
                    <img src={'/upstream.jpg'} alt={item.label} />
                    <div className="arrow-hover">{item.label}</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default InfraSector;
