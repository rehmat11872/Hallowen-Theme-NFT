import Minter from "./Minter";
import KeyMinter from "./KeyMinter";
import ConnectWallet from "./ConnectWallet";

function PrivatePage() {
  function getScreen() {
    return (
      <div>
        
        <KeyMinter></KeyMinter>
        <Minter></Minter>

        <h5>
          here we should check cookies we set on the door button to know if we
          can load the page or not
        </h5>
        <h5>
          If any of haskey or hasspook cookie is valid then load page, otherwise
          do not load this page
        </h5>
      </div>
    );
  }

  let screen = getScreen();
  return screen;
}

export default PrivatePage;
