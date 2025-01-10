import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Home Page: Entry point of the application
// Automatically redirects visitors to the user management dashboard

export default function Home() {
  const router = useRouter();

  // Redirect to users page on component mount
  useEffect(() => {
    router.push('/users');
  }, [router]);

  return null; // veya "Loading..."
}
