import {handleMintKey} from "./utils/minterUtils"

function KeyMinter() {
    return (
            <button>
                <a onClick={handleMintKey} style={{cursor: "pointer"}}>Mint Key</a>
            </button>
        

    );
}

export default KeyMinter;
