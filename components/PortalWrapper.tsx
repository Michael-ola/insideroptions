"use client";

import { useEffect, useState, ReactElement, cloneElement } from "react";
import { createPortal } from "react-dom";

type PortalWrapperProps = {
  children: ReactElement;
  [key: string]: any;
};

const PortalWrapper = ({ children, ...rest }: PortalWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const childWithProps = cloneElement(children, { ...rest });

  return createPortal(childWithProps, document.body);
};

export default PortalWrapper;
