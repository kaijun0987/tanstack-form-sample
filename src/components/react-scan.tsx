import React, { useEffect } from "react";
import { scan } from "react-scan";

export function ReactScan(): React.JSX.Element {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === "development",
    });
  }, []);

  return <></>;
}
