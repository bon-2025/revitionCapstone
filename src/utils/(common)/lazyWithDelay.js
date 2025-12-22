import { lazy } from "react";

/**
 * Lazy load a component with optional delay
 * @param {Function} importFunc - dynamic import function
 * @param {number} delay - delay in milliseconds (default: 0)
 * @returns {React.LazyExoticComponent}
 */
export const lazyWithDelay = (importFunc, delay = 0) => {
  return lazy(() =>
    new Promise(resolve =>
      setTimeout(() => resolve(importFunc()), delay)
    )
  );
};
