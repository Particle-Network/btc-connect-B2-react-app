<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/P391e8h.png" />
  </a>
</div>

# Particle Network BTC Connect B² Demo— React

⚡️ Demo application showcasing the implementation of Particle Network's BTC Connect product to facilitate ERC-4337 Account Abstraction (through native Bitcoin wallets) on B², a ZK-Rollup for Bitcoin boasting quick transaction speeds, low fees, and, of course, data settlement on Bitcoin.

## Project description

This demo allows a user to connect a Bitcoin native wallet to the app and transfer BTC to an address via both the B² and Bitcoin network using the native Bitcoin wallet as the only interaction point. 

This project is built using the following: 

- React native using `npx create-react-app`
- JavaScript
- Tailwind CSS
- Particle Network's [BTC Connect](https://developers.particle.network/docs/btc-connect)
- ethers.js V6.x.x

> Note that the project is inside the `btc-connect-b2` directory.

Follow the [Quickstart](#quickstart) instructions to spin up the project, or follow the [project setup instructions](#create-a-react-project-from-scratch) to configure the React project from scratch. 

## ₿ BTC Connect
BTC Connect takes advantage of ERC-4337 alongside (Bitcoin) Layer-2 EVM-compatible blockchains to leverage a Smart Account, Paymaster, and Bundler natively within Bitcoin wallets (connected to through a Bitcoin-specific modal also provided by BTC Connect). At its core, BTC Connect enables existing BTC wallets to control smart accounts on Layer-2s.

![](https://i.imgur.com/7bZ3dGw.png)

## Deploy with Vercel

<p align="center">
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsoos3d%2Fbtc-connect-B2-react-app%2Ftree%2Fmain%2Fbtc-connect-b2&env=REACT_APP_APP_ID,REACT_APP_PROJECT_ID,REACT_APP_CLIENT_KEY&demo-title=Particle%20Network-B%5E2-BTC%20Connect%20demo&demo-url=https%3A%2F%2Fbtc-connect-b2-react-app.vercel.app%2F"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
</p>

##

👉 Try the demo: [Particle Network-B^2 BTC Connect demo](Particle Network-B^2 BTC Connect demo)

👉 Learn more about Particle Network: https://particle.network

## Quickstart

### Clone this repository
```
git clone https://github.com/soos3d/btc-connect-B2-react-app.git
```

### Access the React app project

```sh
cd btc-connect-b2
```

### Install dependencies
```sh
yarn install
```
Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```
npm run start
```
OR
```
yarn start
```

## Create a React project from scratch

You can follow these instructions if you want to configure the React project from zero.

### Create a React project

```sh
npx create-react-app 
```

```sh
cd particle-network-project
```

## Install Tailwind CSS

This step is optional; follow it only if you want to use Tailwind CSS for the styling.

Follow the instructions in the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/create-react-app).

## Fix Node JS polyfills issues

You will run into issues when building when using `create-react-app` versions 5 and above. This is because the latest versions of `create-react-app` do not include NodeJS polyfills.

Use `react-app-rewired` and install the missing modules to fix this.

If you are using Yarn

```sh
yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

If you are using NPM

```sh
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

Then Create a `config-overrides.js` in the root of your project directory and add the following:

```js
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
 })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
 process: 'process/browser',
 Buffer: ['buffer', 'Buffer']
 })
 ])
    return config;
}
```

In `package.json` replace the starting scripts with the following:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

Opional, add this to `config-overrides.js` if you want to hide the warnings created by the console:

```js
config.ignoreWarnings = [/Failed to parse source map/];
```

## Install Particle Network's BTC Connect and ethers

Now you can install BTC Connect and ethers.js:

```sh 
yarn add @particle-network/btc-connectkit ethers
```

or

```sh
npm install @particle-network/btc-connectkit
```

> Learn more about the [BTC Connect SDK](https://developers.particle.network/reference/btc-connect-web) on the Particle Network's docs.