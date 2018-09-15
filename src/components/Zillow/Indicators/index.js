import React from 'react';
import Select from 'react-select';

const Indicators = ({ selectedOption, onChange, options }) => (
  <Select value={selectedOption} onChange={onChange} options={options} />
);

export default Indicators;
