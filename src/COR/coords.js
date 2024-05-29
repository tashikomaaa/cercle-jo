import React from 'react';

import API from '../api';

export default class Coords extends React.Component {

  handleSubmit = async event => {
    event.preventDefault();

    return await API.get(`coords`);
  }

}