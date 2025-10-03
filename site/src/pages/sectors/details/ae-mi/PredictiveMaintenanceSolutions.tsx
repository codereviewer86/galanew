import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const PredictiveMaintenanceSolutions: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                PREDICTIVE MAINTENANCE SOLUTIONS
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='AI-Based Predictive Maintenance Solution'
                        description={[
                            'Manage over-staffing',
                            'Increasing efficiency',
                            'Avoiding downtime',
                            'Unlock the power of proactive maintenance with our revolutionary Predictive Maintenance solution.',
                            'Utilizing advanced AI alogorithms and pioneering sensors, we provide early warning diagnostics and root-cause analysis to predict equipment failure.',
                            'Monitor machine health remotely on a single, user-friendly interface and gain the ability to visualize information at various levels.',
                            'Our hosted solution offers unparalled flexibility for seamless integration.',
                            'Autonomous rich data generation Acoustic, Vibration, Temperature',
                            'Advanced&efficient AI incident advisor',
                            'Universal Applicability & Platform Integration'
                        ]}
                        imageSrc={IMAGES.PredictiveMaintenance1}
                    />
                </div>
            </section>
        </>
    )
}

export default PredictiveMaintenanceSolutions;