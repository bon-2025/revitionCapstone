import { useState } from "react";

/**
 * Custom hook to handle async operations with loading and error state management.
 *
 * This hook is designed to wrap any asynchronous function (API call, fetch, etc.)
 * and provide a standardized way to handle loading states, error messages,
 * and minimum loading time if needed.
 *
 * @returns {Object} - { loading, error, run, setError }
 *   - loading: boolean indicating whether the async operation is in progress
 *   - error: string containing the error message if the async operation fails
 *   - run: function to execute the async operation with error/loading handling
 *   - setError: setter function to manually set error state
 */
export const useAsyncHandler = () => {
  // State to track whether an async operation is currently running
  const [loading, setLoading] = useState(false);

  // State to store error messages from async operations
  const [error, setError] = useState("");

  /**
   * Executes the provided async function with automatic loading and error handling.
   *
   * @param {Function} asyncFunc - An async function that returns a promise.
   *                               Optionally accepts a `minLoadingTime` parameter.
   * @param {number} minLoadingTime - Minimum loading time in milliseconds (default: 5000ms).
   * @returns {Promise<any|null>} - Returns the result of asyncFunc or null if an error occurs.
   */
  const run = async (asyncFunc) => {
    // Start loading state
    setLoading(true);
    setError("");

    try {
      // Await the async function
      const result = await asyncFunc();
      return result;
    } catch (err) {
      // Capture and store any errors
      setError(err.message || "An unexpected error occurred.");
      return null;
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return { loading, error, run, setError };
};
