import React from 'react';
// import {
//   ServerError,
// } from './errors';

class GraphQLErrorBoundary extends React.Component {
  state = {
    error: null
  };

  componentDidCatch(error) {
      console.log(error)
    this.setState({ error });
  }

  render() {
    const { props: { children }, state: { error } } = this;

    if (error) return null;
    return children;
  }
}
      
export default GraphQLErrorBoundary;