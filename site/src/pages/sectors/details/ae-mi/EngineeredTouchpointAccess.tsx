import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const EngineeredTouchpointAccess: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                ENGINEERED TOUCHPOINT ACCESS SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op9} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.ovolifts.com/'>Ovolifts'</Link> unique and patented technology allows access to multiple work areas whilst the equipment is on-stream, giving plant engineers and contractors critical information on pipe condition and access to perform maintenance.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Engineered Line Lifting Solution'
                        description={[
                            'Cups inspection and maintenance',
                            'Offshore',
                            'Slurry pipe rotation and Inserting shoes on new pipe installations',
                            'Inserting shoes on new pipe installations'
                        ]}
                        imageSrc={IMAGES.EngineeredTouchpointAccess1}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EngineeredTouchpointAccess2}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EngineeredTouchpointAccess3}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EngineeredTouchpointAccess4}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EngineeredTouchpointAccess5}
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

export default EngineeredTouchpointAccess;