import React from 'react';
import SectorItemServiceList from '../../components/Sector/SectorItemServiceList';
import BackButton from '../../components/ui/BackButton';

const SectorItemServicePage: React.FC = () => {
  return (
    <>
       <div className="mb-4">
        <BackButton>
          Back to Sector Items
        </BackButton>
      </div>
      <h1 className="text-2xl font-bold mb-4">Sector Item Services</h1>
      {/* <SectorItemServiceForm /> */}
      <SectorItemServiceList />
    </>
  );
};

export default SectorItemServicePage;
