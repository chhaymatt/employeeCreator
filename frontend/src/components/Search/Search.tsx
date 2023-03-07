import styles from "./Search.module.scss";
type SearchProps = {
    onChange: React.ChangeEventHandler;
};

export const Search = ({ onChange }: SearchProps) => {
    return (
        <input
            className={styles.Search}
            type="search"
            onChange={onChange}
            placeholder="Search by first name, last name, email or mobile number..."
        />
    );
};
