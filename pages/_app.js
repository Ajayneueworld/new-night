import '../styles/globals.css'
import {useEffect, useState} from "react"
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink';
import Web3Modal from "web3modal";
import { useRouter} from 'next/router';
import useSWR from 'swr'


function MyApp({ Component, pageProps}) {
  const router = useRouter()
  let [accounts,setAccounts] = useState(null)
  let [web3,setWeb3] = useState(null)
  let [userdata,setData] = useState(null)
  let [nftdata,setnftData] = useState(null)
  
  // setnftData(data)
  // wallet instances
  const connectWallet = async() =>{

    const providerOptions = {
      walletlink: {
        package: WalletLink, // Required
        options: {
          appName: "Ministry Of Design", // Required
          infuraId: "21c564a34a9447a3bf84ebd0f77fe032", // Required unless you provide a JSON RPC url; see `rpc` below
          chainId: 1, // Optional. It defaults to 1 if not provided
          appLogoUrl: 'https://ibb.co/7KnTqT5', // Optional. Application logo image URL. favicon is used if unspecified
          darkMode: true // Optional. Use dark theme, defaults to false
        }
      },
  
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "21c564a34a9447a3bf84ebd0f77fe032" // required
        }
      },
  
    }
  
    const web3Modal = new Web3Modal({
      getInjectedProvider : true,
      cacheProvider: false, // optional
      theme : "dark",
      providerOptions // required
    });

    await web3Modal.clearCachedProvider()
  
    let provider = await web3Modal.connect();
    let w3 = new Web3(provider)
    // setWeb3(w3)

    let account = await w3.eth.getAccounts()
    account = account[0]
    const req = await fetch(`../api/users/${account}`,{
      method : 'GET',
      headers : {
        "Content-Type" : "application/json"
      }
    })

    if(req.ok){

      let {data} = await req.json()
      setData(data)

    }

    else{

      let user = {
        "address" : account,
        "votingHistory" : []
      }

      let request = await fetch(`api/users/`,{
        method : 'POST',
        headers : {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body : JSON.stringify(user)
      })
      router.push("/")
        if(request.ok){
              console.log("user create successfully")
        }
        else{
              console.log("user cannot be created")
        }
    }
    setWeb3(w3)

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand mb-0 h4" href="#">NightWing</a>
      <div className="container">
      <div className="row">
        <div className="col-md-12 bg-light text-right">
            <button type="button" className="btn btn-primary float-right" onClick = {connectWallet}>Connect</button>
        </div>
    </div>
      </div>
    </nav>

    <br/>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul>
      <Link href = "/">
      <a className="navbar-brand mb-0 h1">Discover</a>
      </Link></ul>
    <ul>
      <Link href = "/trending">
      <a className="navbar-brand mb-0 h1">Trending</a>
      </Link></ul>
    {/* <ul>
      <Link href = "/userVotingHistory">
      <a className="navbar-brand mb-0 h1">Voted</a>
      </Link>
      </ul> */}
  </nav>
  <br/>
        <Component {...pageProps}
        web3 = {web3}
        />
        </>
  );
  
}

export default MyApp

// MyApp.getInitialProps = async() =>{
//   console.log("_app")
//   let response = await fetch('http://localhost:3000//api/nfts/',{
//     method : 'GET',
//     headers : {
//       "Content-Type" : "application/json"
//     },
//     body : JSON.stringify()
//   })
//       const {data} = await response.json()
//       return {data : data}
// }