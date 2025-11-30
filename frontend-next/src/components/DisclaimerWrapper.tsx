'use client';

import { usePathname } from 'next/navigation';
import { Disclaimer } from '@/components/Disclaimer';

export default function DisclaimerWrapper() {
  const pathname = usePathname();
  
  // Don't show disclaimer on the home page
  if (pathname === '/') {
    return null;
  }

  return <Disclaimer />;
}
