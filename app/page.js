'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './hooks/useAuth';

export default function MainEntryPage() {
  const router = useRouter();
  const {isAuthenticated, isLoading} = useAuth(); 

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // direct to home (main app)
        router.push('/home'); 
      } else {
        router.push('/auth-landing');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // render nothing while determining route
  return null; 
}