import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import AppBrowserRoutes from "./routes/routes";
import AuthProvider from "./components/auth/authorized";

// program entry point
function MainApp() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppBrowserRoutes />
      </AuthProvider>
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<MainApp />);
