import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom'

const EfccMaintenance: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                EFCC and Maintenance
                            </div>
                            <div className="pt-3 pb-4 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                                <h4 style={{ textAlign: "center" }}>
                                    <b>Offering a unique turn-key approach for Your Assets</b>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 g-lg-4 justify-content-center">
                        <div className="col-lg-4">
                            <div className="service-box aos-init" data-aos="fade-up">
                                <Link className="service-box-img" to="/details/engineering-fabrication-construction-commisioning-and-maintenance">
                                    <img className='img-fluid' src={IMAGES.engineeringFabricationConstructionCommisioningAndMaintenance} loading='lazy' alt="" />
                                    <div className="arrow-hover">
                                        ENGINEERING, FABRICATION, CONSTRUCTION, COMMISIONING AND MAINTENANCE
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EfccMaintenance