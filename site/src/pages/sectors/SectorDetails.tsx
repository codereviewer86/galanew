import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { IMAGES } from '../../utils/staticJSON';
import SectorDetailsItem from './details/upstream/SectorDetailsItem';

// const NotFound = React.lazy(() => import('../NotFound'));

// const EngineeredTouchpointAccess = lazy(
//   () => import('./details/ae-mi/EngineeredTouchpointAccess')
// );
// const HeatSolutions = lazy(() => import('./details/ae-mi/HeatSolutions'));
// const IntrusiveNonInrusive = lazy(
//   () => import('./details/ae-mi/IntrusiveNonInrusive')
// );
// const LeakSealingSolutions = lazy(
//   () => import('./details/ae-mi/LeakSealingSolutions')
// );
// const PredictiveMaintenanceSolutions = lazy(
//   () => import('./details/ae-mi/PredictiveMaintenanceSolutions')
// );
// const SealBondedSolutions = lazy(
//   () => import('./details/ae-mi/SealBondedSolutions')
// );
// const AdvancedNDT = lazy(() => import('./details/inspection/AdvancedNDT'));
// const AdvancedTube = lazy(() => import('./details/inspection/AdvancedTube'));
// const Conventional = lazy(() => import('./details/inspection/Conventional'));
// const NonInvasive = lazy(() => import('./details/inspection/NonInvasive'));
// const Specialized = lazy(() => import('./details/inspection/Specialized'));
// const DiverterSystem = lazy(() => import('./details/upstream/DiverterSystem'));
// const EngineeredLeakSealing = lazy(
//   () => import('./details/upstream/EngineeredLeakSealing')
// );
// const SectorDetailsItem = lazy(() => import('./details/upstream/SectorDetailsItem'));
// const Intervention = lazy(() => import('./details/upstream/InterventionPage'));
// const AquariumsPoolsPonds = lazy(
//   () => import('./details/indoor-aquatics/AquariumsPoolsPonds')
// );
// const EnvironmentalMonitoring = lazy(
//   () => import('./details/automation-and-measuring/EnvironmentalMonitoring')
// );
// const ProcessAutomation = lazy(
//   () => import('./details/automation-and-measuring/ProcessAutomation')
// );
// const GasCompressorUnitsFiltrationSystems = lazy(
//   () =>
//     import(
//       './details/automation-and-measuring/GasCompressorUnitsFiltrationSystems'
//     )
// );
// const IndustrialGasChromatography = lazy(
//   () => import('./details/automation-and-measuring/IndustrialGasChromatography')
// );
// const FlowVolumeMeasurement = lazy(
//   () => import('./details/automation-and-measuring/FlowVolumeMeasurement')
// );
// const EngineeringFabrication = lazy(
//   () => import('./details/efcc-and-maintenance/EngineeringFabrication')
// );
// const TopsideInspectionSurvey = lazy(
//   () => import('./details/topside-underwater/TopsideInspectionSurvey')
// );
// const TopsideInstallationMaintenanceRepairs = lazy(
//   () =>
//     import('./details/topside-underwater/TopsideInstallationMaintenanceRepairs')
// );
// const UnderwaterProductsSolutions = lazy(
//   () => import('./details/topside-underwater/UnderwaterProductsSolutions')
// );
// const ModuMopuServicesPlatformMaintenance = lazy(
//   () =>
//     import('./details/topside-underwater/ModuMopuServicesPlatformMaintenance')
// );
// const GeneralDivingTankerVesselsInshoreServices = lazy(
//   () =>
//     import(
//       './details/topside-underwater/GeneralDivingTankerVesselsInshoreServices'
//     )
// );

// const detailsDataStatic = [
//   {
//     title: 'Liner Hanger',
//     description:
//       'Compliance to damaged or deformed casings, enhanced reliability for the life of the well',
//     imageSrc: IMAGES.completionS1,
//   },
//   {
//     title: 'Tieback Liner',
//     description:
//       'Ensure reliability and efficiency while simplifying well construction',
//     imageSrc: IMAGES.completionS2,
//   },
//   {
//     title: 'Advanced Well Architecture',
//     description:
//       'The AWA system provides zonal isolation and zonal control –for an open hole intelligent completion',
//     imageSrc: IMAGES.completionS3,
//   },
//   {
//     title: 'Well Construction & Integrity',
//     description:
//       'Eliminate sustained casing pressure via enhanced well integrity',
//     imageSrc: IMAGES.completionS4,
//   },
//   {
//     title: 'Inner-String Packer',
//     description: 'Create a reliable and high-integrity seal',
//     imageSrc: IMAGES.completionS5,
//   },
//   {
//     title: 'Zonal Isolation',
//     description: 'Enhanced zonal isolation within the reservoir',
//     imageSrc: IMAGES.completionS6,
//   },
//   {
//     title: 'Zonal Control',
//     description: 'Optimize well delivery in changing reservoir conditions',
//     imageSrc: IMAGES.completionS7,
//   },
//   {
//     title: 'Well Abandonment',
//     description: 'Enhance well construction for CAPEX effective P&A',
//     pdfUrl:
//       'https://turkmengala.com/admin/storage/item_feature/pdf/vUVVLUv7gzBjnSS75U6NidTrRhjsghwdOJjOaLzz.pdf',
//     imageSrc: IMAGES.completionS8,
//   },
//   {
//     title: 'CARBON CAPTURE AND STORAGE',
//     description:
//       'To reduce CO2 emissions in the atmosphere and mitigate climate change',
//     imageSrc: IMAGES.completionS9,
//   },
// ];

