import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
const NotFound = lazy(() => import("../pages/NotFound"));
const EnergySector = lazy(() => import("../pages/EnergySector"));
const InfraSector = lazy(() => import("../pages/InfraSector"));
const WhoWeAre = lazy(() => import("../pages/WhoWeAre"));
const BusinessWithUs = lazy(() => import("../pages/BusinessWithUs"));
const WorkWithUs = lazy(() => import("../pages/WorkWithUs"));
// 
import SectorDetails from "../pages/sectors/SectorDetails"
import SectorItems from "../pages/sectors/SectorItems";

const Loader = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <p>Loading...</p>
  </div>
);

const RoutesComponent: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/energy_sector" element={<EnergySector />} />
          <Route path="/infra_sector" element={<InfraSector />} />
          <Route path="/who_we_are" element={<WhoWeAre />} />
          <Route path="/business_with_us" element={<BusinessWithUs />} />
          <Route path="/work_with_us" element={<WorkWithUs />} />

          <Route path="/items/:id" element={<SectorItems />} />
          <Route path="/details/:id" element={<SectorDetails />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default RoutesComponent;
