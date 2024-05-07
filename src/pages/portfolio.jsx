import { useState,useRef } from '../react';
import React from "../react"

export default function Portfolio() {

  const [index,setIndex] = useState(0)


  return(
    <div className="space-y-4">
      <Text />
      <div className="flex space-x-4">
        {[10,1,22,4,85,60,7].map((number,i)=>{
          return (<button onclick={()=>setIndex(i)} className={`border-2 border-solid border-slate-100 rounded ${index==i?"bg-slate-100":""}`}>{number}</button>)
        })}
      </div>
    </div>
  )
}

function Text() {
  const [text,setText] = useState("")
  const ref = useRef(null)
  return(
    <div className="">
      <input className="border-2 border-solid border-slate-100" autofocus ref={ref} defaultValue={text} oninput={(e)=>{
        setText(ref.current.value)
      }}/>
      <div className="py-24 flex place-items-center place-content-center bg-slate-100">{text}</div>
    </div>
  )
}
