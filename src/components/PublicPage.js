import Minter from "./Minter";
import KeyMinter from "./KeyMinter";
import DoorClose from "./DoorClose";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function PublicPage() {
  function getScreen() {
    return (
      <div className="home">
        <Router>
          <Routes>
            <Route path="/" exact={true} element={<DoorClose />} />           
          </Routes>
        </Router>
      </div>
    );
  }

  let screen = getScreen();
  return screen;
}

export default PublicPage;
