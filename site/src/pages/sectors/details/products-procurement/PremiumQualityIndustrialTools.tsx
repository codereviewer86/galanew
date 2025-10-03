import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const PremiumQualityIndustrialTools: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                PREMIUM QUALITY INDUSTRIAL TOOLS
                            </h1>
                            <div className="py-3 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op5} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.egamaster.com/en'>EGA Master</Link>, a company of the EGA Group, is a European manufacturer of <Link to='https://www.egamaster.com/en/solutions'>premium industrial tools</Link> for the most demanding industrial users. It offers a complete one-stop solution based on continuous innovation that significantly improves safety and efficiency.
                                </p>
                            </div>
                            <div className='pb-5'>
                                <img className='img-fluid' src={IMAGES.PQITools1} loading='lazy' alt="" />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Tool control systems and storage'
                        description='This solution responds to the need to adopt a more efficient control and access to the tools increasing the safety of the operator and reducing economic expenses derived from losses or thefts.'
                        imageSrc={IMAGES.PQITools2}
                    />
                    <DetailsBox
                        title='Premium industrial hand tools'
                        description='EGA Master has the largest range of tools for industrial use. All elements of this solution are designed to respond in the most demanding conditions and have unlimited warranty.'
                        imageSrc={IMAGES.PQITools3}
                    />
                    <DetailsBox
                        title='Pipe tools and machines'
                        description={[
                            'EGA Master manufactures the widest range of pipe tools and machines, including tools to grab, tighten and cut pipes, as well as machines to thread and groove pipes.',
                            'The pipe tools include a lifetime warranty, and the machines a 1 year warranty that can be extended by the user for another year by registering the machine here.'
                        ]}
                        imageSrc={IMAGES.PQITools4}
                    />
                    <DetailsBox
                        title='Safety tools'
                        description={[
                            'EGA Master manufactures the widest range of tools to work safely in hazardous environments, be it due to the presence of dust or gas, due to the presence of electric tension or magnetic fields, or due to work being carried out at heights.',
                            'EGA Master’s tools are certified to give the user full assurance that they comply with all relevant norms and best practices in the industry.'
                        ]}
                        imageSrc={IMAGES.PQITools5}
                    />
                    <DetailsBox
                        title='Oil & gas'
                        description={[
                            'Working with hydrocarbons involve risks that could have high human, environmental and economic consequences.',
                            'EGA Master allows companies in the O&G industry to operate and maintain their assets without compromising the safety and efficiency of its workforce.'
                        ]}
                        imageSrc={IMAGES.PQITools6}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/WJ4IoG79HZmz0mmhTPddu6e9qFkHg5DSV4PVd6Xd.pdf'
                    />
                    <DetailsBox
                        title='Power'
                        description={[
                            'The operation and maintenance of power generation and distribution infrastructure involve risks created by high voltage and magnetic fields.',
                            'EGA Master offers tools that are reliable and trust worthy in order to ensure that the workforce is kept safe and efficient.'
                        ]}
                        imageSrc={IMAGES.PQITools7}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/a1sXaE8hQBvDorG3PNVFNW90ycYOeboP5haJp0EF.pdf'
                    />
                    <DetailsBox
                        title='Mining'
                        description={[
                            'Working in open or closed mines involve working with hazardous substances and gases that could have a direct impact on the safety of the workforce.',
                            'EGA Master allows mining companies to operate and maintain their assets without compromising the safety and efficiency of its workforce.'
                        ]}
                        imageSrc={IMAGES.PQITools8}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/3r2CdOCIRaSKSKU3dOrLSv543JlUC7cWNHjoXHgd.pdf'
                    />
                    <DetailsBox
                        title='Infrastructure & Engineering'
                        description={[
                            'Projects in the infrastructure and engineering sectors require solutions that guarantee the efficiency of their activities, without compromising the safety of the workforce.',
                            'EGA Master offers a one stop solution of industrial and safety tools that through continuous innovation enhance the safety and efficiency of industrial companies.',
                            'EGA Master also offers tool control solutions that meet the demanding requirements of companies in these sectors.'
                        ]}
                        imageSrc={IMAGES.PQITools9}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/jQP7dQq40eqvzsEok7R29ZSlCtp6bk5sV3iUfyIj.pdf'
                    />
                    <DetailsBox
                        title='Chemical industry'
                        description='Extracting and processing raw materials in order to transform them into intermediate goods or products requires working in high-risk environments where the safety and efficiency of workers depend greatly on the tools used.'
                        imageSrc={IMAGES.PQITools10}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/MHF7aOIq2PIAqtaZbybr0RJjOqTTZdg3tOjXYYK6.pdf'
                    />
                    <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.PQITools11}
                            loading='lazy'
                            style={{ width: '100%' }}
                            alt=""
                        />
                    </div>
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.PQITools12}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.PQITools13}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.PQITools14}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.PQITools15}
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

export default PremiumQualityIndustrialTools;