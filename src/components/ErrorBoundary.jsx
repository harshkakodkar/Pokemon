import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
    this.setState({ errorMessage: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error is caught
      return (
        <div className="bg-red-100 text-red-500 p-4 rounded-lg text-center">
          <h2 className="font-bold text-xl">Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    // Otherwise, render the children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
