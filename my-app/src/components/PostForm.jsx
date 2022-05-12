import React, {useState} from 'react'
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

function PostForm({ create }) {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create={newPost}
    setPost([...post, newPost]);
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(event) => setPost(event.target.value)}
        type="text"
        placeholder="Название поста"
      />

      <MyInput
        value={post.body}
        onChange={(event) => setPost(event.target.value)}
        type="text"
        placeholder="Описание поста"
      />

      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
}

export default PostForm