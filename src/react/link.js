function Link({href,children}) {
  if(children.length==1&&children[0] instanceof Element)
  return (<a onClick={(e
  )=>{
    e.preventDefault()
    push(href)
  }} href={href}>{children}</a>)
}

export default Link
