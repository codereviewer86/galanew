import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const DiverterSystem: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                DIVERTER SYSTEM
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op19} />
                                <p className="MsoNoSpacing">
                                    <b>
                                        JVS has over 20 years experience in performing onsite inspection and recertification of the KFDJ diverter system, sale of spares and manufacture new components of the diverter system.
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='New Manufacture & Onsite Recertification of KFDJ Diverter System'
                        description='Performing Onsite Dismantle, Clean and Inspection of Diverter Assembly.'
                        imageSrc={IMAGES.DiverterSystem1}
                    />
                    <DetailsBox
                        title='Onsite Inspection & Refurbishment of Diverter System'
                        description={[
                            'Inspected Diverter Assembly is run inhole to perform Diverter Assembly Pressure test.',
                            'Issue of Statement of Fact upon completion of work.',
                            'Inline with API 64'
                        ]}
                        imageSrc={IMAGES.DiverterSystem2}
                    />
                    <DetailsBox
                        title='Engineering Capabilities of Diverter System'
                        description={[
                            'COC (Certificate of Conformance)',
                            'COS (Certificate of Service)',
                            'SOF (Statement of Fact)'
                        ]}
                        imageSrc={IMAGES.DiverterSystem3}
                    />
                    <DetailsBox
                        title='Diverter Locking'
                        description='Dog Assembly Diverter Locking'
                        imageSrc={IMAGES.DiverterSystem4}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.DiverterSystem5}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.DiverterSystem6}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.DiverterSystem7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.DiverterSystem8}
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

export default DiverterSystem;