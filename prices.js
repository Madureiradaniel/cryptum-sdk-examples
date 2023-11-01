require("dotenv").config()

const CryptumSDK = require('cryptum-sdk')

const sdk = new CryptumSDK({
    environment: "mainnet", // 'testnet' or 'development', 'mainnet' or 'production'
    apiKey: process.env.API_KEY,
})

const protocol = "ETHEREUM";

const address = sdk.chainlink.feeds.MAINNET.ETHEREUM.ADA_USD

const getPricesByAddress = (address) =>
    sdk.chainlink.getPricesByAddress({
        protocol,
        address: address
    })
        .then(console.log)
        .catch(console.log)


// BTC, ETH, ADA
const getPricesByAsset = (asset) => {
    console.log("=========== chainlink ======== ")
    sdk.chainlink.getPrices({
        protocol,
        asset: asset
    })
        .then(console.log)
        .catch(console.log)
}


getPricesByAddress(address)
// getPricesByAddress("0x")
getPricesByAsset("ETH")