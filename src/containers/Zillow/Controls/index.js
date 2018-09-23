import React, { Component, Fragment } from 'react';
import { navigate } from '@reach/router';
import DatePicker from 'react-16-bootstrap-date-picker';
import moment from 'moment';
import AreaCategory from '../../../components/Zillow/AreaCategory';
import AreaCode from '../../../components/Zillow/AreaCode';
import Indicators from '../../../components/Zillow/Indicators';
import { stringifyQuery } from '../../../utils';

import indicatorsCodes from '../data/indicators';

const getStates = () => import('../data/states');
const getCounties = () => import('../data/counties');
const getMetros = () => import('../data/metros');
const getCities = () => import('../data/cities');
const getNeighborhoods = () => import('../data/neighborhoods');

const areaCategoryOptions = [
  { value: 'S', label: 'State' },
  { value: 'CO', label: 'County' },
  { value: 'M', label: 'Great Metropolitan Area' },
  { value: 'C', label: 'City' },
  { value: 'N', label: 'Neighborhood' },
  { value: 'Z', label: 'Zip Code' },
];

const getAreaCodeModule = selectedAreaCategory => {
  if (selectedAreaCategory === 'S') {
    return getStates();
  }
  if (selectedAreaCategory === 'CO') {
    return getCounties();
  }
  if (selectedAreaCategory === 'M') {
    return getMetros();
  }
  if (selectedAreaCategory === 'C') {
    return getCities();
  }
  if (selectedAreaCategory === 'N') {
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
    if (selectedAreaCategory.value !== 'Z') {
      getAreaCodeModule(selectedAreaCategory.value).then(areaCodeModule => {
        const { name: areaCodeName, options: areaCodeOptions } = areaCodeModule;
        this.setState({
          selectedAreaCategory,
          selectedAreaCode: null,
          areaCodeName,
          areaCodeOptions,
        });
      });
    } else {
      this.setState({
        selectedAreaCategory,
      });
    }
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
      selectedZipCode: zipCode,
      selectedAreaCategory: { value: areaCategory },
      selectedAreaCode: { value: areaCode },
      selectedIndicator: { value: indicator },
    } = this.state;

    let query = {
      areaCategory,
      indicator,
      areaCode: areaCode || '',
      zipCode: zipCode || '',
      startDate: startDate ? startDate.substr(0, 10) : '',
      endDate: endDate ? endDate.substr(0, 10) : '',
    };

    const stringifiedQuery = stringifyQuery(query);
    console.log({ stringifiedQuery });

    navigate(`/zillow/search?${stringifiedQuery}`);
  };

  componentDidUpdate(prevProps) {
    const {
      initQuery: {
        areaCategory,
        areaCode,
        startDate,
        endDate,
        indicator,
        zipCode,
      },
    } = this.props;

    const {
      initQuery: {
        zipCode: prevZipCode,
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
      prevIndicator !== indicator ||
      prevStartDate !== startDate ||
      prevEndDate !== endDate ||
      prevZipCode !== zipCode
    ) {
      if (zipCode) {
        this.setState({
          selectedAreaCategory: areaCategoryOptions.find(
            ({ value }) => value === 'Z'
          ),
          selectedZipCode: zipCode,
          startDate,
          endDate,
        });
      } else {
        getAreaCodeModule(areaCategory).then(areaCodeModule => {
          const {
            name: areaCodeName,
            options: areaCodeOptions,
          } = areaCodeModule;
          this.setState({
            startDate,
            endDate,
            selectedAreaCategory: areaCategoryOptions.find(
              ({ value }) => value === areaCategory
            ),
            selectedAreaCode: areaCodeOptions.find(
              ({ value }) => value === areaCode
            ),
            areaCodeName,
            areaCodeOptions,
            selectedIndicator: indicatorsCodes.options.find(
              ({ value }) => value === indicator
            ),
          });
        });
      }
    }
  }

  handleZipCodeChange = e => {
    const {
      target: { value: selectedZipCode },
    } = e;
    this.setState({ selectedZipCode });
  };

  render() {
    const {
      selectedZipCode,
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
          <div className="col-lg-4">
            Date From
            <DatePicker
              onChange={this.handleStartDateChange}
              value={startDate}
            />
          </div>
          <div className="col-lg-4">
            Date To
            <DatePicker onChange={this.handleEndDateChange} value={endDate} />
          </div>
          <div className="col-lg-4">
            Area Category
            <AreaCategory
              onChange={this.handleAreaCategoryChange}
              selectedValue={selectedAreaCategory}
              options={areaCategoryOptions}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            Area Code
            <AreaCode
              options={areaCodeOptions}
              name={areaCodeName}
              selectedValue={selectedAreaCode}
              onChange={this.handleAreaCodeChange}
            />
          </div>
          <div className="col-lg-6">
            Indicators
            <Indicators
              options={indicatorsCodes.options}
              onChange={this.handleIndicatorsChange}
              selectedValue={selectedIndicator}
            />
          </div>

          {selectedAreaCategory.value === 'Z' && (
            <div className="form-group col-lg-2">
              Zip code
              <input
                className="form-control"
                type="text"
                value={selectedZipCode}
                onChange={this.handleZipCodeChange}
              />
            </div>
          )}

          <div className="col-lg-1">
            <button
              type="button"
              className="btn btn-success"
              style={{ marginTop: '20px' }}
              onClick={this.onClickSearch}>
              Search
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Controls;
