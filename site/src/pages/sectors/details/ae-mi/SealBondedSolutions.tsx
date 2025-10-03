import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const SealBondedSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                SEAL BONDED SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op13} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.cold-pad.com/solutions'>Cold Pad</Link> provides durable composite bonding & fastening solutions to facilitate structural maintenance, retrofit & upgrade operations while reducing OPEX by eradicating associated costs. Cold Pad ambitions to lower the use of materials, manhours and energy from the construction phase to the life extension and decommissioning of structures.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Cold Bonding Technologies'
                        description={[
                            'C-Claw: Heavy duty mechanical fasteners',
                            'BRAD: Pit repair',
                            'C-ELLULAR for structural reinforcement'
                        ]}
                        imageSrc={IMAGES.sealBonded1}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.sealBonded2}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.sealBonded3}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.sealBonded4}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.sealBonded5}
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

export default SealBondedSolutions;