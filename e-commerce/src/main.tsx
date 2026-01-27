import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./view/app";
import store from "./store/store";
import { Provider } from "react-redux";

function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<MainApp />);
