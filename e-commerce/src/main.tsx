import ReactDOM from "react-dom/client";
import App from "./view/app";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";

/**
 * Handles main app
 */
function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<MainApp />);
