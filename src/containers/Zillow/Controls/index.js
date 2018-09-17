import React, { Component, Fragment } from 'react';
import { navigate } from '@reach/router';
import DatePicker from 'react-16-bootstrap-date-picker';
import moment from 'moment';
import AreaCategory from '../../../components/Zillow/AreaCategory';
import AreaCode from '../../../components/Zillow/AreaCode';
import Indicators from '../../../components/Zillow/Indicators';
const getStates = () => import('../data/states');
const getCounties = () => import('../data/counties');
const getMetros = () => import('../data/metros');
const getCities = () => import('../data/cities');
const getNeighborhoods = () => import('../data/neighborhoods');
import { parseQueryString } from '../../../utils';

import indicatorsCodes from '../data/indicators';

const areaCategoryOptions = [
  { value: 'S', label: 'State' },
  { value: 'CO', label: 'County' },
  { value: 'M', label: 'Great Metropolitan Area' },
  { value: 'C', label: 'City' },
  { value: 'N', label: 'Neighborhood' },
  { value: 'Z', label: 'Zip Code' },
];

const api_key = 'ZKN-ypywK7eXGcy4wBuk';

const getAreaCodeModule = selectedAreaCategory => {
  if (selectedAreaCategory === 'S') {
    return getStates();
  } else if (selectedAreaCategory === 'CO') {
    return getCounties();
  } else if (selectedAreaCategory === 'M') {
    return getMetros();
  } else if (selectedAreaCategory === 'C') {
    return getCities();
  } else if (selectedAreaCategory === 'N') {
    return getNeighborhoods();
  }
};

class Controls extends Component {
  state = {
    selectedAreaCategory: { value: 'S' },
    selectedAreaCode: {},
    selectedIndicator: {},
    startDate: moment().format(),
    endDate: moment().format(),
  };
  handleAreaCategoryChange = selectedAreaCategory => {
    const selectedAreaCode = null;
    getAreaCodeModule(selectedAreaCategory.value).then(areaCodeModule => {
      const { name: areaCodeName, options: areaCodeOptions } = areaCodeModule;
      this.setState({
        selectedAreaCategory,
        selectedAreaCode: null,
        areaCodeName,
        areaCodeOptions,
      });
    });
  };

  handleAreaCodeChange = selectedAreaCode => {
    this.setState({ selectedAreaCode });
  };
  handleIndicatorsChange = selectedIndicator => {
    this.setState({ selectedIndicator });
  };

  handleStartDateChange = startDate => {
    this.setState({ startDate });
  };

  handleEndDateChange = endDate => {
    this.setState({ endDate });
  };

  onClickSearch = () => {
    const {
      startDate,
      endDate,
      selectedAreaCategory: { value: areaCategory },
      selectedAreaCode: { value: areaCode },
      selectedIndicator: { value: indicator },
    } = this.state;

    navigate(
      `/zillow/search?areaCategory=${areaCategory}&areaCode=${areaCode}&indicator=${indicator}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  componentDidUpdate(prevProps) {
    const {
      initQuery: { areaCategory, areaCode, startDate, endDate, indicator },
    } = this.props;

    const {
      initQuery: {
        areaCategory: prevAreaCategory,
        areaCode: prevAreaCode,
        startDate: prevStartDate,
        endDate: prevEndDate,
        indicator: prevIndicator,
      },
    } = prevProps;

    if (
      prevAreaCode !== areaCode ||
      prevAreaCategory !== areaCategory ||
      prevIndicator !== indicator
    ) {
      getAreaCodeModule(areaCategory).then(areaCodeModule => {
        const { name: areaCodeName, options: areaCodeOptions } = areaCodeModule;
        this.setState({
          selectedAreaCategory: areaCategoryOptions.find(
            ({ value }) => value === areaCategory
          ),
          selectedAreaCode: areaCode,
          areaCodeName,
          areaCodeOptions,
          selectedIndicator: indicatorsCodes.options.find(
            ({ value }) => value === indicator
          ),
        });
      });
      // this.setState({
      //   selectedAreaCategory: { value: areaCategory },
      //   selectedAreaCode: { value: areaCode },
      //   startDate,
      //   endDate,
      //   indicator,
      // });
    }
  }

  render() {
    const {
      selectedAreaCategory,
      selectedAreaCode,
      selectedIndicator,
      areaCodeName,
      areaCodeOptions,
      startDate,
      endDate,
    } = this.state;

    return (
      <Fragment>
        <div className="row">
          <div className="col">
            <DatePicker
              onChange={this.handleStartDateChange}
              value={startDate}
            />
          </div>
          <div className="col">
            <DatePicker onChange={this.handleEndDateChange} value={endDate} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <AreaCategory
              onChange={this.handleAreaCategoryChange}
              selectedValue={selectedAreaCategory}
              options={areaCategoryOptions}
            />
          </div>
          <div className="col">
            <AreaCode
              options={areaCodeOptions}
              name={areaCodeName}
              selectedValue={selectedAreaCode}
              onChange={this.handleAreaCodeChange}
            />
          </div>
        </div>

        <Indicators
          options={indicatorsCodes.options}
          onChange={this.handleIndicatorsChange}
          selectedValue={selectedIndicator}
        />
        <button type="button" className="btn" onClick={this.onClickSearch}>
          Search
        </button>
      </Fragment>
    );
  }
}

export default Controls;
