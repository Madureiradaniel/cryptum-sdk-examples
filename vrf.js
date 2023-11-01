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

const buildContractVRF = async () => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.createVRF({
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

const getSubscription = async (address) => {
    const subscription = await sdk.chainlink.getSubscriptionVRF({
        protocol,
        address
    })
    console.log(subscription)
    return subscription
}

const getSubscriptionByID = async (id) => {
    const subscription = await sdk.chainlink.getSubscriptionByIdVRF({
        protocol,
        id
    })
    console.log(subscription)
}

const topUpSubscription = async (address, amount) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.topUpVRF({
        protocol,
        address,
        wallet,
        amount
    })
    console.log('hash: ', hash)
    return hash
}

const requestRandomWords = async (address, numWords) => {
    const wallet = await getWallet()
    const { hash } = await sdk.chainlink.requestRandomWordsVRF({
        protocol,
        address,
        wallet,
        numWords
    })
    console.log('hash: ', hash)
    return hash
}


const getLatestRequestId = async (address) => {
    const latestRequestID = await sdk.chainlink.latestRequestVRF({
        protocol,
        address
    })
    console.log('Latest request Id: ', latestRequestID)
}

const listAllRequestsID = async (address) => {
    const requests = await sdk.chainlink.requestsVRF({
        protocol,
        address
    })
    console.log(requests)
}

const getRandomWordsVRF = async (address, requestId) => {
    const randomWords = await sdk.chainlink.getRandomWordsVRF({
        protocol,
        address,
        requestId
    })
    console.log(randomWords)
}

const cancelSubscription = async (address, wallet) => {
    const { hash } = await sdk.chainlink.cancelVRF({
        protocol,
        address,
        wallet
    })
    console.log(hash)
}


// 1 - Build Contract Subscription
// Here you should save the hash to later retrieve the contract address. 
// buildContractVRF() 

// 2 - Get contract Address
// In this function, we pass the hash generated earlier.
// The contract address will be returned, and it will be used throughout the project.
// getContractAddressByHash("") 

const address = ""
// 2 - Get subscription
// It returns information about our created subscription.
// getSubscription(address) 
// or
// getSubscriptionByID(1234)

// 3 - To generate random words, we need to add LINK balance to our subscription.
// topUpSubscription(address, 3)

// 4 - Request Generate randomWords
const numWords = 2 // Number of random words to be generated.
// requestRandomWords(address, numWords)

// 5 = Get Request ID
// We can either fetch the last request or list all requests.
// getLatestRequestId(address)
// or
// listAllRequestsID(address)

// 6 - Get Random Words
const requestID = ""
// getRandomWordsVRF(address, requestID)

// 7 - Cancel Subscription
// cancelSubscription(address)