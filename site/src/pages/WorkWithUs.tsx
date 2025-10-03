import { useLanguage } from '../context/LanguageContext';
import { useSection } from '../hooks/useSections';
import React, { useState, useRef } from 'react';
import { Accordion } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const WorkWithUs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useLanguage();
  const { section: careers_section } = useSection('careers');
  const careersData = careers_section?.data?.[language] || {};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await axiosInstance.post('/api/email/contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitMessage(response.data.message);
        // Reset form safely
        if (formRef.current) {
          formRef.current.reset();
        }
        setSelectedFile(null);
      } else {
        setSubmitError(response.data.message || 'Failed to submit application');
      }
    } catch (error: any) {
      console.log('Error submitting form:', error);
      if (error.response?.data?.message) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError('Network error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="banner page-contact p-0 mb-5"
        style={{ height: '100px' }}
      ></section>
      <section className="banner contact-us-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 pe-lg-5">
              <div
                className="title pb-1 pt-2 fw-normal text-primary aos-init aos-animate"
                data-aos="fade-up"
              >
                {careersData?.title1}
              </div>
              <p className="pt-3 aos-init aos-animate" data-aos="fade-up">
                {careersData?.description1}
              </p>
            </div>
            <div className="col-lg-7">
              <Accordion
                activeKey={openAccordion}
                onSelect={(eventKey) => setOpenAccordion(eventKey as string)}
              >
                {careersData?.jobs?.map((job: any, index: number) => (
                  <Accordion.Item eventKey={String(index)} key={job.id}>
                    <Accordion.Header>{job.title}</Accordion.Header>
                    <Accordion.Body>
                      <div
                        className="job-description"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="sendcvmin">
        <div className="container">
          <div className="title pb-4 pt-2 fw-normal text-primary">
            {careersData?.title2}
          </div>
          <div className="row">
            <div className="col-lg-5">
              <p className="pt-0">{careersData?.description2}</p>
            </div>
            <div className="col-lg-7">
              <form className="sendcv" onSubmit={handleSubmit} ref={formRef}>
                {submitMessage && (
                  <div className="alert alert-success mb-3" role="alert">
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {submitError}
                  </div>
                )}
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone number"
                      name="phone_number"
                    />
                  </div>
                  <div className="col-lg-6">
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      name="recruitment_id"
                    >
        
                      <option value="0">Select job title</option>
                      {careersData?.jobs?.map((job: any) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-12">
                    <div className="attach-file">
                      <input
                        type="file"
                        name="resume"
                        className="form-control"
                        placeholder="Attach file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                      <span>{selectedFile ? selectedFile.name : 'Attach file'}</span>
                      {/* <img src="img/attachment.svg" /> */}
                    </div>
                    {selectedFile && (
                      <div className="mt-2">
                        <small className="text-muted">
                          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </small>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn  mt-4 btn-warning w-100"
                  style={{ marginTop: '-1px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;