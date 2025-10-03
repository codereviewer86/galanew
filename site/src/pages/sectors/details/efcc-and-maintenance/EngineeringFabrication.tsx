import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const EngineeringFabrication: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                ENGINEERING, FABRICATION, CONSTRUCTION, COMMISIONING AND MAINTENANCE
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Plant Maintenance, Turnaround & Shutdown'
                        description={[
                            'Development of work lists for necessary inspections',
                            'Product standardization programs to increase efficiency',
                            'Critical path schedule development',
                            'Workforce training on procedures and maintenance best practices',
                            'Assistance with manpower and inventory planning, scheduling, resourcing, and training',
                            'Emergency planning and Post- performance review'
                        ]}
                        imageSrc={IMAGES.EFCCM1}
                    />
                    <DetailsBox
                        title='Structural Fabrication & Erection'
                        description={[
                            'Plate fabrication',
                            'Seismic & Industrial Upgrades',
                            'Industrial Installation & Repairs',
                            'Retrofit & Tenant Improvement',
                            'Miscellaneous Metal Fabrication & Installation',
                            'Structual Detailing & BIM Modeling'
                        ]}
                        imageSrc={IMAGES.EFCCM2}
                    />
                    <DetailsBox
                        title='Mechanical Static Equipment'
                        description={[
                            'Development of maintenance philosophies and strategies',
                            'Optimization and continuous improvement of work processes',
                            'Spare parts evaluation and optimization',
                            'Reliability, availability, maintainability and risk evaluations',
                            'Safety critical equipment assessment and follow-up',
                            'Risk-based inspection program and follow-up'
                        ]}
                        imageSrc={IMAGES.EFCCM3}
                    />
                    <DetailsBox
                        title='Rotating Equipment & Valve'
                        description={[
                            'Gas & Steam Turbines',
                            'Turbines & Compressor',
                            'Gearboxes & Diesel Engines',
                            'Reciprocating Engines',
                            'Control and Instrumentation',
                            'Ancillaries and Accessories'
                        ]}
                        imageSrc={IMAGES.EFCCM4}
                    />
                    <DetailsBox
                        title='Process Piping Fabrication'
                        description={[
                            'Submerged arc welding',
                            'TIG-tungsten inert gas welding',
                            'GMAW - gas metals arc welding',
                            'Pipe grooving',
                            'Pipe threading',
                            'Hydraulic hose fabrication',
                            'Skid fabrication',
                            'Custom fab pipe supports',
                            'Jacketed wall piping',
                            'Custom fittings'
                        ]}
                        imageSrc={IMAGES.EFCCM5}
                    />
                    <DetailsBox
                        title='Engineering, Procurement, Construction, Commissioning'
                        description={[
                            'Mechanical Static Equipment',
                            'Plant Turnaround services',
                            'Process Piping Fabrication',
                            'Rotating Equipment & Valves Services',
                            'Structural Fabrication & Erection'
                        ]}
                        imageSrc={IMAGES.EFCCM6}
                    />
                </div>
            </section>
        </>
    )
}

export default EngineeringFabrication;