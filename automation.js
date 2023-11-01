require("dotenv").config()

const CryptumSDK = require('cryptum-sdk')
const protocol = process.env.PROTOCOL

const sdk = new CryptumSDK({
    environment: "testnet", // 'testnet' or 'development', 'mainnet' or 'production'
    apiKey: process.env.API_KEY,
})

const getWallet = async () => await sdk.wallet.generateWallet({
    protocol,
    mnemonic: process.env.MNEMONIC
})

const buildContract = async () => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.createAutomation({
        protocol,
        wallet
    })
    console.log('hash: ', hash)
    return hash
}

const getContractAddressByHash = async (hash) => {
    const { contractAddress } = await sdk.transaction.getTransactionReceiptByHash({
        protocol,
        hash
    })

    console.log('contractAddress: ', contractAddress)
    return contractAddress
}

const transferTokens = async (contractAddress, amount, token) => {
    const wallet = await getWallet()
    const { hash } = await sdk.token.transfer({
        protocol,
        amount,
        wallet,
        token,
        destination: contractAddress
    })
    console.log('hash: ', hash)
    return hash
}

const registerUpkeep = async (params) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.registerUpkeep({
        protocol,
        wallet,
        ...params
    })
    console.log('hash: ', hash)
    return hash
}

const getUpkeep = async (upkeepID) => {
    const upkeep = await sdk.chainlink.getUpkeep({
        protocol,
        upkeepID
    })
    console.log(upkeep)
    return upkeep
}

const listAllUpkeeps = async (address) => {
    const upkeeps = await sdk.chainlink.listUpkeeps({
        protocol,
        address
    })
    console.log(upkeeps)
    return upkeeps
}

const pauseUpkeep = async (upkeepID) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.pauseUpkeep({
        protocol,
        wallet,
        upkeepID
    })
    console.log('hash: ', hash)
    return hash
}

const unpauseUpkeep = async (upkeepID) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.unpauseUpkeep({
        protocol,
        wallet,
        upkeepID
    })
    console.log('hash: ', hash)
    return hash
}

const cancelUpkeep = async (upkeepID) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.cancelUpkeep({
        protocol,
        wallet,
        upkeepID
    })
    console.log('hash: ', hash)
    return hash
}

const withdrawUpkeep = async (upkeepID) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.withdrawUpkeep({
        protocol,
        wallet,
        upkeepID
    })
    console.log('hash: ', hash)
    return hash
}

const balanceUpkeeps = async (address, upkeepID) => {
    const balance = sdk.chainlink.getBalanceUpkeep({
        protocol,
        address,
        upkeepID
    })
    console.log(balance)
    return balance
}

const addFundsUpkeep = async (amount, upkeepID) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.addFundsUpkeep({
        protocol,
        wallet,
        amount,
        upkeepID
    })

    console.log('hash: ', hash)
    return hash
}

const editGasLimit = async (upkeepID, gasLimit) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.editGasLimitUpkeep({
        protocol,
        wallet,
        upkeepID,
        gasLimit
    })

    console.log('hash: ', hash)
    return hash
}

// Build contract
// Here you should save the hash to later retrieve the contract address. 
// buildContract()

// 2 - Get contract Address
// In this function, we pass the hash generated earlier.
// The contract address will be returned, and it will be used throughout the project.
// getContractAddressByHash("0x0a49318c23ca71e209b5c4985e0cf4667d108b956bab7acc1c8bab39edecb986")

const contractAddress = ""

// 3 - Add link to contract
// transferTokens(
//     contractAddress,
//     '5',
//     '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // LINK POLYGON
// )

// 4 - Register Upkeep
// registerUpkeep({ 
//     address: contractAddress,
//     name: 'Cryptum Sdk',
//     encryptedEmail: '0x',
//     upkeepContract: '0xFafa49e18e27D4eeb6d34d39b38D90b492F3c315', // build example chainlink compatible contract automation
//     gasLimit: 500000,
//     triggerType: 0,
//     checkData: '0x',
//     triggerConfig: '0x',
//     offchainConfig: '0x',
//     amount: '5' // lINK
// })

const upkeepID = ""

// 5 - Get upkeep info
// list all upkeeps ID
// listAllUpkeeps(contractAddress)
// getUpkeep(upkeepID)

// 6 - add funds
// addFundsUpkeep('5', upkeepID)

// 7 - Pause, unpause, cancel, withdraw, editGas
// pauseUpkeep(upkeepID)
// unpauseUpkeep(upkeepID)
// cancelUpkeep(upkeepID)
// withdrawUpkeep(upkeepID)
// editGasLimit(upkeepID, 400000)