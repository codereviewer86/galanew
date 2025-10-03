import React from "react";
import { IMAGES } from "../utils/staticJSON";
import { useLanguage } from "../context/LanguageContext";

interface DetailsBoxProps {
  imageSrc: string;
  title: string;
  data?: any;
  description: string | string[];
  pdfUrl?: string;
  pdfIconSrc?: string;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
  imageSrc,
  title,
  description,
  data,
  pdfUrl,
}) => {
  const { language } = useLanguage();
  const isRu = language === "ru";

  description = isRu ? data?.descriptionRu : description;
  title = isRu ? data?.titleRu : title;
  const descriptionArray = Array.isArray(description) ? description : [description];

  return (
    <div className="completionbox">
      <div className="row">
        {/* Image */}
        <div className="col-lg-2">
          <img className="img-fluid" src={imageSrc} loading="lazy" alt={title} />
        </div>
        {/* Text Content */}
        <div className="col-lg-8">
          <h5 className="mb-1 font-semibold text-lg">{title}</h5>
          {descriptionArray.map((desc, index) => (
            <p key={index} className="mb-0 text-gray-600">► {desc}</p>
          ))}
        </div>
        {/* PDF Download (Optional) */}
        <div className="col-lg-2">
          {pdfUrl && (
            <a href={pdfUrl} download target="_blank" rel="noreferrer">
              <img src={IMAGES.PDFIcon} width="80" alt="PDF" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsBox;