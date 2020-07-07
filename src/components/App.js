/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import '../css/App.css';

import { without, findIndex } from 'lodash';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0,
      orderBy: 'petName',
      orderDir: 'desc',
      queryText: '',
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointments = this.addAppointments.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    const { lastIndex } = this.state;
    fetch('./data.json')
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.aptId = lastIndex;
          this.setState({
            lastIndex: lastIndex + 1,
          });
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  searchApts(query) {
    this.setState({
      queryText: query,
    });
  }

  addAppointments(apt) {
    const { myAppointments, lastIndex } = this.state;
    const tempApts = myAppointments;
    apt.aptId = lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: lastIndex + 1,
    });
  }

  toggleForm() {
    const { formDisplay } = this.state;
    this.setState({
      formDisplay: !formDisplay,
    });
  }

  deleteAppointment(apt) {
    const { myAppointments } = this.state;
    let tempApts = myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({
      myAppointments: tempApts,
    });
  }

  updateInfo(name, value, id) {
    const { myAppointments } = this.state;
    const tempApts = myAppointments;
    const aptIndex = findIndex(myAppointments, {
      aptId: id,
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts,
    });
  }

  render() {
    const {
      myAppointments,
      orderDir,
      orderBy,
      queryText,
      formDisplay,
    } = this.state;
    let order;
    let filteredApts = myAppointments;
    if (orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
          return -1 * order;
        }
        return 1 * order;
      })
      .filter(
        (eachItem) => eachItem.petName
          .toLowerCase()
          .includes(queryText.toLocaleLowerCase())
          || eachItem.ownerName
            .toLowerCase()
            .includes(queryText.toLocaleLowerCase())
          || eachItem.aptNotes
            .toLowerCase()
            .includes(queryText.toLocaleLowerCase()),
      );

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointments={this.addAppointments}
                />
                <SearchAppointments
                  orderBy={orderBy}
                  orderDir={orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
