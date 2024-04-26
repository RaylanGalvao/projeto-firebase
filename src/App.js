import { useState, useEffect } from "react";
import { db, auth } from "./firebaseconection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import './app.css'

function App() {

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [user, setUser] = useState(false)
  const [ userDetail, setUserDetail] = useState({})

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
        setPosts(listaPost)

      })
    }
    loadPosts()
  }, [])


  async function handleAdd() {
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

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO")
        setAutor("")
        setTitulo("")
      })
      .catch((error) => {
        console.log("ERRO" + error)
      })
  }


  async function buscarPosts() {
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
      .then((snapshot) => {
        let lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
        setPosts(lista)
      })
      .catch((error) => {
        console.log("Deu algum erro ao buscar")
      })
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("post atualizados")
        setIdPost('')
        setTitulo('')
        setAutor('')
      })
      .catch(() => {
        console.log("Erro ao atualizar post")
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
      .then(() => {
        alert("poste deletado com sucesso")
      })
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log("cadastrado com sucesso")
        setEmail('')
        setSenha('')
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert("Senha muito fraca")
        } else if (error.code === 'auth/email-already-in-use') {
          alert("email ja existe")
        }
      })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)

    .then((value)=>{
      console.log("Usuario logado com sucesso")
      console.log(value.user)

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email
      })
      setUser(true)

      setEmail('')
      setSenha('')
    })
    .catch(()=>{
      console.log("erro ao fazer o login")
    })
  }

   async function fazerLogout(){

  }

  return (
    <div>
      <h1>ReactJS + firebase :)</h1>

      {user && (
      <div>
        <strong>Seja bem vindo(a) voce esta logado</strong>
        <span>ID: {userDetail.uid} - Email: {userlDetail.email}</span>
        <button onClick={fazerLogout}>Sair da conta</button>
      <div/>
      )}
      
      <div className="conteiner">
      <h2>Usuarios</h2>
        <labe>Email</labe>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um email"
        /><br />
        <labe>Senha</labe>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        /><br />
        <button onClick={novoUsuario}>Cadastrar</button><br/>
        <button onClick={logarUsuario}>Fazer login</button>
      </div>
      <br /><br />
      <hr />

      <div className="conteiner">
        <h2>POSTS</h2>
        <label>Id do Post</label>
        <input
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        /><br />

        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o tiulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        /><br />

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        /><br />

        <button onClick={handleAdd}>Cadatrar</button><br />
        <button onClick={buscarPosts}>Buscar posts</button><br />

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong><br />
                <span>titulo: {post.titulo} </span><br />
                <span>autor: {post.autor} </span><br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button><br /><br /><br />
              </li>
            )
          })}
        </ul>
         
      </div>
    </div>
  )
}

export default App;
