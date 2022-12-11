function ErrorMessage({ errorMessage }) {
  return (
    <div className={`error-message ${errorMessage ? "warning" : ""}`}>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorMessage;
