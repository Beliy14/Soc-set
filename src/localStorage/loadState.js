const loadState = () => {
  try {
    const postsState = localStorage.getItem("postsState")
    const dataProfileState = localStorage.getItem("dataProfileState")

    const posts = postsState === null ? undefined : JSON.parse(postsState)
    const dataProfile = dataProfileState === null ? undefined : JSON.parse(dataProfileState)

    return {
      posts,
      dataProfile,
    }
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export default loadState
