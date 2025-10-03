import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const StackEmissionsMonitors: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                STACK EMISSIONS MONITORS
                            </h1>
                            <div className="py-3 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op11} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.codel.co.uk/'>CODEL International Ltd</Link> is a UK-company based in Bakewell was initially formed in 1982 to design and manufacture gas monitors for process control. Our products form a wide range of instrumentation from <Link to='https://www.codel.co.uk/products/stack-emission-monitoring/dust-monitors/'>dust monitors</Link> through to fully automated and integrated <Link to='https://www.codel.co.uk/products/stack-emission-monitoring/'>emissions monitoring systems</Link>. All CODEL products are designed in Bakewell and as of 2014 we joined the <Link to='https://www.forbesmarshall.com/'>Forbes Marshall Group</Link>.
                                </p>
                            </div>
                            <div className='pb-5'>
                                <img className='img-fluid' src={IMAGES.StackEmissionsM1} loading='lazy' alt="" />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='DCEM2100- Dual Pass Opacity / Dust Monitor'
                        description={[
                            '% opacity or dust density in mg/Nm3',
                            'TUV & MCERT Approved',
                            'Dual-pass, open-path transmissometer',
                            'Integral auto zero and span check',
                            'Full contamination check on all active optical surfaces',
                            'Dynamic misalignment check',
                            'Integral high efficiency air curtains for maximum uninterrupted service'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM2}
                    />
                    <DetailsBox
                        title='EnergyTech 301- Tribo Electric Dust Monitor'
                        description={[
                            'Direct sensing method, actual particulate concentration',
                            'Automated online zero and span checking facility',
                            'Integrated calibration function for mg/m3 output',
                            'Easy installation with minimal maintenance required',
                            'Adaptable, suitable for virtually all dust collectors',
                            'Wide range of duct sizes from 250mm to 2m'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM3}
                    />
                    <DetailsBox
                        title='EnergyTech 101- Single Pass Opacity / Dust Monitor'
                        description={[
                            'Simple installation - high reliability - very low maintenance',
                            'Proven technology meets legislative requirements',
                            'Data in % opacity, mg/m3, mg/Nm3 dust',
                            'Lens contamination minimised by high-efficiency air purges'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM4}
                    />
                    <DetailsBox
                        title='GCEM40- Single or Multi-channel In-situ Flue Gas Analyser'
                        description={[
                            'Single or Multi-species infrared absorption analyser',
                            'In-situ stainless steel probe measurement',
                            'CO, NO, NO2, NOx, SO2, CH4, HCI, CO2 & H2O',
                            'Gas temperature and pressure sensors, on-board normalisation',
                            'Export of data to SCADA, DCS and Data Acquisition System',
                            'Analogue & serial digital output',
                            'Certified to EN15267'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM5}
                    />
                    <DetailsBox
                        title='GCEM40E- Extractive Gas Analyser'
                        description={[
                            'Single or Multi-species infrared absorption analyser',
                            'Hot Extractive System',
                            'CO, NO, NO2, NOx, SO2, CH4, HCI, CO2 & H2O',
                            'Gas temperature and pressure sensors',
                            'Analogue & serial digital output'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM6}
                    />
                    <DetailsBox
                        title='VCEM5100- Gas Velocity Monitor'
                        description={[
                            'Non-contact infra-red sensing',
                            'Continuous measurement',
                            'Suitable for hot and dirty gases',
                            'No limit on upper gas temperature',
                            'No moving components',
                            'High availability, low maintenance requirement'
                        ]}
                        imageSrc={IMAGES.StackEmissionsM7}
                    />
                </div>
            </section>
        </>
    )
}

export default StackEmissionsMonitors;