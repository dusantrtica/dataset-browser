import React, { Component, Fragment } from 'react';
import AreaCategory from '../../../components/Zillow/AreaCategory';
import AreaCode from '../../../components/Zillow/AreaCode';
import Indicators from '../../../components/Zillow/Indicators';
import statesOptions from '../data/states';
import countiesOptions from '../data/counties';
import metrosOptions from '../data/metros';
import citiesOptions from '../data/cities';
import neighborhoodsOptions from '../data/neighborhoods';
import indicatorsCodes from '../data/indicators';

const api_key = 'ZKN-ypywK7eXGcy4wBuk';

const loadAreaCodeOptions = selectedAreaCategory => {
  if (selectedAreaCategory === 'S') {
    return statesOptions;
  } else if (selectedAreaCategory === 'CO') {
    return countiesOptions;
  } else if (selectedAreaCategory === 'M') {
    return metrosOptions;
  } else if (selectedAreaCategory === 'C') {
    return citiesOptions;
  } else if (selectedAreaCategory === 'N') {
    return neighborhoodsOptions;
  }
};

class Controls extends Component {
  state = {
    selectedAreaCategory: 'S',
    selectedAreaCode: null,
  };
  handleAreaCategoryChange = ({ value: selectedAreaCategory }) => {
    const selectedAreaCode = null;
    this.setState({ selectedAreaCategory, selectedAreaCode });
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
    const {
      selectedIndicator: { value: indicator },
      selectedAreaCode: { value: areaCode },
      selectedAreaCategory: areaCategory,
    } = this.state;

    const zillowDatasetCode = `${areaCategory}${areaCode}_${indicator}`;
    const url = `https://www.quandl.com/api/v3/datasets/ZILLOW/${zillowDatasetCode}?api_key=${api_key}`;

    fetch(url).then(console.log);
  };
  render() {
    const { selectedAreaCategory, selectedAreaCode } = this.state;
    const { name, options } = loadAreaCodeOptions(selectedAreaCategory);
    return (
      <Fragment>
        <AreaCategory
          onChange={this.handleAreaCategoryChange}
          selectedValue={selectedAreaCategory}
        />
        <AreaCode
          options={options}
          name={name}
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
