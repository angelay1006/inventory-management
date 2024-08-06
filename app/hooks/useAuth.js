import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // simulate authentication check (replace w/ real logic)
        const checkAuth = async () => {
            // simulate delay for auth check
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // replace with real authentication check
            const userIsAuthenticated = false;  // change based on real logic
            setIsAuthenticated(userIsAuthenticated);
            setIsLoading(false);
        }

        checkAuth();
    }, []);
    
    return {isAuthenticated, isLoading};
}

export default useAuth;