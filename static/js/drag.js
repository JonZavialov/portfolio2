function dragElement(elmnt,offsetNum,isClass = false) {
  if(!elmnt) return  
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  let indentifier
  if(isClass){
    let windowClassName = elmnt.className.replace(/ .*/,'')
    indentifier = document.getElementsByClassName(windowClassName + "header")[0]
  }else{
    indentifier = document.getElementById(elmnt.id + "header")
  }

  if (indentifier) {
    // if present, the header is where you move the DIV from:
    indentifier.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    if(controlsClicked(e)){
      closeDragElement()
      return
    }
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY 
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = ((elmnt.offsetTop - offsetNum) - pos2  + .1) + "px"
    elmnt.style.left = ((elmnt.offsetLeft - offsetNum) - pos1 + .1) + "px"
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function controlsClicked(e){
    e = e || window.event
    if(e.target.closest('.title-bar-controls')) return true
  }
}