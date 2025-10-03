import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const EngineeredLeakSealing: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                ENGINEERED LEAK SEALING SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op7} />
                                <p className="MsoNoSpacing">
                                    <b>
                                        Kinetics Controls & Innovation Ltd (KCI) is a global provider of bespoke engineered leak sealing solutions for mature or aging oil & gas facilities.
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='WELLHEAD SEAL ISOLATIONS'
                        description={[
                            "We uses Mac-Seal and MS-Sealant to reduce production deferments.",
                            "Both are two-part, time-activated products but MS-Sealant is specially designed for hotter climates."
                        ]}
                        imageSrc={IMAGES.ELSS1}
                    />
                    <DetailsBox
                        title='GATE VALVE ISOLATIONS'
                        description='We use one part product Mac-Pac to fix damaged Seats , Gates and leaking stem seals to prevent loss of barriers and subsequently intervention downtime.'
                        imageSrc={IMAGES.ELSS2}
                    />
                    <DetailsBox
                        title='CONTROL LINE PLUGGING'
                        description='We use Mac-Seal and MS-Sealant for Control Line Plugging in order to reduce rig time and increase safety when pulling completions.'
                        imageSrc={IMAGES.ELSS3}
                    />
                    <DetailsBox
                        title='CONTROL LINE LEAK REPAIR'
                        description='We use IG-FP, a one-part, pre-cured sealant, that is pumped into the control line surface to isolate control line leaks and reinstateproduction.'
                        imageSrc={IMAGES.ELSS4}
                    />
                    <DetailsBox
                        title='PACKER AND CASING SHOE ISOLATIONS'
                        description='We use IG and IG-H for packer isolations. IG-H is specially engineered to isolate leaks in deep-se Production Packers where the integrity has been lost & Well pressure or fluids are building. Avoids costly workovers.'
                        imageSrc={IMAGES.ELSS5}
                    />
                    <DetailsBox
                        title='PIPELINE & PROCESS VALVE ISOLATIONS'
                        description='We use IG-L, a time-activated Gel which is developed as a fluid and converts to a solid material to re-establish pressure-retaining bariers. Helps to minimize downtime and reinstate valuable production safely and efficiently.'
                        imageSrc={IMAGES.ELSS6}
                    />
                    <DetailsBox
                        title='ANTI CORROSION'
                        description='We uses IG-FP, one-part, pre-cured sealant, that is pumped into the control line surface to isolate control line leaks and reinstateproduction.'
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/407Aw71txZJLT57NeKYUFpjmBBIfaZPLSVYSESfI.pdf'
                        imageSrc={IMAGES.ELSS7}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.ELSS8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.ELSS9}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.ELSS10}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.ELSS11}
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

export default EngineeredLeakSealing;