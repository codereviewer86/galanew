import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const ModuMopuServicesPlatformMaintenance: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                MODU & MOPU SERVICES PLATFORM MAINTENANCE
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='MODU & MOPU Services Platform Maintenance'
                        description={[
                            'Underwater cofferdam construction and installation',
                            'Scour inspection and repair',
                            'Epoxy injection and pile encapsulation',
                            'Intake & Outfall',
                            'Cooling water intakes',
                            'Cathodic Measurement Anode replacement/installation',
                            'Flooded Member Detection',
                            'Marine Growth Measurement',
                            'Wave height Measurement',
                            'Leg & Riser cleaning Platform Maintenance (Riser Repairs/Clamp installation)',
                            'Painting (subsea) Decommissioning'
                        ]}
                        imageSrc={IMAGES.MODUMOPU1}
                    />
                </div>
            </section>
        </>
    )
}

export default ModuMopuServicesPlatformMaintenance;