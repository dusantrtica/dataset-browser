import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const products = [];
const columns_ = [
  {
    dataField: 'id',
    text: 'Product ID',
  },
  {
    dataField: 'name',
    text: 'Product Name',
  },
  {
    dataField: 'price',
    text: 'Product Price',
  },
];

export default ({ columns, data }) => (
  <BootstrapTable keyField="id" data={data} columns={columns} />
);
