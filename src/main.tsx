/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  InterwovenKitProvider,
  TESTNET,
  injectStyles
} from '@initia/interwovenkit-react';
import InterwovenKitStyles from '@initia/interwovenkit-react/styles.js';
import { App } from './App';
import './styles.css';

type RootErrorBoundaryProps = {
  children: React.ReactNode;
};

type RootErrorBoundaryState = {
  error: Error | null;
};

class RootErrorBoundary extends React.Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="container">
          <section className="card errorCard" role="alert">
            <h1>Runtime Initialization Failed</h1>
            <p>The app hit a fatal runtime error during startup instead of rendering a blank page.</p>
            <pre>{this.state.error.message}</pre>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

function ProviderBootstrap() {
  React.useEffect(() => {
    injectStyles(InterwovenKitStyles);
  }, []);

  return (
    <InterwovenKitProvider {...TESTNET}>
      <App />
    </InterwovenKitProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <ProviderBootstrap />
    </RootErrorBoundary>
  </React.StrictMode>
);
