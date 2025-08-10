import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import { Movie } from "../../types/movie";
import { PLACEHOLDERS } from "../../assets/placeholders";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) onClose();
    };

    const imageUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : PLACEHOLDERS.BACKDROP;

    return createPortal(
        <div
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    aria-label="Close modal"
                    onClick={onClose}
                >
                    &times;
                </button>
                <img src={imageUrl} alt={movie.title} className={styles.image} />
                <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview || "No overview available."}</p>
                    <p>
                        <strong>Release Date:</strong>{" "}
                        {movie.release_date || "Unknown"}
                    </p>
                    <p>
                        <strong>Rating:</strong>{" "}
                        {movie.vote_average ? `${movie.vote_average}/10` : "N/A"}
                    </p>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
