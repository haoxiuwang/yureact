let _component = null

function createElement(tag,props,...children) {
  props = props?props:{}
  if(children!=undefined)
  children = children.reduce((arr,item)=>{
    if (Array.isArray(item)) {
      arr = [...arr,...item]
      return arr
    }
    arr.push(item)
    return arr
  },[])

  if(typeof tag == "string")
    return new Element(tag,props,children)

  return new Component(tag,props,children)
}
export default {createElement}
class Component {
  constructor(fn,props,children) {
    this.states = []
    this.state_id = 0
    this.fn = fn
    props.children = children
    this.props = props
    _component = this
    this.child = this.fn(props)
    this.child.parent = this
  }
  render() {
    this.node = this.child instanceof Element||this.child instanceof Component?
    this.child.render():document.createTextNode(this.child)
    return this.node
  }
  refresh() {
    this.state_id = 0
    _component = this
    this.effects = []
    this.effect_id = 0
    this.cleanEffect()
    this.child = this.fn(this.props)
    let _node = this.node
    this.render()
    _node.parentNode.replaceChild(this.node, _node)
    this.effects.forEach(([_fn,_dependency,_update] , i) => {
      if (_update)
        fn.clean = _fn()
    });
    this.effect(this)
  }
  cleanEffect() {
    clean(this.child)
  }

}
function effect(el) {
  if(el instanceof Component){
    el.effects.forEach(([a,b,will_do], i) => {
      will_do&&effect()
    })
    effect(el.child)
    return
  }
  else if(el instanceof Element){
    el.children((item)=>effect(item))
    return
  }
  return
}
function clean(el) {
  if(el instanceof Component){
    el.effects.forEach(({clean}, i) => {
      clean()
    })
    clean(el.child)
  }
  else if(el instanceof Element){
    el.forEach((item, i) => {
      clean(item)
    });
  }
  else return
}

class Element {
  constructor(tag,props,children) {
    this.tag = tag
    this.props = props
    this.children = children
    children.map((child)=>{
      if(child instanceof Element||child instanceof Component)
        child.parent = this
    })
  }
  render(){
    let el = document.createElement(this.tag)
    if(this.props.ref!==undefined)
    this.props.ref.current = el
    const {ref,..._props} = this.props
    Object.assign(el,_props);
    if(this.children.length==0) return el
    let children
    children = this.children.map((child, i) => {
      if(child instanceof Element||child instanceof Component)
      return child.render()
      return document.createTextNode(child)
    })
    .map((child)=>el.appendChild(child))
    return el
  }
}

function useState(init) {
  const _index  = _component.state_id++
  const _state = _component.states[_index]
  _component.states[_index] = _state==undefined?init:_state

  let set = (component,index)=>(new_state)=>{
      const _state = component.states[index]
      new_state = typeof new_state == "function"?new_state(_state):new_state
      if(new_state==_state)return
      component.states[index] = new_state
      component.refresh()
  }
  return [_component.states[_index],set(_component,_index)]
}

function useRef(init) {
  const [value] = useState({current:init})
  return value
}

function useEffect(fn,dependency){
  let _index = _component.effect_id++
  if(_component.effects[_index]==undefined){
    _component.effects[_index] = [fn,dependency,true]
    return
  }
  if (dependency.length<0) return
  const [_fn,_dependency,_update] = _component.effects[_index]
  _component.effects[_index] = [fn,dependency,!light_compare_arr(_dependency,dependency)]
}


function createContext() {
  let Provider = (component)=>({vlaue,children})=>{
    let id = component.contexts_id++
    let context = _component.contexts[id]
    if (context==undefined)
      context = {value,handlers:[]}
    else{
      if(value!=context.value){
        context.value = value
        context.handlers.forEach((fn, i) => {
          fn(value)
        });
      }
    }
    return {children}
  }
  return Provider(_component)
}

function useContext(context) {
  let _node = _component, _context_el = null
  while (true) {
    if(_node instanceof Element)continue
    if (_node.component == context.Provider) {
      _context_el = _node
      break
    }
    _node = _node.parent
  }
  const [value,setValue] = useState(_context_el.props.value)
  _context_el.handlers.push((v)=>{setValue(v)})
  return value
}

function useMemo(fn,dependency){
  let _index = _component.memo_id++
  if(_component.memos[_index]==undefined){
    let result = fn()
    _component.memos[_index] = [result,dependency]
    return result
  }
  const [_result,_dependency] = _component.memos[_index]
  let _i = 0

  if (light_compare_arr(_dependency,dependency)) return _result
  _component.memos[_index] = [fn(),dependency]
  return fn()
}

function light_compare_obj(o1,o2) {
  const arr1 = Object.key(o1)
  const arr2 = Object.ley(o2)
  return !(arr1.filter((k)=> o1[k] !== o2[k]).length>0
  || arr2.filter((k)=> o1[k] !== o2[k]).length>0)
}

function light_compare_arr(arr1,arr2) {
  let l = arr1.length,i = 0
  while (i < l) {
    if(arr1[i]!==arr2[i])
    return false
    i++
  }
  return true
}
function memo(Com,coparison) {
  const fn = (component)=>(_props)=>{
    let _id = component._memos_id++
    let _cache = component._memos[_id]
    if(_cache==undefined){
      let [props,node] = component._memos[_id] = [props,<Com {...{props}}/>]
      return node
    }
    let [props,node] = _cache
    if(comparison){
      if(comparison(props,_props))
      return node
    }
    if(light_compare_obj(props,_props))
    return node
    [props,node] = component._memos[_id] = [props,<Com {...{props}}/>]
    return node
  }
  return fn(_component)
}
function useCallback(fn,dependency) {
  let _index = _component.callback_id++
  if(_component.callbacks[_index]==undefined){

    _component.callbacks[_index] = [fn,dependency]
    return result
  }
  const [_fn,_dependency] = _component.callbacks[_index]
  let _i = 0
  if (light_compare_arr(_dependency,dependency)) return _fn
  _component.callbacks[_index] = [fn,dependency]
  return fn
}
export {useState, useRef, useEffect, useCallback, useContext, useMemo, memo}
