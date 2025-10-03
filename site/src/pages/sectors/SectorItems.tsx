import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { IMAGES } from '../../utils/staticJSON';
import ItemList from './items/ItemList';

// const NotFound = React.lazy(() => import('../NotFound'));

// const servicesStatic = [
//   {
//     to: '/details/completion',
//     img: IMAGES.completion,
//     label: 'Completion',
//   },
//   {
//     to: '/details/intervention',
//     img: IMAGES.intervention,
//     label: 'Intervention',
//   },
//   {
//     to: '/details/engineered-leak-sealing-solutions',
//     img: IMAGES.engineeredLeakSealingSolutions,
//     label: 'ENGINEERED LEAK SEALING SOLUTIONS',
//   },
//   {
//     to: '/details/diverter-system',
//     img: IMAGES.diverterSystem,
//     label: 'DIVERTER SYSTEM',
//   },
// ];

const SectorItems: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedService = location.state?.service; // Get the service data passed from Home component
  
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get('/api/sector-item-services?sectorItemId=' + id);
        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchServices();
  }, []);

  // const componentMap: { [key: string]: JSX.Element } = {
  //   '1': (
  //     <ItemList
  //       {...{
  //         title: 'Upstream',
  //         description:
  //           'Empowers Upstream Operational Efficiency through Technology',
  //         services,
  //       }}
  //     />
  //   ),
  //   inspection: <Inspection />,
  //   'ae-mi': <AeMi />,
  //   'automation-and-measuring': <AutomationMeasuring />,
  //   'efcc-and-maintenance': <EfccMaintenance />,
  //   'topside-underwater': <TopsideUnderwater />,
  //   'products-procurement': <ProductsProcurement />,
  //   'indoor-aquatics': <IndoorAquatics />,
  // };

  return (
    <>
      <section className="banner page-banner">
        <img src={IMAGES.banner_infra_sector} width="100%" alt="" />
      </section>
      {/* {componentMap[id as string] || <NotFound />} */}
      <ItemList
        {...{
          title: passedService?.label,
          description: passedService?.description,
          passedService,
          services,
        }}
      />
    </>
  );
};

export default SectorItems;
