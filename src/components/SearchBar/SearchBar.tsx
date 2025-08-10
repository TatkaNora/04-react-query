import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as yup from "yup";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const validationSchema = yup.object().shape({
    query: yup.string().trim().required("Please enter your search query."),
});

export default function SearchBar({ onSubmit }: SearchBarProps) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <Formik
                    initialValues={{ query: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values.query.trim());
                        setSubmitting(false);
                    }}
                >
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.inputContainer}>
                                <Field
                                    className={styles.input}
                                    type="text"
                                    name="query"
                                    autoComplete="off"
                                    placeholder="Search movies..."
                                    autoFocus
                                />
                                <FormikErrorMessage name="query">
                                    {msg => <div className={styles.error}>{msg}</div>}
                                </FormikErrorMessage>
                            </div>
                            <button className={styles.button} type="submit">
                                Search
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </header>
    );
}