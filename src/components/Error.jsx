import "./Error.css";
export const Error = () => {
  return (
    <div className="error">
      <img
        className="error__img"
        src="https://media.giphy.com/media/wfI6T7Ezk6eE44tjkx/giphy.gif"
        alt="error"
      />
      <p className="error__text">Oops! There’s nothing here.</p>
    </div>
  );
};
