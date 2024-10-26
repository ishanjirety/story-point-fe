import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const loadFingerprint = async () => {
      // Load the FingerprintJS agent
      const fp = await FingerprintJS.load();
      // Get the visitor identifier
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    loadFingerprint();
  }, []);

  return fingerprint;
};

export default useFingerprint;
