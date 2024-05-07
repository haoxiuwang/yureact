import React from "./index"
import {useState, useEffect} from "./index"
function useRouter() {
  const [update,setUpdate] = useState(false)
  useEffect(()=>{
    const handler = (event) => {
      setUpdate(!update)
    }
    window.addEventListener('popstate', handler);
    return ()=>{
      window.removeEventListener('popstate', handler);
    }
  },[])
  const {hash,pathname,reload,replace,search} = location
  let query = search.length?{}:queryStringToObject()
  return {push,hash,pathname,reload,replace,search,query}
}
function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString);
  const queryObject = {};

  for (const [key, value] of params.entries()) {
    queryObject[key] = value;
  }

  return queryObject;
}

function push(href) {
    const popStateEvent = new window.PopStateEvent('popstate');
    window.history.pushState(null,"",href)
    window.dispatchEvent(popStateEvent);
}


export default useRouter
