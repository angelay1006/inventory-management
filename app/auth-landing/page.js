'use client';

import SignInSide from './signin/page';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function AuthLandingPage() {
  return <SignInSide />;
}
