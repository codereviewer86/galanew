import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';
import { Link } from 'react-router-dom';

const FlowControlSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                FLOW CONTROL SOLUTIONS
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={IMAGES.op8} />
                                <p className="MsoNoSpacing">
                                    <Link to='https://www.imi-critical.com/'>IMI</Link> began life in the UK city of Birmingham in 1862 as a percussion cap manufacturer. By 1961, a new company, IMI CCI, was formed that focused on the development and manufacturing of a new type of control valve. By 1981 IMI CCI had joined IMI and, through successful acquisitions, built its <Link to='https://www.imi-critical.com/'>IMI Critical Engineering</Link> division into a major, worldwide valve manufacturing business.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='100DPC Multi-trim DRAG® Production Choke Valve'
                        description={[
                            'Multi-phase fluid which can make accurate sizing difficult',
                            'High pressure drop which leads to high kinetic energy levels, which causes erosion, vibration and noise.',
                            'Potential for high solid content which leads to further erosion issues and potentially clogging',
                            'High concentrations of acids (H2S, CO2), chlorides and chemicals which can cause corrosion issues',
                            'Long field life with large variation of inlet pressures which subsequently require a wide range of CV’s to maintain flow rates',
                            'The 100DPC production choke valve, addresses the application-specific concerns above by incorporating the following aspects into the product design:'
                        ]}
                        imageSrc={IMAGES.FCSolutions1}
                    />
                    <DetailsBox
                        title='860 Series: Angle Valve'
                        description={[
                            '1” through 20”',
                            'ANSI class 150-2500 (DIN and JIS available)',
                            'Raised face flange, weld ends (BW and SW)',
                            'Linear on equal percentage to suit application',
                            'Standard ANSI class IV, option-ANSI class V or VI',
                            '1/2”~4”: -30ºC ~ 300ºC (Standard), -196ºC ~ 565ºC (Ext. bonnet)',
                            '6”~20”: -30ºC ~ 300ºC (Standard), -196ºC ~ 565ºC (Ext. bonnet)'
                        ]}
                        imageSrc={IMAGES.FCSolutions2}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/FuHGo7XsPyeu4zubqgPhwPUfe3eBdUs7iodlj7hv.pdf'
                    />
                    <DetailsBox
                        title='900D DRAG® Control Valve'
                        description={[
                            'Valve sizes 1″ through 16″',
                            'Pressure rating (ANSI class) 150, 300, 600, 900, 1500, 2500',
                            'End connections Raised Face Flange RTJ Flange, Butt Weld End',
                            'Fail mode Open, Close, In-Place',
                            'Flow direction Flow-To-Close (Liquids) Flow-To-Open (Gas)',
                            'Temperature -50°F to 975°F (-46°C to 525°C)',
                            'Stroke time < 30 sec (standard)/ < 1 sec to open, < 5 sec to close (fast stroke)'
                        ]}
                        imageSrc={IMAGES.FCSolutions3}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/jWrKEzfXL3Hf0bNa7pp9RGWd6ncgeTtZBi4zZKg0.pdf'
                    />
                    <DetailsBox
                        title='High Integrity Pressure Protection System (HIPPS)'
                        description={[
                            'Initiators / process sensors- Initiators are either electronic or electromechanical pressure switches or transmitters which measure the process variables (PV) to sense an event.',
                            'The programmable electronic system receives the signals from the initiators, performs the required logics (voting, diagnostics, and partial stroke test routine) and engages the final elements.'
                        ]}
                        imageSrc={IMAGES.FCSolutions4}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/XoXOPkvqDsUYI37INmlV2bcsL15tD7WN8iZrKtio.pdf'
                    />
                    <DetailsBox
                        title='Anti-surge and compressor recycle valves'
                        description={[
                            'Enhancing your compression system through integrated components',
                            'Tailored to your system',
                            'The complete anti-surge valves and compressor solution comprises',
                            'Our multi-stage, multi-path DRAG® design directs fluid through a highly resistant tortuous path to incrementally reduce the differential pressure. This limits the velocity head at the trim, which eliminates the risk of vibration, noise, and erosion.',
                            'Featuring the latest pneumatic digital valve control technology',
                            'Special piston design, this actuator grants smooth and precise valve operation'
                        ]}
                        imageSrc={IMAGES.FCSolutions5}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/4SywUIRVy21ZWjOcHerUe1U45uLjxsf97wPY6lwH.pdf'
                    />
                    <DetailsBox
                        title='Hull Valves'
                        description={[
                            'Low risk and fully validated for submarine use.',
                            'Shock proof to 400g.',
                            'Fire tested.',
                            'Body machined from forged billet.',
                            'Full certification.',
                            'Full traceability.',
                            'Options- Hydraulic or pneumatic actuation- Titanium trim- Full / Reduced bore.'
                        ]}
                        imageSrc={IMAGES.FCSolutions6}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/pVfGNPGMhwSvWb8BCQNnJnf5LavGfTonIVMSICNq.pdf'
                    />
                    <DetailsBox
                        title='Retrofit Solutions'
                        description={[
                            'We conduct a root cause focused engineering evaluation of the current system and operating conditions affecting the valve that is negatively impacting your operation.',
                            'With your approval to proceed, we then gather trim-related details as needed to execute the order.',
                            'Trim is manufactured to ultra-tight tolerances using state-of-the-art additive manufacturing and traditional manufacturing methods.',
                            'The trim, completely engineered to your operating environment, is delivered to you within four weeks.',
                            'With our field service expert’s support, installation takes just hours, not days, and can be easily performed during a scheduled two-day maintenance window.'
                        ]}
                        imageSrc={IMAGES.FCSolutions7}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/FbAYvBWCoiJHEVFFsqby1Lv5VsbiT5jTXFeP5VTF.pdf'
                    />
                    <DetailsBox
                        title='Prevent condensate or wet steam erosion'
                        description={[
                            'Severe trim erosion',
                            'Frequency of repair or maintenance',
                            'Downtime due to unplanned shutdowns',
                            'Noise and vibration',
                            'Cracking of spray nozzle, pressure reducing stages and downstream pipe',
                            'Water hammer',
                            'Energy and profit loss'
                        ]}
                        imageSrc={IMAGES.FCSolutions8}
                        pdfUrl='https://turkmengala.com/admin/storage/item_feature/pdf/qfU7Weo2UjoFTwIfjlSKyWDKeAe03Kqhf02SU3zF.pdf'
                    />
                    <div className="row pt-4">
                        <div className="col-12">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.FCSolutions9}
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

export default FlowControlSolutions;