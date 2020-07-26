import Head from 'next/head'
import Login from "../components/Auth/Login"
import Logout from "../components/Auth/Logout"
import { Header } from "semantic-ui-react"
import styles from "../styles/index.module.css"

import { withApollo } from "../lib/withApollo"
import { useFetchUser } from "../lib/user"
 
const Index = () => {
  const { user, loading } = useFetchUser()
  if (loading) {
    return <div>Loading...</div>
  }
  if (!loading && !user) {
    return <Login />
  }

  return (
    <div>
      <Head>
        <title>Books</title>
      </Head>
      <Header as="h3" block>
          Books
          <img className={styles.book} src="/images/books.png"></img>
          <Logout className={styles.logoutButton} />
      </Header>
      
    </div>
  )
}

export default withApollo()(Index)