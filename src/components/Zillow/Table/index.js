import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

const Table = props => (
  <ToolkitProvider
    keyField="id"
    columns={props.columns}
    data={props.data}
    exportCSV>
    {props => (
      <div>
        <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
        <hr />
        <BootstrapTable {...props.baseProps} />
      </div>
    )}
  </ToolkitProvider>
);

export default Table;
