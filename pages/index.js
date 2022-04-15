import {useEffect,useState,createRef,useRef} from "react";
import connectDB from "../middleware/connectdb";
import { useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink';
import Web3Modal from "web3modal";
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

function useGetuserdata (id) {
 
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`../api/users/${id}`, fetcher)

  return {
    userdata: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useGetnftdata () {
 
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`../api/nfts/`, fetcher)

  return {
    nftdata: data,
    isLoadingnft: !error && !data,
    isErrornft: error
  }

}

const App = ({web3}) =>{
  // hook to keep track of account
  let [accounts,setAccounts] = useState(null)
  let [state,setState] = useState(true)
  let [currentvote,setCurrentVote] = useState(null)

  let {nftdata,isLoadingnft,isErrornft} = useGetnftdata()
  let {userdata,isLoading,isError} = useGetuserdata(accounts)
  
  if(userdata){
    console.log("userdata is : ",userdata)
  }
  else if(isLoading){
    console.log("still loading")
  }
  else{
    console.log("oh ! got the error")
  }
  const router = useRouter()
  
  const setAccount = async() =>{
      let account = await web3.eth.getAccounts()
      account = account[0]
      setAccounts(account)
  }

  useEffect(() =>{
    if(web3 !== null){
        setAccount()
    }
  })

  const fetcher = (...args) => fetch(...args).then(res => res.json())
 
  const {data,error} = useSWR(`../api/nfts/`,fetcher)


  if(data !== undefined){
    data = data.data
  }

const vote = async(props) =>{
  
  if(web3 === null){
    alert('wallet not connected')
    return
  }
  let data;
  if(userdata !== undefined && userdata.success){
    console.log("you got it right")
    data = userdata.data
  }

  console.log("fetched data is : ",data)
  let account = await web3.eth.getAccounts()
   account = account[0]
  
  //  const request = await fetch(`../api/users/${account}`,{
  //   method : 'GET',
  //   headers : {
  //     "Content-Type" : "application/json"
  //   }
  // })

   //let {data} = await request.json()

    let voted = data.votingHistory
  
    if(voted.includes(props._id)){
      alert("already voted")
      return
    }

    // showing user the message
    let msg = `You are voting for ${props.name}`
    console.log("The message is : ",msg)

    // requesting for signature
    let sign = await web3.eth.personal.sign(msg,account)

    // after sign updating nft vote in DB
    let req = await fetch(`api/nfts/${props._id}`,{
      method : 'PUT',
      headers : {
        "Content-Type" : "application/json"
      }
    })

    // if vote is successful, pushing this address into users votingHistory
    if(req.ok){
      console.log("pushing address is : ",props._id)
      let val = {
        "votingHistory" : props._id
      }
      let request = await fetch(`api/users/${account}`,{
        method : 'PUT',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(val)
      })
    }
    else{
      console.log("cannot vote")
    }
}

// chossing high risk of rendering over other options
  useEffect(() =>{
    if(web3 !== null){
      console.log("button")
       setState(false)
    }
  })

  // nft is loading
  if(isLoadingnft){
    return (
      <p>Loading</p>
    )
  }

  // got error with fetching
  else if(isErrornft){
    return(
      <p>You have got an error</p>
    )
  }

  // showing nfts on the page
  else{
  return(
    <>
  <br/>
  <div className="container">
		<div className="row text-center">
      {
        nftdata.data.map((curr) =>{
          let props = curr;
          return(
	      	  <div className="card" style={{width: "22rem"}} key = {`${curr.name}`}> 
		          <div className="card-body">
		          <h5 className="card-title">{curr.name}</h5>
              <p className="card-title">{curr.symbol}</p>
              <p className="card-title">Current votes {curr.vote}</p>
		          <button className="btn btn-primary stretched-link" disabled = {state} onClick = {() => vote(curr)}>vote</button>
		          <p className="card-text"></p>
		      </div>
	      </div>
          )
        })
      }
		</div>
    </div>
</>
  ) 
    }
}


export default App;

// key ==> LJ5B4ndNU6W9c2qSDOz1g6bsz72zMoD05kf72xnLAlIBqvbCbgP4eqKqqTHT2x4B
// secret key - UkJrVLhzXtmBLuF6SmMInqYJWvSt5YvFM58wB8iWqXhbmXsvv66XBbSbqrnOEMnI
  // const request = async() =>{
  //   try {
  //     const res = await fetch('http://localhost:3000/api/', {
  //         method: 'POST',
  //         headers: {
  //             "Accept": "application/json",
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(userData)
  //     })
  //     router.push("/");
  //     if(res.ok){
  //       console.log("success")
  //     }
  // } catch (error) {
  //     console.log(error);
  // }
  // }

//   address: "0x701a038af4bd0fc9b69a829ddcb2f61185a49568"
// name: "KIWAMI Genesis"
// stats: {totalSales: 84, average: 0.5901975308641976, ceiling: 2, floor: 0.5, volume: 50.926}
// symbol: "KIWAMI"