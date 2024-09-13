import { useState, useEffect } from "react"
import { fetchData } from "../api/apiService"

export default function RandomQuoteMachine() {

  const [quote, setQuote] = useState(null)
  const [author, setAuthor] = useState(null)
  const [error, setError] = useState(null)
  const [key, setKey] = useState(0)

  const getNewQuote = () => {
    const endpoint = "https://api.quotable.io/random"

    fetchData(endpoint)
      .then(responseData => {
        
        setQuote(responseData.content); 
        setAuthor(responseData.author);
        setKey(prevKey => prevKey + 1)  
      })
      .catch(err => setError(err.message));
  }

  useEffect(() => {
    getNewQuote()
  }, [])

  if (error) {
    return console.log(error);
    
  }

  if (!quote) {
    return ;
    
  }

  return (
    <div className="flex h-screen justify-center items-center">
        <div key={key} className="flex flex-col justify-between w-full mx-5 md:w-1/2 h-auto p-5 bg-slate-300 rounded-md transition-opacity duration-500 ease-in-out" id="quote-box">
            <blockquote id="text" className="font-bold text-3xl text-center text-red-500 mx-auto">{JSON.stringify(quote, null, 2)}</blockquote>
            <span id="author" className="ml-auto p-5">{author}</span>
            <div className="flex justify-between w-full">

                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" — ${author}`)}`} target="_blank" className=" text-white w-fit bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800" id="tweet-quote">X</a>

                <button id="new-quote" className=" text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={getNewQuote}>Click me</button>                
            </div>

        </div>
    </div>
  )
}