const SectorDetails: React.FC = () => {
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState<any[]>([]);
  const location = useLocation();
  const passedService = location.state?.service;

  useEffect(() => {
    axiosInstance
      .get('/api/sector-item-service-details?sectorItemServiceId=' + id)
      .then((res) => setDetailsData(res.data))
      .catch(() => setDetailsData([]));
  }, []);

  // const componentMap: { [key: string]: JSX.Element } = {
  //   // upstream
  //   completion: (
  //     <SectorDetailsItem
  //       title="Completion"
  //       description="Our unique solutions span the entire life cycle of a well and challenge conventional thinking on Completions and well integrity."
  //       imageSrc={IMAGES.op6}
  //       detailsData={detailsData}
  //     />
  //   ),
  //   intervention: <Intervention />,
  //   'engineered-leak-sealing-solutions': <EngineeredLeakSealing />,
  //   'diverter-system': <DiverterSystem />,

  //   // inspection
  //   'non-invasive-inspection': <NonInvasive />,
  //   'advanced-ndt-inspection': <AdvancedNDT />,
  //   'specialized-inspection': <Specialized />,
  //   'advanced-tube-inspection': <AdvancedTube />,
  //   'conventional-inspection': <Conventional />,

  //   // ae-mi
  //   'intrusive-non-inrusive-solutions': <IntrusiveNonInrusive />,
  //   'heat-solutions': <HeatSolutions />,
  //   'leak-sealing-solutions': <LeakSealingSolutions />,
  //   'seal-bonded-solutions': <SealBondedSolutions />,
  //   'engineered-touchpoint-access-solutions': <EngineeredTouchpointAccess />,
  //   'predictive-maintenance-solutions': <PredictiveMaintenanceSolutions />,

  //   // automation-and-measuring
  //   'environmental-monitoring': <EnvironmentalMonitoring />,
  //   'process-automation': <ProcessAutomation />,
  //   'gas-compressor-units-filtration-systems': (
  //     <GasCompressorUnitsFiltrationSystems />
  //   ),
  //   'industrial-gas-chromatography': <IndustrialGasChromatography />,
  //   'flow-volume-measurement-services': <FlowVolumeMeasurement />,

  //   // efcc-and-maintenance
  //   'engineering-fabrication-construction-commisioning-and-maintenance': (
  //     <EngineeringFabrication />
  //   ),

  //   // topside-underwater
  //   'topside-inspection-and-survey': <TopsideInspectionSurvey />,
  //   'topside-installation-maintenance-and-repairs': (
  //     <TopsideInstallationMaintenanceRepairs />
  //   ),
  //   'underwater-products-solutions': <UnderwaterProductsSolutions />,
  //   'modu-mopu-services-platform-maintenance': (
  //     <ModuMopuServicesPlatformMaintenance />
  //   ),
  //   'general-diving-tanker-vessels-inshore-services': (
  //     <GeneralDivingTankerVesselsInshoreServices />
  //   ),

  //   // products-procurement
  //   filtration: <Filtration />,
  //   'sealing-solutions': <SealingSolutions />,
  //   'stack-emissions-monitors': <StackEmissionsMonitors />,
  //   'premium-quality-industrial-tools': <PremiumQualityIndustrialTools />,
  //   'hydraulic-pneumatic-tools': <HydraulicPneumaticTools />,
  //   'flow-control-solutions': <FlowControlSolutions />,
  //   'blast-spray-and-ndt-equipments': <BlastSprayNdtEquipments />,

  //   // indoor-aquatics
  //   'aquariums-pools-and-ponds': <AquariumsPoolsPonds />,
  // };

  return (
    <>
      <section className="banner page-banner">
        <img src={IMAGES.banner_energy_sector} width="100%" alt="" />
      </section>
      {/* {componentMap[id as string] || <NotFound />} */}
      <SectorDetailsItem
        title={passedService?.label}
        description={passedService?.description}
        passedService={passedService}
        imageSrc={IMAGES.op6}
        detailsData={detailsData}
      />
    </>
  );
};

export default SectorDetails;
