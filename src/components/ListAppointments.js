import React from 'react';

function ListAppointments({ appointments }) {
  const listItems = appointments.map((item) => (
    <div>
      <div>{item.petName}</div>
      <div>{item.ownerName}</div>
    </div>
  ));
  return <div>{listItems}</div>;
}

export default ListAppointments;
