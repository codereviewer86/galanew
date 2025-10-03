import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const Conventional: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                CONVENTIONAL INSPECTION
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Conventional Inspection'
                        description={[
                            'Visual Inspection Services (GVI and CVI).',
                            'Radiography, Gamma/X-Ray (RT).',
                            'Ultrasonic Testing (UT) Services.',
                            'Dye Penetrant Testing (DPI-PT).',
                            'Magnetic Particle Testing (MPI-MT).',
                            'Eddy-Current Testing Services (ECT).',
                            'Vacuum box welds testing (LT).',
                            'Infrared Thermography.',
                            'Positive Material Identification - (PMI) Testing.',
                            'Hardness testing.'
                        ]}
                        imageSrc={IMAGES.Conventional1}
                    />
                </div>
            </section>
        </>
    )
}

export default Conventional;