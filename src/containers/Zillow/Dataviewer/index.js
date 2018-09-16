import React, { Component, Fragment } from 'react';
import Table from '../../../components/Zillow/Table';
import { parseQueryString } from '../../../utils';

const api_key = 'ZKN-ypywK7eXGcy4wBuk';

class Dataviewer extends Component {
  state = {
    data: {},
  };

  shouldReloadZillowData = (props, prevProps) => {
    const {
      areaCode,
      areaCategory,
      indicator,
      startDate,
      endDate,
    } = parseQueryString(props.location.search);

    const {
      areaCode: prevAreaCode,
      areaCategory: prevAreaCategory,
      indicator: prevIndicator,
      startDate: prevStartDate,
      endDate: prevEndDate,
    } = parseQueryString(prevProps.location.search);

    if (
      areaCode !== prevAreaCode ||
      areaCategory !== prevAreaCategory ||
      indicator !== prevIndicator ||
      startDate !== prevStartDate ||
      endDate !== prevEndDate
    ) {
      return true;
    }

    return false;
  };

  fetchZillowData = () => {
    const {
      areaCode,
      areaCategory,
      indicator,
      startDate,
      endDate,
    } = parseQueryString(this.props.location.search);
    const zillowDatasetCode = `${areaCategory}${areaCode}_${indicator}`;
    const url = `https://www.quandl.com/api/v3/datasets/ZILLOW/${zillowDatasetCode}?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`;
    this.setState({
      status: 'loading',
    });
    const fetchPromise = fetch(url);
    fetchPromise
      .then(res => {
        if (res.status !== 200) {
          throw 'Error';
        } else {
          return res.json();
        }
      })
      .then(({ dataset: data }) => this.setState({ data, status: 'success' }))
      .catch(() => {
        this.setState({
          status: 'error',
        });
      });
  };
  componentDidMount() {
    this.fetchZillowData();

    // const {
    //   areaCode,
    //   areaCategory,
    //   indicator,
    //   startDate,
    //   endDate,
    // } = parseQueryString(this.props.location.search);
    //
    // const selectedAreaCode = { value: areaCode };
    // const selectedAreaCategory = { value: areaCategory };
    // const selectedIndicator = { value: indicator };
    //
    // this.props.setZillowQueryParameters({
    //   selectedAreaCode,
    //   selectedAreaCategory,
    //   selectedIndicator,
    // });
  }

  componentDidUpdate(prevProps) {
    if (this.shouldReloadZillowData(this.props, prevProps)) {
      this.fetchZillowData();
    }
  }
  render() {
    const {
      status,
      data: { column_names, data },
    } = this.state;
    if (status === 'success') {
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
    } else if (status === 'loading') {
      return <div>Loading...</div>;
    } else {
      return <div>Not found</div>;
    }
  }
}

export default Dataviewer;
