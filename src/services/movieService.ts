import axios from "axios";
import { Movie } from "../types/movie";
import { toast } from "react-hot-toast";

export interface MovieSearchResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}


const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string, page: number): Promise<MovieSearchResponse | null> {
    const token = import.meta.env.VITE_API_MOVIE_TOKEN;
    if (!token) {
        toast.error("API token is missing. Check your .env file.");
        return null;
    }

    try {
        const response = await axios.get<MovieSearchResponse>(API_URL, {
            params: { query, page },
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.results.length == 0) {
            toast.error("No movies found for this search query.");
        }
        return response.data;
    } catch {
        toast.error("Failed to fetch movies. Please try again.");
        return null;
    }
}