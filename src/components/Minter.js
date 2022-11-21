import {handleMint} from "./utils/minterUtils"

function Minter() {
    return (
            <button>
                <a onClick={handleMint} style={{cursor: "pointer"}}>Mint</a>
            </button>
        

    );
}

export default Minter;
