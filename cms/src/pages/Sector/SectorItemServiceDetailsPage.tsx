import React from 'react';
// import SectorItemServiceDetailsForm from '../../components/Sector/SectorItemServiceDetailsForm';
import SectorItemServiceDetailsList from '../../components/Sector/SectorItemServiceDetailsList';
import BackButton from '../../components/ui/BackButton';

const SectorItemServiceDetailsPage: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <BackButton>
          Back to Sector Services
        </BackButton>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Sector Item Service Details
      </h1>
      {/* <SectorItemServiceDetailsForm /> */}
      <SectorItemServiceDetailsList />
    </>
  );
};

export default SectorItemServiceDetailsPage;
