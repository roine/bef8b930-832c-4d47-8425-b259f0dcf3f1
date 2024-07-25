import "./App.css";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      {/*HEADER*/}
      <main>
        <Outlet />
      </main>
      {/*FOOTER*/}
    </div>
  );
}

export default AppLayout;
