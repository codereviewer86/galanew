import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const Specialized: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                SPECIALIZED INSPECTION
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Specialized Inspection'
                        description={[
                            'Bolt inspection (PAUT).',
                            'Flange face corrosion inspection(PAUT).',
                            'SRUT - Tank Annular plates corrosion mapping.',
                            'SCAR - Small Controlled Area Radiography.',
                            'Boiler tube inspection with EMAT.',
                            '3D laser scanning surveys.',
                            'SRUT/M-SKIP- Corrosion under pipe support inspection (CUPS).',
                            'Drone inspection.'
                        ]}
                        imageSrc={IMAGES.specialized1}
                    />
                </div>
            </section>
        </>
    )
}

export default Specialized;