import "../styles/globals.css";
import React from 'react';

// グローバルエラーハンドラー
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('🚨 Global error caught:', event.error);
    console.error('🚨 Error details:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled promise rejection:', event.reason);
  });
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 React Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>アプリケーションエラーが発生しました</h1>
          <p>ブラウザのConsole（F12）でエラー詳細を確認してください。</p>
          <button onClick={() => window.location.reload()}>
            ページを再読み込み
          </button>
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary>エラー詳細</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
