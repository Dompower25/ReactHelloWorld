import React, { useMemo, useState } from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 't' },
    { id: 2, title: 'CSS', body: 'z' },
    { id: 3, title: 'THML', body: 'f' },
  ])

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');





  const sortedPosts = useMemo(() => {
    console.log("вызвана функция поиска или сортировки")
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }, [selectedSort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
   return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedPosts]);



  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    }
    setPosts([...posts, newPost])
    setTitle('')
    setBody('')
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);

  }

  return (
    <div className="App">
      <form>
        <MyInput
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="Название поста" />

        <MyInput
          value={body}
          onChange={event => setBody(event.target.value)}
          type="text"
          placeholder="Описание поста" />

        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <div>
        <hr style={{ margin: '15px 0' }} />
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
        />
        <MySelect
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
          defaultValue={'Сортировка'}
          value={selectedSort}
          onChange={sortPosts}
        />
      </div>
      {posts.length !== 0
        ?
        <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS" />
        :
        <div>
          <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
        </div>
      }


    </div>
  )
}

export default App;