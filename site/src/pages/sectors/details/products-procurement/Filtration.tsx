import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const Filtration: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                FILTRATION
                            </h1>
                            <div className="py-3 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op17} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.cleanova.com/'>Cleanova filtration</Link> ( <Link to='https://www.celerosft.com/en-us/brands/dollinger'>Dollinger</Link>, <Link to='https://www.celerosft.com/en-us/brands/plenty/plenty-filtration'>Plenty</Link>, <Link to='https://pipelineengineeringsupply.com/en-us/brands/vokes'>Vokes</Link> and <Link to='https://www.celerosft.com/en-us/brands/airpel'>Airpel</Link> ) has been designing, manufacturing and supplying filtration solutions for over 100 years, with performance and quality always in the front of our minds. Using our experience and technical know-how, we can offer predictable filtration results, providing the best solution for our customers.
                                </p>
                            </div>
                            <div className='pb-5'>
                                <img className='img-fluid' src={IMAGES.Filtration1} loading='lazy' alt="" />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='UNIQ-MAX High Capacity Filter Cartridge'
                        description={[
                            'High volume contaminant removal to β5000 efficiency',
                            'Excellent particulate retention across a range of sizes',
                            'Minimal impact on process parameters',
                            'Quick and easy filter cartridge removal/replacement',
                            'Extended service life'
                        ]}
                        imageSrc={IMAGES.Filtration2}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/PYXmarufRnGfYBJjnsqh05AyFQuxIlxOcgYThXuh.pdf'
                    />
                    <DetailsBox
                        title='Dollinger Coalescing Filter - GP-198'
                        description={[
                            'Water / oil mist removed from compressed air lines',
                            'Oil recovery downstream of rotating machinery',
                            'Pre-filter / separator to absorptive air / gas dehydration systems',
                            'Removal of final traces of free liquids from natural gas for the protection of instrumentation, valves, piping, etc.'
                        ]}
                        imageSrc={IMAGES.Filtration3}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/JQmIrO08EEozygrBwKw7UbiulOY50IWVE6gfJlt6.pdf'
                    />
                    <DetailsBox
                        title='Filtration Tests for Gas Processing'
                        description={[
                            'Improved operational efficiency',
                            'Reduced use of Anti-Foaming additive',
                            'Enhanced product quality',
                            'Extended element lifetime',
                            'Longer maintenance intervals',
                            'Reduced shutdowns',
                            'Lower TCO'
                        ]}
                        imageSrc={IMAGES.Filtration4}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/JQmIrO08EEozygrBwKw7UbiulOY50IWVE6gfJlt6.pdf'
                    />
                    <DetailsBox
                        title='UNIQ-FLOW Liquid/Liquid Coalescers'
                        description={[
                            'Condensate Cooling',
                            'MEG Removal',
                            'Water from Diesel',
                            'Oil from Water',
                            'Amine Gas Sweetening',
                            'Water from Condensates',
                            'Water from Kerosine',
                            'Recovery of Hydrocarbons from Water',
                            'Glycol Applications'
                        ]}
                        imageSrc={IMAGES.Filtration5}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/ioV3sxjAVK1shaMh5XSiTthL9AzkTFKooWPv2Ox3.pdf'
                    />
                    <DetailsBox
                        title='Oil Mist Eliminators'
                        description={[
                            'Lube Oil Reservoir',
                            'Lube Oil Filters',
                            'Lube Oil Pumps',
                            'Lines from the Reservoir to the Bearings',
                            'Lines returning from the Bearing to the Reservoir'
                        ]}
                        imageSrc={IMAGES.Filtration6}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/jN7MBXn0OdIqsehUvClCF5rSTQIizND72JKm7u1r.pdf'
                    />
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.Filtration7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.Filtration8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.Filtration9}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.Filtration10}
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

export default Filtration;