import React, { useEffect } from 'react';
import { IMAGES } from '../utils/staticJSON';
import { useLanguage } from '../context/LanguageContext';
import { useSection } from '../hooks/useSections';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router';

const EnergySector: React.FC = () => {
  const { language } = useLanguage();
  const [sectorItems, setSectorItems] = React.useState([]);
  const { section: energySectorSection } = useSection('energy_sector');
  const energySectorData = energySectorSection?.data?.[language] || {};

  useEffect(() => {
    axiosInstance
      .get('/api/sector-items?type=ENERGY')
      .then((res) => setSectorItems(res.data))
      .catch(() => setSectorItems([]));
  }, []);

  return (
    <>
      <section className="banner page-banner">
        <img src={IMAGES.banner_energy_sector} width="100%" />
      </section>
      <section className="service py-5 mb-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div
                className="title pb-1 pt-2 text-center aos-init aos-animate"
                data-aos="fade-up"
              >
                {energySectorData.title}
              </div>
              <p
                className="pt-3 pb-4 text-center aos-init aos-animate"
                data-aos="fade-up"
              >
                <strong>
                  {energySectorData.subtitle}
                </strong>
                <br />
                <br />
                {energySectorData.description}
              </p>
            </div>
          </div>
          <div className="row g-4 g-lg-4 justify-content-center">
            {sectorItems.map((item: any) => (
              <div className="col-lg-4" key={item.id}>
                <div
                  className="service-box aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <Link className="service-box-img" to={`/items/${item.id}`} state={{ service: item }}>
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

export default EnergySector;
