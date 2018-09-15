import React, { Component, Fragment } from 'react';
import { navigate } from '@reach/router';
import AreaCategory from '../../../components/Zillow/AreaCategory';
import AreaCode from '../../../components/Zillow/AreaCode';
import Indicators from '../../../components/Zillow/Indicators';
const getStates = () => import('../data/states');
const getCounties = () => import('../data/counties');
const getMetros = () => import('../data/metros');
const getCities = () => import('../data/cities');
const getNeighborhoods = () => import('../data/neighborhoods');

import indicatorsCodes from '../data/indicators';

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
    selectedAreaCategory: 'S',
    selectedAreaCode: null,
  };
  handleAreaCategoryChange = ({ value: selectedAreaCategory }) => {
    const selectedAreaCode = null;
    getAreaCodeModule(selectedAreaCategory).then(areaCodeModule => {
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
    console.log({ selectedAreaCode });
    this.setState({ selectedAreaCode });
  };
  handleIndicatorsChange = selectedIndicator => {
    this.setState({ selectedIndicator });
  };

  onClickSearch = () => {
    // const url =
    //   'https://www.quandl.com/api/v3/datasets/ZILLOW/C25709_ZRISFRR?api_key=ZKN-ypywK7eXGcy4wBuk';
    // fetch(url).then(console.log);
    // const {
    //   selectedIndicator: { value: indicator },
    //   selectedAreaCode: { value: areaCode },
    //   selectedAreaCategory: areaCategory = '',
    // } = this.state;

    const selectedAreaCode = '25709';
    const selectedAreaCategory = 'C';
    const selectedIndicator = 'ZRISFRR';

    navigate(
      `/zillow/search?areaCategory=${selectedAreaCategory}&areaCode=${selectedAreaCode}&indicator=${selectedIndicator}`
    );

    // const zillowDatasetCode = `${areaCategory}${areaCode}_${indicator}`;
    // const url = `https://www.quandl.com/api/v3/datasets/ZILLOW/${zillowDatasetCode}?api_key=${api_key}`;
    //
    // fetch(url).then(console.log);
  };
  render() {
    const {
      selectedAreaCategory,
      selectedAreaCode,
      areaCodeName,
      areaCodeOptions,
    } = this.state;

    return (
      <Fragment>
        <AreaCategory
          onChange={this.handleAreaCategoryChange}
          selectedValue={selectedAreaCategory}
        />
        <AreaCode
          options={areaCodeOptions}
          name={areaCodeName}
          selectedOption={selectedAreaCode}
          onChange={this.handleAreaCodeChange}
        />
        <Indicators
          options={indicatorsCodes.options}
          onChange={this.handleIndicatorsChange}
          selectedOption={this.selectedIndicator}
        />
        <button type="button" onClick={this.onClickSearch}>
          Search
        </button>
      </Fragment>
    );
  }
}

export default Controls;
