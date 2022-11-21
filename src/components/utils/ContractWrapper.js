require('dotenv').config()

class ContractWrapper {
    constructor(loggedUser) {
      this.loggedUser = loggedUser;
    }
    
    // Write contract
    async whitelistUser(address) {
        const transaction = await window.contract.methods
            .whitelistUser(address)
            .send({ from: this.loggedUser });
        return transaction;
    }

    async removeWhiteListedUser(address) {
        const transaction = await window.contract.methods
            .removeWhiteListedUser(address)
            .send({ from: this.loggedUser });
        return transaction
    }

    async setCost(newCost) {
        const transaction = await window.contract.methods
            .setCost(newCost)
            .send({ from: this.loggedUser })
        return transaction
    }

    async setBaseURI(newBaseURI) {
        const transaction = await window.contract.methods
            .setBaseURI(newBaseURI)
            .send({ from: this.loggedUser })
        return transaction
    }

    async increaseMaxSupply(newMaxSupply) {
        const maxSupply = await this.maxSupply()
        if (newMaxSupply > maxSupply) {
            const transaction = await window.contract.methods
                .increaseMaxSupply(newMaxSupply)
                .send({ from: this.loggedUser })
            return transaction
        }
    }

    async setMaxMintAmount(newMaxMintAmount) {
        const transaction = await window.contract.methods
            .setMaxMintAmount(newMaxMintAmount)
            .send({ from: this.loggedUser })
        return transaction
    }

    async setMaxWLMintAmount(newMaxMintAmount) {
        const transaction = await window.contract.methods
            .setMaxWLMintAmount(newMaxMintAmount)
            .send({ from: this.loggedUser })
        return transaction
    }

    async mint(address) {
        const cost = await this.calculateTokenCostFor(address)

        const weiCost = window.web3.utils.toWei(cost.toString(), 'ether')
        const transaction = await window.contract.methods
            .mint(address)
            .send({ from: this.loggedUser, value: weiCost });
        return transaction

    }

    async mintMany(address, mintAmount) {
        const cost = await this.calculateTokenCostFor(address) * mintAmount
        console.log(cost.toString())
        const weiCost = window.web3.utils.toWei(cost.toString(), 'ether')
        const transaction = await window.contract.methods
            .mintMany(address, mintAmount)
            .send({ from: this.loggedUser, value: weiCost });
        return transaction

    }

    async withdraw() {
        const transaction = await window.contract.methods
            .withdraw()
            .send({ from: this.loggedUser })
        return transaction
    }

    async transferOwnershipTo(address) {
        const transaction = await window.contract.methods
            .transferOwnership(address)
            .send({ from: this.loggedUser })
        return transaction
    }

    // Read contract
    async name() {
        const name = await window.contract.methods.name().call()
        return name
    }

    async balance() {
        const balance = await window.web3.eth.getBalance(process.env.REACT_APP_CONTRACT_ADDRESS)
        return window.web3.utils.fromWei(balance, 'ether')
    }

    async symbol() {
        const symbol = await window.contract.methods.symbol().call()
        return symbol
    }

    async owner() {
        const owner = await window.contract.methods.owner().call()
        return owner
    }

    async totalSupply() {
        const totalSupply = await window.contract.methods.totalSupply().call()
        return totalSupply
    }

    async maxSupply() {
        const maxSupply = await window.contract.methods.maxSupply().call()
        return maxSupply
    }

    async baseURI() {
        const baseURI = await window.contract.methods.baseURI().call()
        return baseURI
    }

    async isPaused() {
        const isPaused = await window.contract.methods.paused().call()
        return isPaused
    }

    async cost() {
        let cost = await window.contract.methods.cost().call();
        return window.web3.utils.fromWei(cost, 'ether')
    }

    async isWhitelisted(address) {
        const isWhitelisted = await window.contract.methods.whitelisted(address).call()
        return isWhitelisted
    }

    async maxMintAmount() {
        const maxMintAmount = await window.contract.methods.maxMintAmount().call()
        return maxMintAmount
    }
    async maxWLMintAmount() {
        const maxWLMintAmount = await window.contract.methods.maxWLMintAmount().call()
        return maxWLMintAmount
    }

    // helper functions
    async getContractInfo() {
        const contractInfo = {
            name: await this.name(),
            symbol: await this.symbol(),
            owner: await this.owner(),
            maxSupply: await this.maxSupply(),
            baseURI: await this.baseURI(),
            cost: await this.cost(),
            balance: await this.balance(),
            maxMintAmount: await this.maxMintAmount(),
            maxWLMintAmount: await this.maxWLMintAmount(),
            totalSupply: await this.totalSupply(),
        }
        return contractInfo
    }

    async calculateTokenCostFor(address) {
        // const isWhitelisted = await this.isWhitelisted(address)
        const isOwner = await this.isOwner(address)
        let tokenCost = await this.cost()
        if (isOwner) {
            tokenCost = 0
        }
        return tokenCost
    }

    async getMaxMintAmountFor(address) {
        if (await this.isWhitelisted(address)) {
            return await this.maxWLMintAmount()
        }
        return await this.maxMintAmount()
    }

    async isOwner(address) {
        const ownerAddress = await window.contract.methods.owner().call()
        return ownerAddress.toUpperCase() === address.toUpperCase()
    }


    // SPOOKS SPECIFIC RULES
    async hasNFT(address) {
        const hasNFT = await window.contract.methods.balanceOf(address).call()
        return hasNFT > 0
    }

    async hasMinted(address) {
        const hasMinted = await window.contract.methods.hasMinted(address).call()
        return hasMinted
    }

}


export default ContractWrapper