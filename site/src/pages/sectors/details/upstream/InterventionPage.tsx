import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const Intervention: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">Intervention</h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op6} />
                                <p className="MsoNoSpacing">
                                    <b>
                                        For more than 25 years we’ve led the field in safe, reliable, surface-controlled downhole interventions.
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='DOWNHOLE HARDWARE'
                        description='Installation, manipulation and remediation of downhole hardware'
                        imageSrc={IMAGES.interventionS1}
                    />
                    <DetailsBox
                        title='PLUG AND ABANDONMENT'
                        description='Safer, faster, more efficient methods of leaving a well for posterity'
                        imageSrc={IMAGES.interventionS2}
                    />
                    <DetailsBox
                        title='WATER SHUT-OFF'
                        description='Unwanted water is best shut off downhole'
                        imageSrc={IMAGES.interventionS3}
                    />
                    <DetailsBox
                        title='SUBSEA'
                        description='Innovative technology enabling a full suite of downhole applications to boost subsea recovery'
                        imageSrc={IMAGES.interventionS4}
                    />
                    <DetailsBox
                        title='HOSTILE ENVIRONMENT'
                        description='Challenges include high temperature, high pressure and corrosive compounds'
                        imageSrc={IMAGES.interventionS5}
                    />
                    <DetailsBox
                        title='UNCONVENTIONAL WELLS'
                        description='Unconventional wells can unique challenges for operators'
                        imageSrc={IMAGES.interventionS6}
                    />
                    <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.interventionS7}
                            loading='lazy'
                            style={{ width: '100%' }}
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Intervention;