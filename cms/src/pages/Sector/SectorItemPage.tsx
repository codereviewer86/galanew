import React from 'react';
import { useSearchParams } from 'react-router';
import SectorItemList, { SectorItemListProps } from '../../components/Sector/SectorItemList';

const SectorItemPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sectorType = searchParams.get('type') as SectorItemListProps['sectorType'] | undefined;
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {sectorType ? `${sectorType.charAt(0) + sectorType.slice(1).toLowerCase()} Sector Items` : 'Sector Items'}
      </h1>
      <div className="mt-8">
        <SectorItemList sectorType={sectorType} />
      </div>
    </>
  );
};

export default SectorItemPage;
