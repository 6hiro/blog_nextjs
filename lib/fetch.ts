import fetch from 'node-fetch'

// export const getAllPostsData = async () => {
//   const res = await fetch(
//     new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/`)
//   )
//   const posts = await res.json()
//   return posts
// }

// pagenationのために、
export const getPostsCount = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/page`)
  )
  const counts = await res.json()
  return counts.map((count) => {
    return {
      params: {
        page: String(count.page),
      },
    }
  })
}
export const getPaginatedPostsData = async (id: string) => {
  if(id==="1"){
    const res = await fetch(
      new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/`)
    )
    const posts = await res.json()
    return posts
  }else{
    const res = await fetch(
      new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/?page=${id}`)
    )
    const posts = await res.json()
    return posts
  }
}
export const getAllPostIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post-ids/`)
  )
  const posts = await res.json()
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}
// Post detail
export const getPostData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/${id}/`)
  )
  const post = await res.json()
  return post
}
// Categorty
export const getAllCategoryIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/categories/`)
  )
  const categories = await res.json()
  return categories.map((category) => {
    return {
      params: {
        category: String(category.name),
      },
    }
  })
}
export const getAllCategories = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/categories/`)
  )
  const categories = await res.json()
  return categories
}
export const getAllCategoriesData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/category/${id}/`)
  )
  const posts = await res.json()
  return posts
}
// tag
export const getAllTagIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/tags/`)
  )
  const tags = await res.json()
  return tags.map((tag) => {
    return {
      params: {
        tag: String(tag.name),
      },
    }
  })
}
export const getAllTags = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/tags/`)
  )
  const tags = await res.json()
  return tags
}
export const getAllTagsData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/post/tag/${id}/`)
  )
  const posts = await res.json()
  return posts
}
