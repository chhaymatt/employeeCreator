import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../services/EmployeeAPI";
import styles from "./InlineButtons.module.scss";

type InlineButtonProps = {
    id: number;
    setError: (error: string) => void;
};

const InlineButtons = ({ id, setError }: InlineButtonProps) => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation((id: number) => deleteEmployee(id), {
        onSuccess: (response: boolean) => {
            // Invalidate and refetch
            queryClient.invalidateQueries("employees");
        },
        onError: (error: AxiosError) => {
            setError(error.message);
        },
    });

    return (
        <section className={styles.InlineButtons}>
            <Link
                className={styles.InlineButtons__Link}
                to={`/employees/${id}`}
            >
                <button className={styles.InlineButtons__Button} name="Edit">
                    Edit
                </button>
            </Link>
            <span className={styles.InlineButtons__Divider}>|</span>
            <button
                onClick={() => deleteMutation.mutate(id)}
                className={styles.InlineButtons__Button}
                name="Remove"
            >
                Remove
            </button>
        </section>
    );
};

export default InlineButtons;
