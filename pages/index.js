import Head from 'next/head'
import Login from "../components/Auth/Login"
import Logout from "../components/Auth/Logout"

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
        <title></title>
      </Head>
      <Logout />
      <div>You're logged in!</div>
    </div>
  )
}

export default withApollo()(Index)