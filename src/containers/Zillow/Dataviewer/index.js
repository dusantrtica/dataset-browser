import React, { Component, Fragment } from 'react';
import Table from '../../../components/Zillow/Table';
import { parseQueryString } from '../../../utils';

const api_key = 'ZKN-ypywK7eXGcy4wBuk';

class Dataviewer extends Component {
  state = {
    data: {},
  };
  fetchZillowData = ({ areaCode, areaCategory, indicator }) => {
    const zillowDatasetCode = `${areaCategory}${areaCode}_${indicator}`;
    const url = `https://www.quandl.com/api/v3/datasets/ZILLOW/${zillowDatasetCode}?api_key=${api_key}`;
    fetch(url)
      .then(res => res.json())
      .then(({ dataset: data }) => this.setState({ data }))
      .catch(() => {
        this.setState({
          status: 'not found',
        });
      });
  };
  componentDidMount() {
    const { areaCode, areaCategory, indicator } = parseQueryString(
      this.props.location.search
    );

    this.fetchZillowData({ areaCode, areaCategory, indicator });
  }
  componentDidUpdate(prevProps) {
    const { areaCode, areaCategory, indicator } = parseQueryString(
      this.props.location.search
    );

    const {
      areaCode: prevAreaCode,
      areaCategory: prevAreaCategory,
      indicator: prevIndicator,
    } = parseQueryString(prevProps.location.search);
    if (
      areaCode !== prevAreaCode ||
      areaCategory !== prevAreaCategory ||
      indicator !== prevIndicator
    ) {
      this.fetchZillowData({ areaCode, areaCategory, indicator });
    }
  }
  render() {
    const {
      data: { column_names, data },
    } = this.state;
    if (data) {
      const tableData = data.map(dataEntry => {
        const [date, value] = dataEntry;
        return {
          id: date,
          date,
          value,
        };
      });
      return (
        <Fragment>
          <Table
            columns={column_names.map(columnName => ({
              text: columnName,
              dataField: columnName.toLowerCase(),
            }))}
            data={tableData}
          />
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Dataviewer;
