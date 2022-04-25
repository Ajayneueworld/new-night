import {useState,useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import useSWR from 'swr'

function useGetnftdata () {
 
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/trending/`, fetcher)

  return {
    nftdata: data,
    isLoadingnft: !error && !data,
    isErrornft: error
  }

}
const App = () =>{

  let {nftdata,isLoadingnft,isErrornft} = useGetnftdata()

  // useEffect(() =>{
  //   fetch('../api/trending/')
  //   .then(res => res.json())
  //   .then(data => setNft(data.data.contracts.edges))
  // },[])

// const task = async (i,address) =>{
//   setTimeout(function(){
//     fetch(`api/nfts/images/${address}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
//   },i*500)
// }


  console.log("The nfts are : ",nftdata)
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
  else {
  return( 
    
  <div className="container">
  <div className="row text-center">
    {
      nftdata.data.map(curr =>{
        return(
          <div className="card" style={{width: "22rem"}} key = {`${curr.name}`}>
		          {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
		          <div className="card-body">
		          <h5 className="card-title">{curr.name}</h5>
              <p className="card-title">{curr.symbol}</p>
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
export default App;
