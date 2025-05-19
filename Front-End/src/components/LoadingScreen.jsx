import '../styles/LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}

export default LoadingScreen;
