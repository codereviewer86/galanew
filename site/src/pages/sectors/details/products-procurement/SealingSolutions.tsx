import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const SealingSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                SEALING SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op20} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://chesterton.com/en-us/'>Chesterton</Link> is a world leader in helping process industry companies and manufacturers improve the reliability and efficiency of their process platforms. We are known across a wide range of industries for our award-winning pump and valve sealing solutions, applications expertise, equipment maintenance and wear-prevention products, and knowledgeable hands-on local service.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Sealing Solutions for Rotating Equipment'
                        description={[
                            'Mechanical SealsLink to Mechanical Seals Product line',
                            'Pump PackingLink to Pump Packing Product line',
                            'Rotary SealsLink to Rotary Seals Product line',
                            'Gasket & Joint SealsLink to Gasket & Joint Seals Product line',
                            'Equipment/Process MonitoringLink to Equipment/Process Monitoring Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution1}
                    />
                    <DetailsBox
                        title='Sealing Solutions for Stationary Equipment'
                        description={[
                            'Valve Stem PackingLink to Valve Stem Packing Product line',
                            'Flange Gasket SealingLink to Flange Gasket Sealing Product line',
                            'Heat Exchanger SealingLink to Heat Exchanger Sealing Product line',
                            'Bonnet SealsLink to Bonnet Seals Product line',
                            'Manway SealingLink to Manway Sealing Product line',
                            'Sootblower SolutionsLink to Sootblower Solutions Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution2}
                    />
                    <DetailsBox
                        title='Sealing Solutions for Fluid Power Equipment'
                        description={[
                            'Hydraulic SealsLink to Hydraulic Seals Product line',
                            'Pneumatic SealsLink to Pneumatic Seals Product line',
                            'Sealing Repair KitsLink to Sealing Repair Kits Product line',
                            'Spring Energized SealsLink to Spring Energized Seals Product line',
                            'SpeedSeal CentersLink to SpeedSeal Centers Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution3}
                    />
                    <DetailsBox
                        title='Industrial Lubricants and MRO Chemicals'
                        description={[
                            'Industrial LubricantsLink to Industrial Lubricants Product line',
                            'Cleaners/DegreasersLink to Cleaners/Degreasers Product line',
                            'Maintenance SpecialtiesLink to Maintenance Specialties Product line',
                            'Corrosion ControlLink to Corrosion Control Product line',
                            'Metalworking FluidsLink to Metalworking Fluids Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution4}
                    />
                    <DetailsBox
                        title='ARC Industrial Coatings'
                        description={[
                            'Concrete CoatingsLink to Concrete Coatings Product line',
                            'Metal CoatingsLink to Metal Coatings Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution5}
                    />
                    <DetailsBox
                        title='Equipment Monitoring'
                        description={[
                            'Chesterton Connect Intrinsically Safe SensorLink to Chesterton Connect Intrinsically Safe Sensor Product line',
                            'Chesterton Connect V1.0 SensorLink to Chesterton Connect V1.0 Sensor Product line',
                            'Chesterton Connect Cloud PlatformLink to Chesterton Connect Cloud Platform Product line',
                            'Chesterton Connect GatewayLink to Chesterton Connect Gateway Product line',
                            'Chesterton Connect GaugeLink to Chesterton Connect Gauge Product line'
                        ]}
                        imageSrc={IMAGES.SealingSolution6}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.SealingSolution7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.SealingSolution8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.SealingSolution9}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.SealingSolution10}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SealingSolutions;