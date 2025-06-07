import { toast } from 'react-toastify';

export const handleApiError = (error, fallbackMessage = 'Something went wrong.') => {
    if (!error) return;

    // Handle RTK Query or Axios-like errors with HTTP status
    if (error.status) {
        const status = error.status;

        if (status === 429) {
            toast.warn("🚫 Too many requests. You've hit the rate limit.");
        } else if (status >= 500) {
            toast.error('💥 Server error. Please try again later.');
        } else if (status === 404) {
            toast.error('❓ Resource not found (404).');
        } else if (status === 401 || status === 403) {
            toast.error('🔒 Unauthorized or forbidden. Please check your access.');
        } else if (status >= 400) {
            toast.error(`⚠️ Client error (${status}).`);
        } else {
            toast.error(fallbackMessage);
        }
        return;
    }

    // Handle Fetch/network errors
    if (error.message?.includes('Failed to fetch')) {
        toast.error('🌐 Network error. Please check your internet connection.');
        return;
    }

    // Generic JS error (fallback)
    if (error instanceof Error) {
        toast.error(`❌ ${error.message}`);
        return;
    }

    // Last fallback
    toast.error(fallbackMessage);
};
