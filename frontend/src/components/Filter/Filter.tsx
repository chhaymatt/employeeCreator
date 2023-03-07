import styles from "./Filter.module.scss";

const capitalise = (str: string) => {
    return (
        str.charAt(0).toUpperCase() +
        str.slice(1).toLowerCase().replace("_", "-")
    );
};

type FilterProps = {
    title: string;
    isActive: boolean;
    onClick: React.MouseEventHandler;
};

export const Filter = ({ title, isActive, onClick }: FilterProps) => {
    return (
        <div
            className={`${styles.Wrapper} ${
                isActive && styles.Wrapper__Active
            }`}
            onClick={onClick}
        >
            <p>{capitalise(title)}</p>
        </div>
    );
};
