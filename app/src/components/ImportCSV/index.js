import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import { useField } from '@rocketseat/unform';
import path from 'path';
import api from '../../services/api';
// import usuarios from '../../../assets/usuarios.json';

import { Container } from './styles';

class UsersListInput extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      users: undefined
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  async updateData(result) {
    var data = result.data;
    console.log(data);
    const names = await data.map( e =>  {
      return api.post('users/', e);
    });
    this.setState({
      users: names
    })
  };


  render() {
    console.log(this.state.csvfile);
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
      </div>
    );
  }
}

export default UsersListInput;
