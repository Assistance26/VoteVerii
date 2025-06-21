// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { AppContextProvider } from "./contexts/AppContext.js";
// //import { AuthProvider } from "./context/AuthContext.jsx";  // <--- Import AuthProvider here
// import App from "./App.jsx";
// import "./index.css";

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//       <AppContextProvider>   {/* Then wrap AppContext */}
//         <App />
//       </AppContextProvider>
//   </BrowserRouter>
// );

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext.jsx"; // Ensure the file actually exists here
// import { AuthProvider } from "./contexts/AuthContext.jsx"; // Uncomment if you need AuthProvider
import App from "./App.jsx";
import "./index.css";
import { WalletProvider } from "./contexts/WalletContext.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
  <WalletProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </WalletProvider>
  </BrowserRouter>
);  

