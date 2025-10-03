import React from 'react'
import DetailsBox from '../../../../components/DetailsBox';
import { useLanguage } from '../../../../context/LanguageContext';
import { VITE_API_BASE_URL } from '../../../../utils/axiosInstance';

type SectorDetailsItemProps = {
    title: string
    description: string
    passedService: any
    imageSrc: string
    detailsData: Array<{
        title: string
        description: string
        imageSrc: string
        pdfUrl?: string
    }>
}

const SectorDetailsItem: React.FC<SectorDetailsItemProps> = ({ title, description, passedService, imageSrc, detailsData }) => {
    const { language } = useLanguage();
    const isRu = language === 'ru';
    return (
        <>
            <section className="service py-5 mb-lg-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 m-auto">
                            <h1 className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">{isRu ? passedService?.labelRu : title}</h1>
                            <div className="pt-3 pb-4 text-center aos-init" data-aos="fade-up">
                                <img className='img-fluid mx-auto' style={{ width: '300px', height: '150px', objectFit: 'cover' }} loading='lazy' src={passedService?.brandLogo?.startsWith('https') ? passedService?.brandLogo : passedService?.brandLogo ? VITE_API_BASE_URL + passedService?.brandLogo : imageSrc} />
                                <p className="MsoNoSpacing">
                                    <b>
                                        {isRu ? passedService?.descriptionRu : description}
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    {detailsData.map((item, idx) => (
                        <DetailsBox
                            key={idx}
                            title={item.title}
                            description={item.description}
                            data={item}
                            imageSrc={item.imageSrc && item.imageSrc !== " " ? `${VITE_API_BASE_URL}${item.imageSrc}` : '/s8.webp'}
                            pdfUrl={item.pdfUrl}
                        />
                    ))}
                    {/* <div className="pt-3 pb-4 text-center" data-aos="fade-up" >
                        <img src={IMAGES.completionS10}
                            loading='lazy'
                            style={{ width: '100%' }}
                            alt=""
                        />
                    </div> */}
                    {/* <div className="row pt-4">
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.completionS11}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.completionS12}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.completionS13}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <a href="javascript:void(0);">
                                <img
                                    src={IMAGES.completionS14}
                                    loading='lazy'
                                    width="100%"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default SectorDetailsItem;