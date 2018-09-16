import React from 'react';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
// import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const AreaCode = ({ name, selectedValue, options, onChange }) => (
  <Select
    value={selectedValue}
    options={options}
    filterOptions={createFilterOptions({ options })}
    onChange={onChange}
  />
);

export default AreaCode;
