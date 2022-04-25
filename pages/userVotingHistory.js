import {useRouter} from 'next/router';
import {useEffect,useState,useRef} from 'react';
import useSWR from 'swr'


function useGetuserdata (id) {
 
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`../api/users/${id}`, fetcher)

  console.log("returned data is : ",data)
  console.log("passed account is : ",id)

  return {
    userdata: data,
    isLoading: !error && !data,
    isError: error
  }
}


const VoteApp = ({web3}) =>{
  const router = useRouter()
  let [state,setState] = useState(false)
  let [accounts,setAccounts] = useState(null)
  let nftIds = [];
  let nfts = []
  let [nftData,setNftData] = useState([])
  let {userdata,isLoading,isError} = useGetuserdata(accounts)
  
  const setAccount = async() =>{
    if(web3 !== null){
    let account = await web3.eth.getAccounts()
    account = account[0]
    setAccounts(account)
    }
  }


  // get the user account
  const fetchUserData = async() =>{
    console.log("fetch user")
    // let account = await web3.eth.getAccounts()
    // account = account[0]
    
    // const req = await fetch(`../api/users/${account}`,{
    //   method : 'GET',
    //   headers : {
    //     "Content-Type" : "application/json"
    //   }
    // })

    //  let {data} = await req.json()

    // console.log("The user data is voting : ",data)
    
     userdata.data.votingHistory.map(curr =>{
      console.log("pushing nft ids ")
      nftIds.push(curr)
    })

    for(let i = 0; i < nftIds.length; ++i){
      let res = await fetch(`../api/nfts/${nftIds[i]}`,{
        method : 'GET',
        headers : {
          "Content-Type" : "application/json"
        }
      })
      let {data} = await res.json()
      nfts.push(data)
  }
  setNftData(nfts)

}
console.log(nftData)

// chossing high risk of rendering over other options
useEffect(() =>{
  if(web3 !== null && userdata !== undefined){
    setAccount()
      if(userdata.success && !state){
        fetchUserData()
        setState(true)
  }
}
})

  if(web3 === null){
    return(
      <h1>connect your wallet</h1>
    )
  }
  
  else{
    if(isLoading){
      return(
        <p>Loading</p>
      )
    }
    else if(isError){
      return(
        <p>oops there is an error</p>
      )
    }
    else{
  return(
  <div className="container">
  <div className="row text-center">
    {
        nftData.map(curr =>{
          return(
	      	  <div className="card" style={{width: "22rem"}} key = {`${curr.name}`}>
		          {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
		          <div className="card-body">
		          <h5 className="card-title">{curr.name}</h5>
              <p className="card-title">{curr.symbol} hi</p>
              <p className="card-title">Current votes {curr.vote}</p>
		          <p className="card-text"></p>
		      </div>
	      </div>
          )
        })
    }
  </div>
  </div>
  )
  }
}
}


export default VoteApp;