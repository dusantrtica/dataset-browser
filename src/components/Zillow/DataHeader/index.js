import React from 'react';

const DataHeader = ({ data }) => (
  <table className="table table-bordered">
    <tr>
      <td>Start Date</td>
      <td>{data.start_date}</td>
    </tr>
    <tr>
      <td>End Date</td>
      <td>{data.end_date}</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>{data.description}</td>
    </tr>
    <tr>
      <td>Frequency</td>
      <td>{data.frequency}</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>{data.name}</td>
    </tr>
    <tr>
      <td>Newest available date</td>
      <td>{data.newest_available_date}</td>
    </tr>
    <tr>
      <td>Oldest available date</td>
      <td>{data.oldest_available_date}</td>
    </tr>
    <tr>
      <td>Refreshed At</td>
      <td>{data.refreshed_at}</td>
    </tr>
    <tr>
      <td>Type</td>
      <td>{data.type}</td>
    </tr>
  </table>
);

export default DataHeader;
