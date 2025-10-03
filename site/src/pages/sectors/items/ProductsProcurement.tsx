import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom';

const ProductsProcurement: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                Products & Procurement
                            </div>
                            <div className="pt-3 pb-2 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                                <h1 style={{ color: "rgb(34, 34, 34)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "small" }}></h1>
                                <h4 style={{ textAlign: "center", fontSize: '1.25rem' }}>
                                    <b>“TURKMEN GALA” HJ is a company with a verifiable history of successful projects and a solid history of demonstrated financial stability. With over a decade in business, our successful and financially secure project history proves we have the integrity, experience and resources to succeed.</b>
                                </h4>
                            </div>
                            <div className='pb-5'>
                                <img className='img-fluid' src={IMAGES.PPS1} loading='lazy' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 g-lg-4 justify-content-center">
                        <div className="col-lg-4">
                            <div className="service-box aos-init aos-animate" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/filtration">
                                    <img className="img-fluid" src={IMAGES.Filtration} loading='lazy' alt="" />
                                    <div className="arrow-hover">FILTRATION</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init aos-animate" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/sealing-solutions">
                                    <img className="img-fluid" src={IMAGES.SealingSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">SEALING SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init aos-animate" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/stack-emissions-monitors">
                                    <img className="img-fluid" src={IMAGES.StackEmissionsMonitors} loading='lazy' alt="" />
                                    <div className="arrow-hover">STACK EMISSIONS MONITORS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/premium-quality-industrial-tools">
                                    <img className="img-fluid" src={IMAGES.PremiumQualityIndustrialTools} loading='lazy' alt="" />
                                    <div className="arrow-hover">PREMIUM QUALITY INDUSTRIAL TOOLS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/hydraulic-pneumatic-tools">
                                    <img className="img-fluid" src={IMAGES.HydraulicPneumaticTools} loading='lazy' alt="" />
                                    <div className="arrow-hover">HYDRAULIC & PNEUMATIC TOOLS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/flow-control-solutions">
                                    <img className="img-fluid" src={IMAGES.FlowControlSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">FLOW CONTROL SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/blast-spray-and-ndt-equipments">
                                    <img className="img-fluid" src={IMAGES.BlastSprayNdtEquipments} loading='lazy' alt="" />
                                    <div className="arrow-hover">BLAST, SPRAY AND NDT EQUIPMENTS</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductsProcurement;