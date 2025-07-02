import { Suspense } from "react";

import VerifyAccountContent from "./verifyAccountContent";

const VerifyAccountPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccountContent />
    </Suspense>
  );
}
export default VerifyAccountPage;


