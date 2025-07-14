import { Suspense } from "react";
import PasswordResetContent from "./PasswordResetContent";

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordResetContent />
    </Suspense>
  );
}
