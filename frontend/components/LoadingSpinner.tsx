"use client";

import PropTypes from "prop-types";

// Disable the prop-types rule for this file
// /* eslint-disable react/prop-types */

type LoadingSpinnerProps = {
  size?: number;
};
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24 }) => (
  <progress
    aria-label="Loading"
    className="spinner"
    style={{ width: size, height: size }}
    value={0}
    max={100}
  />
);

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};
