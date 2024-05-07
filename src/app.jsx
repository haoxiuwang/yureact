import About from "./pages/about.jsx"
import Blogs from "./pages/blogs.jsx"
import Index from "./pages/index.jsx"
import Portfolio from "./pages/portfolio.jsx"

import React from './react'
import {useState} from "./react"
export default function App(){
  const [show,setShow] = useState(0)
  console.log({show});
  return (
    <div>
        <div className="flex space-x-4 place-items-center place-content-center p-4">
          {[
            "Index","Blogs","About","Portfolio"
          ].map((title,i)=>(<Link {...{title,setShow,show:i}}/>))}

        </div>
        {
          (()=>{
            switch (show) {
              case 0:
                return <Index />;
              case 1:
                return <Blogs />;
              case 2:
                return <About />;
              case 3:
                return <Portfolio />;

            }
          })()
        }
    </div>
  )
}

function Link({title,setShow,show}) {
  return (
    <button id={`_${show}`} className='py-2 px-8 bg-slate-100 rounded' onclick={()=>{
      console.log("---");
      setShow(show)
    }}>{title}</button>
  )
}
