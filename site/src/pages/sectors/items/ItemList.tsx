import { VITE_API_BASE_URL } from '../../../utils/axiosInstance'
import { useLanguage } from '../../../context/LanguageContext'
import React from 'react'
import { Link } from 'react-router-dom'

type Service = {
  id: number
  img: string
  label: string
  labelRu?: string
}

type ItemListProps = {
  title: string
  description: string
  services: Service[]
  passedService?: {
    labelRu?: string
    descriptionRu?: string
  }
}

const ItemList: React.FC<ItemListProps> = ({ title, description, passedService, services }) => {
   const { language } = useLanguage();
   const isRu = language === 'ru';
    return (
        <>
          <section className="service py-5 mb-lg-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-11 m-auto">
                  <div className="title pb-1 pt-2 text-center aos-init aos-animate" data-aos="fade-up">
                    {isRu ? passedService?.labelRu : title}
                  </div>
                  <div className="pt-3 pb-4 text-center item-desc aos-init aos-animate" data-aos="fade-up">
                    <h1 style={{color: "rgb(34, 34, 34)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "small"}}></h1>
                    <h4 style={{textAlign: "center"}} className="">
                      <b>{isRu ? passedService?.descriptionRu : description}</b>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="row g-4 g-lg-4 justify-content-center">
                {services.map((service, idx) => (
                  <div className="col-lg-4" key={idx}>
                    <div className="service-box aos-init" data-aos="fade-up">
                      <Link className="service-box-img" to={`/details/${service.id}`} state={{ service }}>
                        <img className='img-fluid' src={service.img && service.img !== " " ? `${VITE_API_BASE_URL}${service.img}` : '/completion.webp'} loading='lazy' alt='' />
                        <div className="arrow-hover">{isRu ? service.labelRu : service.label}</div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
    )
}

export default ItemList