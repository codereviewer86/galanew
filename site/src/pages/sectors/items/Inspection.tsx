import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom'

const Inspection: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                Inspection
                            </div>
                            <div className="pt-3 pb-4 text-center item-desc aos-init" data-aos="fade-up">
                                <h4 className="" style={{ textAlign: "center", marginTop: "0cm" }}>
                                    <span>
                                        <b>Verify the Integrity of Your Assets Using our Inspection Solutions</b>
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 g-lg-4 justify-content-center">
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/non-invasive-inspection">
                                    <img className='img-fluid' src={IMAGES.nonInvasiveInspection} loading='lazy' alt="" />
                                    <div className="arrow-hover">NON-INVASIVE INSPECTION</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/advanced-ndt-inspection">
                                    <img className='img-fluid' src={IMAGES.advancedNdtInspection} loading='lazy' alt="" />
                                    <div className="arrow-hover">ADVANCED NDT INSPECTION</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/specialized-inspection">
                                    <img className='img-fluid' src={IMAGES.specializedInspection} loading='lazy' alt="" />
                                    <div className="arrow-hover">SPECIALIZED INSPECTION</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/advanced-tube-inspection">
                                    <img className='img-fluid' src={IMAGES.advancedTubeInspection} loading='lazy' alt="" />
                                    <div className="arrow-hover">ADVANCED TUBE INSPECTION</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/conventional-inspection">
                                    <img className='img-fluid' src={IMAGES.conventionalInspection} loading='lazy' alt="" />
                                    <div className="arrow-hover">CONVENTIONAL INSPECTION</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Inspection