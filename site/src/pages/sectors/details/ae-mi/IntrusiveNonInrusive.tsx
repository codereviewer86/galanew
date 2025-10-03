import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const IntrusiveNonInrusive: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                INTRUSIVE & NON-INRUSIVE SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op1} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.atmosi.com/en/'>Atmos International</Link> was originally founded in 1995 with a primary focus to detect pipeline leaks reliably on operational pipelines. This technology has been successfully applied to over 1,500 pipelines across more than 60 countries.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Corrosion Monitoring'
                        description={[
                            'Corrosion monitoring is the practice of measuring the corrosivity of process stream conditions by the use of "probes" which are inserted into the process stream and which are continuously exposed to the process stream condition.',
                            'Corrosion monitoring "probes" can be mechanical, electrical, or electrochemical devices.'
                        ]}
                        imageSrc={IMAGES.INI1}
                    />
                    <DetailsBox
                        title='Sand Monitoring'
                        description='Sand monitoring systems can effectively monitor the sand particles in the pipe and monitor the pipeline erosion indirectly, which provides an important theoretical basis for the improvement of the production process.'
                        imageSrc={IMAGES.INI2}
                    />
                    <DetailsBox
                        title='Sand Management'
                        description={[
                            `Sand management is about removing the solids from your hydrocarbon stream during all phases of a well's producing life.`,
                            `We offer a range of industry-leading desanding technologies and sand management services to ensure no sand gets into your production facility or further downstream.`
                        ]}
                        imageSrc={IMAGES.INI3}
                    />
                    <DetailsBox
                        title='Real-Time UT Thickness Monitoring'
                        description={[
                            '3D UT Thickness Profiling.',
                            'Manual UT wall thickness measurements is a technique using high-frequency sound energy to conduct examinations and obtain thickness measurements.',
                            'In an ultrasonic thickness measurements (UTM) inspection, a straight beam is introduced into the test object perpendicular to the surface and round-trip time is measured.'
                        ]}
                        imageSrc={IMAGES.INI4}
                    />
                    <DetailsBox
                        title='SMART Data Visualization'
                        description={[
                            'Hydrate Inhibitor Monitoring.',
                            'Leak Theft Detection.',
                            'Simulation Technologies.'
                        ]}
                        imageSrc={IMAGES.INI5}
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.INI6}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.INI7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.INI8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.INI9}
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

export default IntrusiveNonInrusive;