import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const ProcessAutomation: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">PROCESS AUTOMATION</h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Process Automation'
                        description={[
                            'Implementation of Process Automation System',
                            'Distributed Control System Emergency Shut Down System',
                            'Automation of maintenance, appliance and automation repairs',
                            'Installation of metering control devices',
                            'State Revenue Committee Integration',
                            'Developing a digital field',
                            'Commercial oil and gas metering units'
                        ]}
                        imageSrc={IMAGES.ProcessAutomation1}
                    />
                </div>
            </section>
        </>
    )
}

export default ProcessAutomation;