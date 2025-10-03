import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom'

const TopsideUnderwater: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                Topside Underwater
                            </div>
                            <div className="pt-3 pb-4 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                                <h4 className="" style={{ textAlign: "center" }}>
                                    <b>Empowering Better Consistency and Effectiveness with Intrgrated Inspection, Installation, Maintenance and Repair Solutions</b>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 g-lg-4 justify-content-center">
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/topside-inspection-and-survey">
                                    <img className='img-fluid' src={IMAGES.topsideInspectionAndSurvey} loading='lazy' alt="" />
                                    <div className="arrow-hover">TOPSIDE INSPECTION AND SURVEY</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/topside-installation-maintenance-and-repairs">
                                    <img className='img-fluid' src={IMAGES.topsideInstallationMaintenanceAndRepairs} loading='lazy' alt="" />
                                    <div className="arrow-hover">TOPSIDE INSTALLATION, MAINTENANCE AND REPAIRS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/underwater-products-solutions">
                                    <img className='img-fluid' src={IMAGES.underwaterProductsSolutions} loading='lazy' alt="" />
                                    <div className="arrow-hover">UNDERWATER PRODUCTS SOLUTIONS</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/modu-mopu-services-platform-maintenance">
                                    <img className='img-fluid' src={IMAGES.moduMopuServicesPlatformMaintenance} loading='lazy' alt="" />
                                    <div className="arrow-hover">MODU MOPU SERVICES PLATFORM MAINTENANCE</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/general-diving-tanker-vessels-inshore-services">
                                    <img className='img-fluid' src={IMAGES.generalDivingTankerVesselsInshoreServices} loading='lazy' alt="" />
                                    <div className="arrow-hover">GENERAL DIVING, TANKER VESSELS INSHORE SERVICES</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopsideUnderwater