import Swal from 'sweetalert2'
import Web3 from 'web3';

import ContractWrapper from './ContractWrapper'
require('dotenv').config()


async function getCurrentAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

async function handleMint() {
    try {
        if (typeof window.ethereum === 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'Metamask is not installed',
                footer: '<a target="_blank" href="https://metamask.io/">Install Metamask 🦊</a>'
            })
        } else {
            const currentAccount = await getCurrentAccount()
            if (typeof currentAccount === 'undefined') { 
                try {
                    Swal.fire({
                        icon: 'info',
                        title: 'Metamask is not connected',
                        text: 'Connect to metamask using the connect button at the top right corner'
                    })
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();

                const localContract = require("./contracts/" + process.env.REACT_APP_CONTRACT_FILE)
                
                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
                window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
                const contractWrapper = new ContractWrapper(currentAccount);
                let validations_passed = await handleMintValidation(currentAccount)

                if (validations_passed) {
                    Swal.fire({
                        icon: 'info',
                        title: "Confirm transaction on Metamask",
                        text: 'Once the transaction is done, a notification will appear. Please remain on the site and don\'t reload the page. You can see your transaction status on your Metamask extension.'
                    })
                    const transaction = await contractWrapper.mint(currentAccount);
                    handleTransaction(transaction, contractWrapper)
                }
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}
async function handleMintKey() {
    try {
        if (typeof window.ethereum === 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'Metamask is not installed',
                footer: '<a target="_blank" href="https://metamask.io/">Install Metamask 🦊</a>'
            })
        } else {
            const currentAccount = await getCurrentAccount()
            if (typeof currentAccount === 'undefined') { 
                try {
                    Swal.fire({
                        icon: 'info',
                        title: 'Metamask is not connected',
                        text: 'Connect to metamask using the connect button at the top right corner'
                    })
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();

                const localContract = require("./contracts/" + process.env.REACT_APP_KEY_FILE)
                const contractAddress = process.env.REACT_APP_KEY_ADDRESS
                window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
                const contractWrapper = new ContractWrapper(currentAccount);
                let validations_passed = await handleKeyValidations(contractWrapper, currentAccount)

                if (validations_passed) {
                    Swal.fire({
                        icon: 'info',
                        title: "Confirm transaction on Metamask",
                        text: 'Once the transaction is done, a notification will appear. Please remain on the site and don\'t reload the page. You can see your transaction status on your Metamask extension.'
                    })
                    const transaction = await contractWrapper.mint(currentAccount);
                    handleTransaction(transaction, contractWrapper)
                }
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

async function handleKeyValidations(contractWrapper, address) {

    let hasKey = await contractWrapper.hasNFT(address)
    if (!hasKey) {
        Swal.fire({
            icon: 'error',
            title: 'You need to own a SpooKey to mint!',
        })
        return false
    }

    let hasMinted = await contractWrapper.hasMinted(address)
    if (hasMinted){
        Swal.fire({
            icon: 'error',
            title: 'You already minted one SpooKey',
        })
        return false
    }

    return true
}

async function handleMintValidation(currentAccount) {
    
    let localContract = require("./contracts/" + process.env.REACT_APP_KEY_FILE)
    let contractAddress = process.env.REACT_APP_KEY_ADDRESS
    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
    let contractWrapper = new ContractWrapper(currentAccount);

    let hasKey = await contractWrapper.hasNFT(currentAccount)
    if (!hasKey) {
        Swal.fire({
            icon: 'error',
            title: 'You need to own a SpooKey to mint!',
        })
        return false
    }

    localContract = require("./contracts/" + process.env.REACT_APP_CONTRACT_FILE)
    
    contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
    contractWrapper = new ContractWrapper(currentAccount);

    let hasMinted = await contractWrapper.hasMinted(currentAccount)
    if (hasMinted){
        Swal.fire({
            icon: 'error',
            title: 'You already minted one Spook',
        })
        return false
    }

    return true
}

async function handleTransaction(transaction, contractWrapper) {
    if (transaction.status === true) {
        const currentToken = await contractWrapper.totalSupply();
        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'You have minted token number: ' + currentToken.toString(),
            footer: '<a target="_blank" href="https://testnets.opensea.io/account">View on Opensea</a>'
        })
    
        } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'We had some trouble with your transaction, see your transaction from metamask to see what went wrong',
        })
        }
}


export {handleMint,  handleMintKey}