import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const HydraulicPneumaticTools: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                HYDRAULIC & PNEUMATIC TOOLS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op10} />
                                <p className="MsoNoSpacing">
                                    The history of <Link to='https://www.enerpac.com/en-us/home'>Enerpac</Link> dates back to 1910, when our original company produced water pumps for the Ford’s legendary ‘Model T’ motor car. Our reputation as a technology leader began in the 1920’s when the first hydraulic jacks were introduced. In the late 1950’s, an Industrial Products Division was formed and along with it, the brand name Enerpac.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Hydraulic Pumps and Power Units'
                        description={[
                            'Manual Hydraulic Pumps',
                            'Cordless Battery Pumps',
                            'Electric Pumps',
                            'Air Pumps',
                            'Gas Pumps',
                            'Controlled Lifting Pumps'
                        ]}
                        imageSrc={IMAGES.HPTools1}
                    />
                    <DetailsBox
                        title='Cylinders and Jacks'
                        description={[
                            'General Purpose Cylinders',
                            'Hollow Plunger Cylinders',
                            'High Tonnage Cylinders',
                            'Lock Nut Cylinders',
                            'Low-Height Cylinders',
                            'Lightweight Cylinders',
                            'Pull Cylinders',
                            'Cylinder Tonnages'
                        ]}
                        imageSrc={IMAGES.HPTools2}
                    />
                    <DetailsBox
                        title='Heavy Lifting Technology'
                        description={[
                            'Gantries',
                            'Strand Jacks',
                            'Jack-Up Systems',
                            'Trolley Systems',
                            'Synchronous Hoist Systems',
                            'Skidding Systems'
                        ]}
                        imageSrc={IMAGES.HPTools3}
                    />
                    <DetailsBox
                        title='Torque and Tension Tools'
                        description={[
                            'Hydraulic Torque Wrenches',
                            'Safe T Torque Tools',
                            'Torque Wrench Pumps',
                            'Pneumatic Torque Wrenches',
                            'Torque Multipliers',
                            'Tensioners',
                            'Tensioner Pumps'
                        ]}
                        imageSrc={IMAGES.HPTools4}
                    />
                    <DetailsBox
                        title='Hydraulic Presses'
                        description={[
                            'Hydraulic Presses',
                            'Press Accessories',
                            'Tension Meter and Load Cells'
                        ]}
                        imageSrc={IMAGES.HPTools5}
                    />
                    <DetailsBox
                        title='Hydraulic and Mechanical Pullers'
                        description={[
                            'Hydraulic and Mechanical Pullers',
                            'Puller Accessories',
                            'Storage Cases'
                        ]}
                        imageSrc={IMAGES.HPTools6}
                    />
                    <DetailsBox
                        title='Industrial Cutters'
                        description={[
                            'Bar Cutters',
                            'Chain Cutters',
                            'Cutter Spreader Combination Tools',
                            'Cutterheads',
                            'Decommissioning Cutters',
                            'Flat Bar Cutters',
                            'Nut Splitters and Cutters',
                            'Self-Contained Cutters',
                            'Wire and Cable Cutters',
                            'Cutter Pumps'
                        ]}
                        imageSrc={IMAGES.HPTools7}
                    />
                    <DetailsBox
                        title='Equalizer Flange Maintenance Tools'
                        description={[
                            'Flange Spreaders',
                            'Flange Alignment Tools',
                            'Nut Splitters and Cutters',
                            'Flange Puller Sets',
                            'Valve Change-Out Tool Sets'
                        ]}
                        imageSrc={IMAGES.HPTools8}
                    />
                    <DetailsBox
                        title='Mirage Portable Machine Tools'
                        description={[
                            'Flange Facing Machines',
                            'Clamshell Cutters and Accessories',
                            'Machining Power Packs',
                            'Portable Milling Machines',
                            'GeniSYS IV portable CNC mill',
                            'Casing Pin Drilling Machines',
                            'Orbital Milling Machines',
                            'Hot Tapping Machines and Line Stopping',
                            'Piping Isolation and Test Tools',
                            'Diamond Wire Saws'
                        ]}
                        imageSrc={IMAGES.HPTools9}
                    />
                    <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.HPTools10}
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

export default HydraulicPneumaticTools;