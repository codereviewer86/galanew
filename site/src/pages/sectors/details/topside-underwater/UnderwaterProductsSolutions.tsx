import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const UnderwaterProductsSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                UNDERWATER PRODUCTS & SOLUTIONS
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Unmanned Surface Vessels'
                        description='UNI-PACT/UNI-CAT/DRIX'
                        imageSrc={IMAGES.UnderwaterProducts1}
                    />
                    <DetailsBox
                        title='Survey Equipment'
                        description={[
                            'Geophysical',
                            'Hydrography',
                            'Inspection, Repair and Maintenance (IRM)',
                            'Oceanographic and Environmental',
                            'ROV Equipment',
                            'Subsea Positioning',
                            'Surface Vessel Equipment'
                        ]}
                        imageSrc={IMAGES.UnderwaterProducts2}
                    />
                    <DetailsBox
                        title='Diving + Life Support'
                        description={[
                            'Saturation Diving Equipment',
                            'Surface Diving Equipment',
                            'General Diving Equipment',
                            'Military + Aviation',
                            'Specialized Boats'
                        ]}
                        imageSrc={IMAGES.UnderwaterProducts3}
                    />
                    <DetailsBox
                        title='Buoyancy + Water Weights'
                        description={[
                            'Marine Salvage',
                            'Pipe/Cable Lay',
                            'Pipeline Shore Landing',
                            'Cable Shore Landing',
                            'Crane Load Testing',
                            'Lifeboat and Gangway Testing',
                            'Offshore Construction',
                            'Sea Rescue'
                        ]}
                        imageSrc={IMAGES.UnderwaterProducts4}
                    />
                    <DetailsBox
                        title='Lifting + Mooring'
                        description={[
                            'Green Pin Products',
                            'FBR Products',
                            'William Hackett Products',
                            'Hydraulic Winches',
                            'Equipment Recertification + Management'
                        ]}
                        imageSrc={IMAGES.UnderwaterProducts5}
                    />
                </div>
            </section>
        </>
    )
}

export default UnderwaterProductsSolutions;