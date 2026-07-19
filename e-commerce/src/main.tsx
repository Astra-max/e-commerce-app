import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import AppBrowserRoutes from "./routes/routes";

// program entry point
function MainApp() {
  return (
    <Provider store={store}>
      <AppBrowserRoutes />
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<MainApp />);
