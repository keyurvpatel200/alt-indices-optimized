import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteScrollWithAPI = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = async () => {
    const limit = 10
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
    const data = await res.json()

    // If no more data, stop fetching
    if (data.length === 0) {
      setHasMore(false)
      return
    }

    setPosts(prev => [...prev, ...data])
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h2>Infinite Scroll from Dummy API</h2>
      <InfiniteScroll
        dataLength={ posts.length }
        next={ fetchPosts }
        hasMore={ hasMore }
        loader={ <h4>Loading more posts...</h4> }
        endMessage={ <p style={ { textAlign: 'center' } }><b>No more posts</b></p> }
      >
        {posts.map(post => (
          <div key={ post.id } style={ { padding: 12, border: '1px solid #ddd', margin: '10px 0' } }>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default InfiniteScrollWithAPI
