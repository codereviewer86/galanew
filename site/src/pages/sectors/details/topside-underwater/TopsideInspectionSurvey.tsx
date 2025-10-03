import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const TopsideInspectionSurvey: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                TOPSIDE INSPECTION AND SURVEY
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Topside Inspection and Survey'
                        description={[
                            'Underwater inspections in lieu of dry docking (UWILD)',
                            'Conventional and Advanced NDT with Rope Access',
                            'Lifting and Rigging gear inspection and certification',
                            'Shipyard and ofﬂloading facilities',
                            'Flare tip and ﬂare line inspections',
                            'Restricted access and confined space entry',
                            'Stack and chimney inspections',
                            'Derrick inspections',
                            'Restricted access and confined space entry',
                            'Vessel condition and class surveys (ABS & BV)',
                            'Shutdown and turnaround inspection services',
                            'Remote imaging (CCTV)',
                            'Difficult access plant and piping inspections',
                            'NACE blasting and coating inspection',
                            'Baseline Surveys • DROPS – Dropped Object Surveys',
                            'Stand by rescue team',
                            'Wind Turbines Inspections and Maintenance'
                        ]}
                        imageSrc={IMAGES.TopsideInspectionSurvey1}
                    />
                </div>
            </section>
        </>
    )
}

export default TopsideInspectionSurvey;