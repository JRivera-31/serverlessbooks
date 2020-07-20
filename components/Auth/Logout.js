import Router from "next/router"

export default function logout() {
    return (
        <button onClick={() => Router.push("/api/logout")}>Logout</button>
    )
}