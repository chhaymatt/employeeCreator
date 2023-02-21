import styles from "./Footer.module.scss"

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.Footer}>
            <a
                target="_blank"
                className={styles.Footer__Link}
                rel="noreferrer"
                href="https://matthewchhay.com/"
            >{`${year} | Made by Matthew Chhay`}</a>
        </footer>
    )
}

export default Footer
