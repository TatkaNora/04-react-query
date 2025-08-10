import axios from "axios";
import { Movie } from "../types/movie";
import toast from "react-hot-toast";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesResponse {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) {
        toast.error("Please enter your search query.");
        return [];
    }

    const token = import.meta.env.VITE_API_MOVIE_TOKEN;
    if (!token) {
        toast.error("API token is missing. Check your .env file.");
        return [];
    }

    try {
        const response = await axios.get<FetchMoviesResponse>(API_URL, {
            params: { query },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.results;
    } catch {
        toast.error("Failed to fetch movies. Please try again.");
        return [];
    }
}

