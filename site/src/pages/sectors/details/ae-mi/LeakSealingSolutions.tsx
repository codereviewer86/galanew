import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const LeakSealingSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                LEAK SEALING SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ height: '156px' }} loading='lazy' src={IMAGES.LeakSealing1} />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Composite Repair'
                        description={[
                            'Reinforcekit 1D',
                            'Reinforcekit 4D(R4D)-High Performance',
                            'Reinforcekit 4D Subsea (R4DS)',
                            'Stopkit-Tank and Pressure Vessel',
                            'Reinforcekit Beam-Structure Reinforcement',
                            'Tankit-Tank and Pressure Vessel',
                            'Rollerkit- Corrosion Under Pipe Support',
                            'Stopkit (Pipes)',
                            'Reflangekit- Flange Repair'
                        ]}
                        imageSrc={IMAGES.LeakSealing2}
                    />
                    <DetailsBox
                        title='Compound Repair'
                        description={[
                            'Clamp & Safety Stiffeners',
                            'Injectable Box & Clamps Strong Back',
                            'Dedicated Injection Tools'
                        ]}
                        imageSrc={IMAGES.LeakSealing3}
                    />
                    <DetailsBox
                        title='Mechanical Seals, Packing & Gaskets, Pneumatic & Hydraulic Sealing'
                        description={[
                            'Cartridge Seals',
                            'Cassette Seals',
                            'Gas Seals',
                            'Component Seals',
                            'Mixer Seals',
                            'Specialty Seals'
                        ]}
                        imageSrc={IMAGES.LeakSealing4}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.LeakSealing5}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.LeakSealing6}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.LeakSealing7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.LeakSealing8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeakSealingSolutions;