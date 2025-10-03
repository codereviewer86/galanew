
import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const GasCompressorUnitsFiltrationSystems: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                GAS COMPRESSOR UNITS, FILTRATION SYSTEMS
                            </h1>
                        </div>
                    </div>
                    <DetailsBox
                        title='Gas Compressor Units, Filtration Systems'
                        description={[
                            'Comprehensive solutions based on compressor units',
                            'Qualified engineers audit and select filtration systems',
                            'Compressor units are supplied complete with auxiliary equipment'
                        ]}
                        imageSrc={IMAGES.GCUFS1}
                    />
                </div>
            </section>
        </>
    )
}

export default GasCompressorUnitsFiltrationSystems;