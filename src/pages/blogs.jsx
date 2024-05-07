import { useState } from '../react';
import React from "../react"

export default function Blogs() {
  const [text,setText] = useState("This is the content of the article")
  return (
    <Blog>
      <Article text={text}/>
      <button onclick={()=>{
        setText((pre)=>`${pre}\n${pre}`)
      }}>add</button>
    </Blog>);
}
function Blog({children}) {
  return <div className="min-h-screen flex place-items-center place-content-center"><pre>{children}</pre></div>
}
function Article({text}) {
  return (<div>{text}</div>)
}
