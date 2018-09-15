import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'S', label: 'State' },
  { value: 'CO', label: 'County' },
  { value: 'M', label: 'Great Metropolitan Area' },
  { value: 'C', label: 'City' },
  { value: 'N', label: 'Neighborhood' },
  { value: 'Z', label: 'Zip Code' },
];

const AreaCategory = ({ selectedOption, onChange }) => (
  <Select value={selectedOption} onChange={onChange} options={options} />
);

export default AreaCategory;
