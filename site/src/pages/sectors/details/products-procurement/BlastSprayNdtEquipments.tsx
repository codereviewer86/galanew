import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const BlastSprayNdtEquipments: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                BLAST, SPRAY AND NDT EQUIPMENTS
                            </h1>
                            <div className="py-3 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'contain' }} loading='lazy' src={IMAGES.op21} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.elcometer.com/en/blast-equipment.htmlen/'>Elcometer</Link> gauge was manufactured in 1947, our philosophy has been to provide industry leading, innovative, high quality products; supported by a best-in-class customer experience at a competitive price. By concentrating on these core values, Elcometer has grown into a global network with representation in over 70 countries.
                                </p>
                            </div>
                            <div className='pb-5'>
                                <img className='img-fluid' src={IMAGES.BlastEquipment1} loading='lazy' alt="" />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Blast Equipment'
                        description={[
                            'Abrasive Blast Machines',
                            'Abrasive Media Valves',
                            'Remote Control Valves',
                            'Blast Nozzles',
                            'Blast Hose, Nozzle Holders And Couplings',
                            'Air Handling And Moisture Separation',
                            'Operator Safety Equipment',
                            'Blast Inspection And Test Equipment'
                        ]}
                        imageSrc={IMAGES.BlastEquipment2}
                    />
                    <DetailsBox
                        title='Spray Equipment'
                        description={[
                            'Refinishing & Bodyshop Spray Equipment',
                            'Industrial Finishing Spray Equipment',
                            'Protective Coatings Spray Equipment',
                            'Spray Equipment by Technology',
                            'Spray Equipment by Product'
                        ]}
                        imageSrc={IMAGES.BlastEquipment3}
                    />
                    <DetailsBox
                        title='NDT Equipment'
                        description={[
                            'ElcoMaster® Software',
                            'Material Thickness',
                            'Corrosion Thickness',
                            'Precision Thickness',
                            'Flaw Detection',
                            'Bolt Tension Monitors',
                            'Calibration Standards',
                            'Couplant & Accessories'
                        ]}
                        imageSrc={IMAGES.BlastEquipment4}
                    />
                    <DetailsBox
                        title='Coatings Inspection Division'
                        description={[
                            'Coatings Inspection Division',
                            'Protective Coatings Inspection',
                            'Industrial Finishing Inspection',
                            'Automotive Refinishing',
                            'Physical Test Equipment'
                        ]}
                        imageSrc={IMAGES.BlastEquipment5}
                    />
                    <DetailsBox
                        title='Concrete Inspection'
                        description={[
                            'Concrete Test Hammers',
                            'Covermeter & Half-Cell Meters',
                            'CoverMaster Software',
                            'Metal Detection',
                            'Crack Width Ruler'
                        ]}
                        imageSrc={IMAGES.BlastEquipment6}
                    />
                    <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.BlastEquipment7}
                            loading='lazy'
                            style={{ width: '100%' }}
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlastSprayNdtEquipments;