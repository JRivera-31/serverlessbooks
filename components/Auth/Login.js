import Router from "next/router"
import { Container, Button } from "semantic-ui-react"
import styles from "../../styles/login.module.css"

const Login = () => {
    return (
        <div className={styles.background}>
            <Container textAlign="center">
                <img className={styles.book} src="/images/books.png"></img>
                <p className={styles.text}>Please login or signup to continue</p>
                <Button positive onClick={() => Router.push("/api/login")}>Login/Sign Up</Button>
            </Container>
        </div>
    )
}

export default Login 