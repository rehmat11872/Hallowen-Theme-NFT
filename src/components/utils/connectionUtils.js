import Swal from 'sweetalert2'
import Web3 from 'web3';
import Cookies from 'universal-cookie';

import {useNavigate} from 'react-router-dom';


import ContractWrapper from './ContractWrapper'
require('dotenv').config()


async function getCurrentAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

async function loadOwnershipCookies(currentAccount) {
    let localContract = require("./contracts/" + process.env.REACT_APP_KEY_FILE)
    let contractAddress = process.env.REACT_APP_KEY_ADDRESS
    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
    let contractWrapper = new ContractWrapper(currentAccount);
    let hasKey = await contractWrapper.hasNFT(currentAccount)
    console.log("getting here")
    console.log(hasKey)
    
    const cookies = new Cookies();
    
    if (hasKey) {
        cookies.set('hasKey', 'true', { path: '/mint' });
        console.log(cookies.get('hasKey'));
    } else {
        cookies.set('hasKey', 'true', { path: '/mint' });
        console.log(cookies.get('hasKey'));
    }


    localContract = require("./contracts/" + process.env.REACT_APP_CONTRACT_FILE)
    contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
    contractWrapper = new ContractWrapper(currentAccount);
    let hasSpook = await contractWrapper.hasNFT(currentAccount)
    if (hasSpook) {
        
        cookies.set('hasSpook', 'true', { path: '/mint' });
        console.log(cookies.get('hasSpook'));
        
    } else {
        cookies.set('hasSpook', 'false', { path: '/mint' });
        console.log(cookies.get('hasSpook'));
    }

    if (hasKey || hasSpook) {
        Swal.fire({
            icon: 'success',
            title: 'Here we should redirect to /mint',
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'You need to have a SpooKey or Spook to enter',
        })
    }
}

async function handelConnect() {
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
                    window.web3 = new Web3(window.ethereum);
                    window.ethereum.enable();
                    const localContract = require("./contracts/" + process.env.REACT_APP_CONTRACT_FILE)
                    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
                    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'You are already connected using Metamask',
                    text: 'Connected address: ' + currentAccount
                })
                return 'success'
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

async function loadOwnershipStatus(){
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
                    window.web3 = new Web3(window.ethereum);
                    window.ethereum.enable();
                    const localContract = require("./contracts/" + process.env.REACT_APP_CONTRACT_FILE)
                    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
                    window.contract = await new window.web3.eth.Contract(localContract.abi, contractAddress);
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
                await loadOwnershipCookies(currentAccount)
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

export {handelConnect, loadOwnershipStatus}