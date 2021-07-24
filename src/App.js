import  React, { useState, useEffect }  from   "react";
import './App.css'; 
import { v4  as uuidv4 } from   'uuid';
import  randomcolor, { randomColor } from 'randomcolor';
import Draggable from   'react-draggable' ;  
import { update } from "lodash";



   function   App () {


const  [ item , setItem] = useState ("")
 const [items , setItems] =useState(
 JSON.parse(localStorage.getItem("items")) || []
)

useEffect( () =>{
    localStorage.setItem("items", JSON.stringify(items))
      },     [items])


const newitem =() =>{
  if (item.trim() !== "" ) {
    const newitem ={
      id: uuidv4 (),
       item,
      color: randomColor ( {
        luminosity: "light",

      }),
      defaultPos: {
        x: 500,
        y: -500,


      }
    }
    setItems((items)  =>[...items, newitem]  )
    setItem ( "" )
  } else {
    alert( "Enter somthing..." )
    setItem ( " " )
  }
}

  const  deleteNode =(id) =>{
     setItems (items.filter( (item) => item.id !==id) )
  }
  


const updatePos =(data,  index) =>{
let newArray = [...items]
newArray [index].defaultPos = {
  x: data.x, y: data.y}
  setItems(newArray)

}

const keyPress =(e) =>{
  const code = e.keyCode ||  e.which
if ( code ===13 ){
  newitem() 
}

}


return(
 
   <div className="App">
     <div className= "wrapper">
       <input 
       value={item}
       type="text" 
       placeholder="Enter Something..."
       onChange={ ( e) => setItem (e.target.value)}
       onKeyPress={ (e ) => keyPress(e)}
       />
       <button 

       className="enter"
       onClick={ newitem  }
       
       >ENTER
       </button>
     </div>

{
  items.map( (item, index) =>{
return (
  <Draggable
  key={index}
  defaultPosition={item.defaultPos}
  onStop={(e, data ) =>{
      updatePos( data,  index )
  }}
  
  >
  
<div className="todo_item" style={{ backgroundColor:  item.color  }} >
  ( )`$ {item.item }`)
<button className="delete"
onClick={ () =>deleteNode(item.id)}

>
  X
  </button>
</div>
  



</Draggable>
)

  } )
}


   </div>
   )
 }

//  const cors = require('cors')

//  app.use(cors())





  





  
    
export default App;