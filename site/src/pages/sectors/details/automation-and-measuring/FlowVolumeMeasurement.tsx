import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const FlowVolumeMeasurement: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                FLOW & VOLUME MEASUREMENT SERVICES
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Flow Measurement and Meter Proving'
                        description={[
                            'Pipeline Product Services',
                            'Pipeline Fiscal Flow Allocation',
                            'Petroleum Metering and Calibration',
                            'Offshore Oil and Gas Metering and Calibration',
                            'On-line flow analyzers',
                            'On-line and At-line Process Analyzers'
                        ]}
                        imageSrc={IMAGES.FlowVolMeasure1}
                    />
                    <DetailsBox
                        title='Meter System Support'
                        description={[
                            'Liquid Measurement Services',
                            'Meter Calibration and Repairs',
                            'Flow measurement and calibration',
                            'Turbine Meter Proving and Calibration',
                            'Pipeline flow and revenue allocation',
                            'Fiscal prover Calibration, Fiscal Meter Calibration',
                            'High Volume Meter Proving and Calibration',
                            'Flow Meter proving',
                            'Mass Flow Meter Calibration'
                        ]}
                        imageSrc={IMAGES.FlowVolMeasure2}
                    />
                    <DetailsBox
                        title='Storage Tank Measurement and Calibration'
                        description={[
                            'Above and Underground Storage Tanks',
                            'Horizontal/Spherical/ Cylindrical Tanks',
                            'Metered Calibration of Tank Bottoms',
                            'Metered Calibration of Floating Roof Zones'
                        ]}
                        imageSrc={IMAGES.FlowVolMeasure3}
                    />
                    <DetailsBox
                        title='Tank Dimensional Profile Survey'
                        description={[
                            'Ovality/Out of Roundness',
                            'Verticality/ Out of Plumbness',
                            'Shell Settlement',
                            'Edge Settlement',
                            'Shell optical Calculations',
                            'Rim space calculations',
                            'Offset graphs( Adjacent and opposite stations)',
                            'Ring offset graphs of tank shell'
                        ]}
                        imageSrc={IMAGES.FlowVolMeasure4}
                    />
                </div>
            </section>
        </>
    )
}

export default FlowVolumeMeasurement;