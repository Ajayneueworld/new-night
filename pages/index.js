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
  const { data, error } = useSWR(`/api/users/${id}`, fetcher)

  return {
    userdata: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useGetnftdata () {
 
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/nfts/`, fetcher)

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
  const router = useRouter()
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


const voteByholder = async (props) =>{

  let voted = data.votingHistory

  // checking if user has already voted for the NFT
  if(voted.includes(props._id)){
      alert("already voted")
      return
    }

  let msg = `You are voting for ${props.name}`
  console.log("The message is : ",msg)

    // requesting for signature
  let sign = await web3.eth.personal.sign(msg,accounts)
  console.log(sign)

  // updating the non voted nft
  let req = await fetch(`/api/nfts/vote/voteByholders/${props._id}`,{
  method : 'PUT',
  headers : {
    "Content-Type" : "application/json"
  },
  })

if(req.ok){
  console.log("pushing address is : ",data._id)
  let val = {
    "votingHistory" : data._id
  }
  let request = await fetch(`api/users/${accounts}`,{
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

const voteByNonholder = async (props,data) =>{
  console.log("voted by non holders")
    let voted = data.votingHistory

  // checking if user has already voted for the NFT
  if(voted.includes(props._id)){
      alert("already voted")
      return
    }

    // showing user the message
  let msg = `You are voting for ${props.name}`
  console.log("The message is : ",msg)

    // requesting for signature
  let sign = await web3.eth.personal.sign(msg,accounts)
  console.log(sign)

  // updating the non voted nft
  let req = await fetch(`/api/nfts/vote/voteByNonholders/${props._id}`,{
  method : 'PUT',
  headers : {
    "Content-Type" : "application/json"
  },
})

    if(req.ok){
      console.log("pushing address is : ",data._id)
      let val = {
        "votingHistory" : data._id
      }
      let request = await fetch(`api/users/${accounts}`,{
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


const vote = async(props) =>{


  // get user data from database
  console.log(props)
  let data;
  if(userdata !== undefined && userdata.success){
    data = userdata.data
  }

  // getting holding token data from icytools api 
  let holdTokens = await fetch(`/api/trending/${accounts}`)
  holdTokens = await holdTokens.json()

  let hold = false

    if(holdTokens.data.wallet !== null){
      holdTokens.data.wallet.tokens.edges.map((curr) => {
        if(props.symbol === curr.node.contract.symbol){
          hold = true
          console.log("symbol is : ",props.symbol)
        }
      })
    }

    if(hold){
      console.log("holder of this Nft")
      voteByholder(props,data)
    }else{
      console.log("not holding it ")
      voteByNonholder(props,data)
    }

    // getting voted nft by the user
  let voted = data.votingHistory

  // checking if user has already voted for the NFT
  if(voted.includes(props._id)){
      alert("already voted")
      return
    }


    // if vote is successful, pushing this address into users votingHistory
    // if(req.ok){
    //   console.log("pushing address is : ",props._id)
    //   let val = {
    //     "votingHistory" : props._id
    //   }
    //   let request = await fetch(`api/users/${account}`,{
    //     method : 'PUT',
    //     headers : {
    //       "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify(val)
    //   })
    // }
    // else{
    //   console.log("cannot vote")
    // }
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
              <p className="card-title">Current votes by Holders {curr.voteByholders}</p>
              <p className="card-title">Current votes by Non - Holders {curr.voteByNonholders}</p>
              <p className="card-title">Total votes  { curr.voteByholders + curr.voteByNonholders }</p>
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