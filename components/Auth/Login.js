import Router from "next/router"

const Login = () => {
    return (
        <button onClick={() => Router.push("/api/login")}>Login!</button>
    )
}

export default Login 