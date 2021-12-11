export default function Loading() {  
  return (
    <div className="loading">
      <div className="loading-status spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
function LoadingClassic(props) {
  return (
    <div className="loadingClassic">
      <div className="loading-status spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export { LoadingClassic };