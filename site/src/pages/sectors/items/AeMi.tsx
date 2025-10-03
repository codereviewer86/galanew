import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom'

const AeMi: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                AE &amp; MI
                            </div>
                            <div className="pt-3 pb-4 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                                <h4 className="" style={{ textAlign: "center" }}>
                                    <b>Optimizing Through Real Time Technology</b>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 g-lg-4 justify-content-center">
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/intrusive-non-inrusive-solutions">
                                    <img className='img-fluid' src={IMAGES.intrusiveNonInrusiveSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">INTRUSIVE &amp; NON-INRUSIVE SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/heat-solutions">
                                    <img className='img-fluid' src={IMAGES.heatSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">HEAT SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/leak-sealing-solutions">
                                    <img className='img-fluid' src={IMAGES.leakSealingSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">LEAK SEALING SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/seal-bonded-solutions">
                                    <img className='img-fluid' src={IMAGES.sealBondedSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">SEAL BONDED SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/engineered-touchpoint-access-solutions">
                                    <img className='img-fluid' src={IMAGES.engineeredTouchpointAccessSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">ENGINEERED TOUCHPOINT ACCESS SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/predictive-maintenance-solutions">
                                    <img className='img-fluid' src={IMAGES.predictiveMaintenanceSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">PREDICTIVE MAINTENANCE SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AeMi