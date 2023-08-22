
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

  const host="http://localhost:5000"
 // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTE3NjE4YTVkYTQyNWE3MTZkMjI0In0sImlhdCI6MTY5MDE3OTQ1Nn0.cplraX-pwcq65QrswZb01FxyW39Xc6TDne76UrZvUYg"

    const notesInitial = []

      const [notes, setNotes] = useState(notesInitial)

       //GET NOTE
       const getNotes=async()=>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTE3NjE4YTVkYTQyNWE3MTZkMjI0In0sImlhdCI6MTY5MDE3OTQ1Nn0.cplraX-pwcq65QrswZb01FxyW39Xc6TDne76UrZvUYg"
        
          },
    
        });
        const json=await response.json()
        console.log(json)
        setNotes(json)

      //  const note={
      //     "_id": "61322f19553781a8ca888d0e08",
      //     "user": "6131dc5e3e4037cd4734a066",
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //     "date": "2021-09-03T14:20:09.668Z",
      //     "__v": 0
      //   }
      //   setNotes(notes.concat(note))
       }



      //ADD NOTE
       const addNote=async(title,description,tag)=>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
 
          },
         
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
       
     
        const  note=await response.json();
        setNotes(notes.concat(note))
       }

      //DELETE NOTE
      const deleteNote=async(id)=>{
          //TODO: API CALL
   
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
              },
          
          });
          const json=response.json()
          console.log(json)

       const newNotes=notes.filter((note)=>{return note._id!==id})
       setNotes(newNotes)
      }

      //EDIT NOTE
      const editNote=async(id,title,description,tag)=>{
         //API CALL 
       
         const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
            
          },
         
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json=await response.json()
        console.log(json)


        let newNotes=JSON.parse(JSON.stringify(notes))

         //login to edit client
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description
            newNotes[index].tag=tag
            break;
          }
         
         }
         setNotes(newNotes)
      }
    
    return (
        <NoteContext.Provider value={{notes, setNotes,getNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;