import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // simulate authentication check (replace w/ real logic)
        const checkAuth = async () => {
            // simulate delay for auth check
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // replace with real authentication check
            const userIsAuthenticated = false;  // change based on real logic
            setIsAuthenticated(userIsAuthenticated);
        }

        checkAuth();
    }, []);
    
    return {isAuthenticated};
}

export default useAuth;