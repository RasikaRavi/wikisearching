import { useState } from "react";

function UrlValidator(){

    const [result, setResult] = useState({})
    async function fetchData(val) {
        const searchValue = val.trim().toLowerCase();
        if (searchValue.length > 0) {
            const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchValue}`;
            const response = await fetch(api);
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return await response.json();
        }
    }
    async function handleSearch(e) {
        const { value } = e.target;
        setResult({ result: await fetchData(value) })
        console.log(result)
    }
    
   return(
    <div>
        <h1> Wiki Search</h1>
       <div>
        
        </div>
    <input type="text"  className="search" onKeyUp={handleSearch} />
    <ul>
        {result.result && result.result.query.search.map((data,i )=>{
             let url =`https://en.wikipedia.org/wiki/${data.title}`;
             return(<div >
                <center>
                <table style={{width:"400px"}}>
                <tr style={{backgroundColor:'#ADD8E6',height:"40px"}}>  <a  style={{textDecoration:'none',color:'black',padding:'20px',}}href={url}>{data.title}</a><br></br> </tr>
               </table>
                </center>
               
                </div> )
            } )}
    </ul>
    </div>
   )
}
export default UrlValidator