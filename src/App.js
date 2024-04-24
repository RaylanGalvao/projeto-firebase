import { useState } from "react";
import { db } from "./firebaseconection";
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'

import './app.css'

function App() {

  const [titulo, setTitulo] = useState()
  const [autor, setAutor] = useState()

  const [posts, setPosts] = useState([])

  async function handleAdd(){
  //   await setDoc(doc(db, "posts", "12345"),{
  //     titulo: titulo,
  //     autor: autor,
  //   })
  //   .then(()=>{
  //     console.log("dados registrados no banco")
  //   })
  //   .catch((error)=>{
  //     console.log("gerou erro"+ error)
  //   })

      await addDoc(collection(db, "posts"),{
        titulo: titulo,
        autor: autor,
      })
      .then(()=>{
        console.log("CADASTRADO COM SUCESSO")
        setAutor("")
        setTitulo("")
      })
      .catch((error)=>{
        console.log("ERRO"+error)
      })
  }


  async function buscarPosts(){
    // const postRef = doc(db, "posts", "5tWZLGqVzpTaJnJ4CNN9")
    // await getDoc(postRef)
    // .then((snapshot)=>{
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(()=>{
    //   console.log("Erro ao buscar")
    // })
    const postRef = collection(db, "posts")
    await getDocs(postRef)
    .then((snapshot)=>{
      let lista = []
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      setPosts(lista)
    })
    .catch((error)=>{
      console.log("Deu algum erro ao buscar")
    })
  }


  return (
    <div>
      <h1>ReactJS + firebase :)</h1>

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
      <button onClick={buscarPosts}>Buscar posts</button>

      <ul>
        {posts.map((post)=>{
          return (
            <li key={post.id}>
              <span>titulo: {post.titulo} </span><br/>
              <span>autor: {post.autor} </span><br/><br/>
            </li>
          )
        })}
      </ul>
      </div>
    </div>
  )
}

export default App;
