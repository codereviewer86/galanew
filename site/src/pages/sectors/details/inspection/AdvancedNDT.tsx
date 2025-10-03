import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const AdvancedNDT: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">ADVANCED NDT INSPECTION</h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Weld Inspection'
                        description={[
                            'PAUT and TOFD manual and automated weld inspection services.',
                            'ACFM-Alternating Current field measurement.',
                            'Magna FORM- Eddy Current Array (ECA) Weld and Stress Corrosion Cracking Inspections.'
                        ]}
                        imageSrc={IMAGES.completionS1}
                    />
                    <DetailsBox
                        title='Corrosion Mapping'
                        description={[
                            'Automated Ultrasonic Corrosion Mapping- RMS.',
                            'Scorpion Tank Crawler-Remote access ultrasonic(UT).',
                            'Hydro FORM- Phased Array Corrosion Mapping.',
                            'Flexor FORM- Phased Array Corrosion Mapping for pipe elbows and small diameter piping.',
                            '3D Laser Scanning for corrosion and mechanical damage assessment.',
                            'MFL - Tank floor corrosion Mapping.',
                            'Pulsed Eddy Current -PEC',
                            'Pulsed Eddy Current Array - PECA and PECA HR.',
                            'EMAT-Electro Magnetic Acoustic Transducer.',
                            'AE-Acoustic Emission.',
                            'Digital and Realtime radiography.',
                            'LRUT- Long Range Ultrasonic pipe inspection.'
                        ]}
                        imageSrc={IMAGES.completionS2}
                    />
                </div>
            </section>
        </>
    )
}

export default AdvancedNDT;