
import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const GeneralDivingTankerVesselsInshoreServices: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                GENERAL DIVING, TANKER & VESSELS INSHORE SERVICES
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='GENERAL DIVING & ROV SERVICES FPSO, TANKER & VESSELS INSHORE SERVICES'
                        description={[
                            'Class Surveys / UWILDs',
                            'Invasive Marine Species Survey',
                            'Non-Destructive Testing (NDT)',
                            'Underwater Welding & Repairs',
                            'Damage Assessment & Repair Evaluation',
                            'Cutting & Burning',
                            'Hull Cleaning & Propeller Polishing and Maintenance',
                            'Sea-Bed Survey (CCTV, Side-Scan, As Built)',
                            'Subsea Cable & Pipeline Installation',
                            'Trenching & Post-Lay Burial',
                            'Jetty construction support',
                            'Search & Recovery Operations'
                        ]}
                        imageSrc={IMAGES.GeneralDiving1}
                    />
                </div>
            </section>
        </>
    )
}

export default GeneralDivingTankerVesselsInshoreServices;