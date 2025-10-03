import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const AdvancedTube: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                ADVANCED TUBE INSPECTION
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Advanced Tube Inspection'
                        description={[
                            'Remote Field Technology (RFT).',
                            'Near Field Testing/Near Field Array (NFT/NFA).',
                            'Magnetic Flux Leakage (MFL).',
                            'Eddy Current Testing /Eddy Current Array (ECT/ECA).',
                            'Internal Rotary Inspection System (IRIS).'
                        ]}
                        imageSrc={IMAGES.AdvancedTube1}
                    />
                </div>
            </section>
        </>
    )
}

export default AdvancedTube;