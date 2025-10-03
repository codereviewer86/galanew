import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const TopsideInstallationMaintenanceRepairs: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                TOPSIDE INSTALLATION, MAINTENANCE AND REPAIRS
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Topside Installation, Maintenance and Repairs'
                        description={[
                            'Derrick maintenance, repair, and assembly',
                            'Flare tip Installations & Flare tip to splash zone maintenance and repair',
                            'Heli deck remedial repairs',
                            'Cathodic protection maintenance and repair',
                            'Steel renewals and bolt tensioning',
                            'Blasting',
                            'Marine standard coating and sealant application',
                            'Fabrication works',
                            'Insulation works',
                            'Electrical installations',
                            'Mechanical and engineering support',
                            'Demolishing and decommissioning',
                            'Piping composite repair systems'
                        ]}
                        imageSrc={IMAGES.TopsideInstallation1}
                    />
                </div>
            </section>
        </>
    )
}

export default TopsideInstallationMaintenanceRepairs;