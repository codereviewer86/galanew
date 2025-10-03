import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const HeatSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">HEAT SOLUTIONS</h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Glass'
                        description={[
                            'Controlled Furnace Heat-up & Expansion Control.',
                            'Rapid Cullet Filling.',
                            'High-Speed Draining.',
                            'Controlled Furnace Cool Down & Contraction Control.',
                            'Rapid Furnace Cool Down.',
                            'Hot/Cold Drilling for Booster, T/C, and Bubbler Installation.',
                            'Thermal Decongestion of The Regenerator.',
                            'Full Turnkey Operations on Glass-to-Glass Projects.',
                            'Furnace Inspection.'
                        ]}
                        imageSrc={IMAGES.heatS1}
                    />
                    <DetailsBox
                        title='Refractory Dry-Out'
                        description={[
                            'Petro Chemical&Other Chemicals',
                            'Iron&Steel',
                            'Boilers',
                            'Cement',
                            'Non-Ferrous Metal'
                        ]}
                        imageSrc={IMAGES.heatS2}
                    />
                    <DetailsBox
                        title='Heat Treatments'
                        description={[
                            'Post Weld Heat Treatment Services',
                            'Local Stress Relieving (LSR)/Normalizing/Annealing'
                        ]}
                        imageSrc={IMAGES.heatS3}
                    />
                    <DetailsBox
                        title='Hot Air Drying'
                        description='Heat Exchanger/Vessels'
                        imageSrc={IMAGES.heatS4}
                    />
                </div>
            </section>
        </>
    )
}

export default HeatSolutions;