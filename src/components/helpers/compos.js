import React from 'react';

function Compos({ head, form, list, foot }) {
  return (
    <div className="wrapper">
      <section className="app">
        <header className="header">
          {head}
          {form}
        </header>
        <section className="main">
          {list}
          {foot}
        </section>
      </section>
    </div>
  );
}

export default Compos;
