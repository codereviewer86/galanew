import React from 'react'
import { IMAGES } from '../../../../utils/staticJSON';
import DetailsBox from '../../../../components/DetailsBox';

const AquariumsPoolsPonds: React.FC = () => {
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                                Aquariums, Pools and Ponds
                            </h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid' style={{ width: '100%' }} loading='lazy' src={IMAGES.AquariumsPoolsAndPonds1} />
                            </div>
                        </div>
                    </div>
                    <DetailsBox
                        title='Pond construction'
                        description={[
                            'From small decorative and garden ponds to large swimming and koi ponds, you can create everything with OASE.',
                            'Our accessories are suitable for every desired pond: from liners and fleeces to liner adhesive and pre-formed ponds.',
                            'Your dreams and ideas are only limited by your space.'
                        ]}
                        imageSrc={IMAGES.AquariumsPoolsAndPonds2}
                    />
                    <DetailsBox
                        title='Garden control systems and lighting'
                        description={[
                            'With Easy Garden Control (EGC) you can control lighting, filters and pumps conveniently via your smartphone.',
                            'This includes our wide range of LED lighting. Discover a new convenience here.'
                        ]}
                        imageSrc={IMAGES.AquariumsPoolsAndPonds3}
                    />
                    <DetailsBox
                        title='Water features, waterfalls and watercourses'
                        description={[
                            'Imaginative water features in every size for pond, garden, terrace or balcony.',
                            'Let us surprise you with what you can conjure up even in the smallest space.'
                        ]}
                        imageSrc={IMAGES.AquariumsPoolsAndPonds4}
                    />
                    <p className='py-3'>
                        Discover the OASE water worlds for garden, terrace and balcony. Here you will find everything for small water features, garden and swimming ponds of all sizes as well as for professional koi ponds. All products for construction, operation and maintenance are available from us and are perfectly tailored to your needs. And keeping your dream alive beyond the edge of the pond, we offer you a wide range of accessories for planting as well as decorative elements and smart control. Our solutions for irrigation and drainage also support you in your garden work, in the house and even under extreme conditions on the construction site.
                    </p>
                    <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.AquariumsPoolsAndPonds5}
                            loading='lazy'
                            style={{ width: '100%' }}
                            alt=""
                        />
                    </div>
                    <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.AquariumsPoolsAndPonds6}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.AquariumsPoolsAndPonds7}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.AquariumsPoolsAndPonds8}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.AquariumsPoolsAndPonds9}
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

export default AquariumsPoolsPonds;