import Router from "next/router"
import { Button } from "semantic-ui-react"

export default function logout() {
    return (
        <Button negative onClick={() => Router.push("/api/logout")}>Logout</Button>
    )
}