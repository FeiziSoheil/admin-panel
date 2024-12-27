import { useContext, useState } from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes, useRoutes } from "react-router-dom";
import routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
  const [open, setOpen] = useState(false);
  const {isDark} = useContext(ThemeContext)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="font-poppins"
        bodyClassName="font-poppins"
      />
      <div className={`flex   w-full`}>
        <SideBar open={open} setOpen={setOpen} />
        <div
        className={`
          ${isDark?'bg-[#1E1E2E] text-[#FFFFFF]':'bg-[#fefefe]'}
          panel flex-1 px-8 py-4 min-h-screen flex  duration-500 flex-col ${
          open ? 'ml-64' : 'ml-[86px]'
        }`}
        >
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
