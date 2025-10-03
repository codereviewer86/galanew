import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const EnvironmentalMonitoring: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">Environmental monitoring</h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op11} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.codel.co.uk/'>CODEL International Ltd</Link> is a UK-company based in Bakewell and as of 2014 we joined the <Link to='https://www.forbesmarshall.com/'>Forbes Marshall Group.</Link> We design and manufacture cutting edge emission monitoring instrumentation primarily for monitoring the emissions to atmosphere, road tunnel environments and plant and rail safety.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Environmental Monitoring'
                        description={[
                            'On-line transmission of data to state regulatory authorities',
                            'Determination of actual atmospheric air pollution in residental areas',
                            'Determination of actual industrial emissions into the atmosphere',
                            'Development of requirements for (CEMS) automated On-line Emission Monitoring Systems'
                        ]}
                        imageSrc={IMAGES.EnvironmentalMonitoring1}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EnvironmentalMonitoring2}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EnvironmentalMonitoring3}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EnvironmentalMonitoring4}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.EnvironmentalMonitoring5}
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

export default EnvironmentalMonitoring;