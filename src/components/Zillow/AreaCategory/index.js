import React from 'react';
import Select from 'react-select';

const AreaCategory = ({ selectedValue, onChange, options }) => (
  <Select value={selectedValue} onChange={onChange} options={options} />
);

export default AreaCategory;
