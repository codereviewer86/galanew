import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const NonInvasive: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                NON-INVASIVE INSPECTION
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '50%', height: '156px' }} loading='lazy' src={IMAGES.NonInvasive1} />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Phonon Diagnostics Technique (PDT)'
                        description='Utilizing PDT enables real-time inspection of pipelines, tanks and vessels, heat exchangers, boilers, offshore platforms legs and their equipment, risers, etc., without interference with the operating process.'
                        imageSrc={IMAGES.NonInvasive2}
                    />
                    <DetailsBox
                        title='Hybrid Acoustic Technologies Systems (HATS)'
                        description={[
                            'Hybrid Acoustic Technology system (HATs) is an advanced diagnostic and assessment technique to study reliability of an assets.',
                            'It is an integration of multiple Non-Destructive Examination (NDE) methods, acoustic emission technique and advanced data analysis & interpretation to assess the condition of inspected assets.',
                            'HATs capability is focused to detect active anomalies, which are continuously growing and deteriorating in current operating parameters.'
                        ]}
                        imageSrc={IMAGES.NonInvasive3}
                    />
                    <DetailsBox
                        title='Metal Magnetic Memory (MMM) Technologies'
                        description='Metal Magnetic Memory (MMM) technology is an inspection technology that was built based on established correlation between the weak area in a structure and the physics of natural magnetic flux (self-magnetic leakage fields (SMLF)) in a ferrous and paramagnetic material.'
                        imageSrc={IMAGES.NonInvasive4}
                    />
                    <DetailsBox
                        title='Pipe Scans'
                        description='The pipe scan can determine the location of a deposit within a flowing pipeline while keeping our equipment external to the pipe.'
                        imageSrc={IMAGES.NonInvasive5}
                    />
                    <DetailsBox
                        title='Gamma Scans'
                        description={[
                            'Detection of scale in oil and gas pipelines.',
                            'Validation of a mathematical procedure to generate transmitted radiation profiles.',
                            'Quantification of the scale layer thickness by gamma-ray transmission.'
                        ]}
                        imageSrc={IMAGES.NonInvasive6}
                    />
                    <DetailsBox
                        title='CAT Scans'
                        description='C.A.T Scanner are the classic, industry standard Locators used to determine the exact location of buried pipes and cables immediately prior to any form of excavation work taking place.'
                        imageSrc={IMAGES.NonInvasive7}
                    />
                    <DetailsBox
                        title='Neutron Backscatter'
                        description={[
                            'Neutron scattering techniques are non-destructive, penetrating techniques that allow obtaining unique information on the structure and dynamics of materials.',
                            'It find uses in many applications ranging from engineering and building, mining, archeology, medicine, food processing and scientific research.'
                        ]}
                        imageSrc={IMAGES.NonInvasive8}
                    />
                    <DetailsBox
                        title='Flooded Member Detection'
                        description='Flooded Member Detection (FMD), which is sometimes referred to also as Flooded Member Inspection (FMI) is a test that is carried out to determine if water is present in subsea structural members – which would in turn be an indicator of a through wall defect in the member.'
                        imageSrc={IMAGES.NonInvasive9}
                    />
                </div>
            </section>
        </>
    )
}

export default NonInvasive;