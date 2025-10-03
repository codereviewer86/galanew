import React from 'react'
import { IMAGES } from '../../../utils/staticJSON'
import { Link } from 'react-router-dom'

const AutomationMeasuring: React.FC = () => {
    return (
        <section className="service py-5 mb-lg-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-11 m-auto">
                        <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                            Automation and Measuring
                        </div>
                        <div className="pt-3 pb-4 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                            <h4 className="" style={{ textAlign: "center" }}>
                                <b>Comprehensive, Cost Effective Solutions that increase Asset Efficiency and Reliability</b>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="row g-4 g-lg-4 justify-content-center">
                    <div className="col-lg-4">
                        <div className="service-box aos-init" data-aos="fade-up">
                            <Link className="service-box-img" to="/details/environmental-monitoring">
                                <img className='img-fluid' src={IMAGES.environmentalMonitoring} loading='lazy' alt="" />
                                <div className="arrow-hover">Environmental monitoring</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-box aos-init" data-aos="fade-up">
                            <Link className="service-box-img" to="/details/process-automation">
                                <img className='img-fluid' src={IMAGES.processAutomation} loading='lazy' alt="" />
                                <div className="arrow-hover">PROCESS AUTOMATION</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-box aos-init" data-aos="fade-up">
                            <Link className="service-box-img" to="/details/gas-compressor-units-filtration-systems">
                                <img className='img-fluid' src={IMAGES.gasCompressorUnitsFiltrationSystems} loading='lazy' alt="" />
                                <div className="arrow-hover">GAS COMPRESSOR UNITS, FILTRATION SYSTEMS</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-box aos-init" data-aos="fade-up">
                            <Link className="service-box-img" to="/details/industrial-gas-chromatography">
                                <img className='img-fluid' src={IMAGES.industrialGasChromatography} loading='lazy' alt="" />
                                <div className="arrow-hover">INDUSTRIAL GAS CHROMATOGRAPHY</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-box aos-init" data-aos="fade-up">
                            <Link className="service-box-img" to="/details/flow-volume-measurement-services">
                                <img className='img-fluid' src={IMAGES.flowVolumeMeasurementServices} loading='lazy' alt="" />
                                <div className="arrow-hover">FLOW &amp; VOLUME MEASUREMENT SERVICES</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AutomationMeasuring