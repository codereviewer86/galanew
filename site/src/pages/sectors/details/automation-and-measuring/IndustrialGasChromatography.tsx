import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const IndustrialGasChromatography: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                INDUSTRIAL GAS CHROMATOGRAPHY
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Turnkey Solution and Calorific Value'
                        description={[
                            'Qualitative and quantitative analysis of marketable gas for commercial gas metering stations',
                            'The Turnkey solution includes the incorporation of component composition and pshysico-chemical data signals into a common factory cost computer, which is used to report the commercial unit to relevant authorities',
                            'Calorific density and Woobbe index calculation based on component analysis',
                            'Determination of the component composition of marketable gas up to C6+ with extended sulphur component detection'
                        ]}
                        imageSrc={IMAGES.GasChromatography1}
                    />
                </div>
            </section>
        </>
    )
}

export default IndustrialGasChromatography;