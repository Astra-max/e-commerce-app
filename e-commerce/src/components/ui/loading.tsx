import "../../styles/loading.css";


type LoadingProps = {
  message?: string;
  inline?: boolean;
};

const Loading = ({ message = "Loading...", inline = false }: LoadingProps) => {
  return (
    <div className={inline ? "loading-inline" : "loading-screen"}>
      <div className="loading-spinner" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
