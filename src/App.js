import { useState } from "react";
import { db } from "./firebaseconection";
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'

import './app.css'

function App() {

  const [titulo, setTitulo] = useState()
  const [autor, setAutor] = useState()

  async function handleAdd(){
    await setDoc(doc(db, "posts", "12345"),{
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      console.log("dados registrados no banco")
    })
    .catch((error)=>{
      console.log("gerou erro"+ error)
    })
  }

  return (
    <div>
      <h1>ReactJS + firebase</h1>

      <div className="conteiner">
      <label>Titulo:</label>
      <textarea 
      type="text"
      placeholder="Digite o tiulo"
      value={titulo}
      onChange={ (e) => setTitulo(e.target.value)}
      />
      <label>Autor:</label>
      <input
      type="text"
      placeholder="Autor do post"
      value={autor}
      onChange={(e) => setAutor(e.target.value)}
      />
      <button onClick={handleAdd}>Cadatrar</button>
      </div>
    </div>
  )
}

export default App;
