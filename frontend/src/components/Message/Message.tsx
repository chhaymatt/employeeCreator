import styles from "./Message.module.scss";

type MessageProps = {
    type?: "loading" | "success" | "error" | "warning";
    children: string;
};

const Message = ({ type, children }: MessageProps) => {
    let className = styles.Message;
    if (type === "loading") {
        className += ` ${styles.Message__Loading}`;
    } else if (type === "success") {
        className += ` ${styles.Message__Success}`;
    } else if (type === "error") {
        className += ` ${styles.Message__Error}`;
    } else if (type === "warning") {
        className += ` ${styles.Message__Warning}`;
    }
    return <div className={className}>{children}</div>;
};

export default Message;
