import ErrorConstant from "../constants/error-constant";

function ErrorMessage({ errorMessage }) {
  return (
    <div className={`error-message ${errorMessage ? "warning" : ""}`}>
      <p>{ErrorConstant[errorMessage] || errorMessage}</p>
    </div>
  );
}

export default ErrorMessage;
