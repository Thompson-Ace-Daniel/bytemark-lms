import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('bytemarkUser');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      window.location.href = '/';
    }
  }, []);

  if (!user) return null;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <img src={user.picture} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
      <p className="text-lg mt-2">{user.email}</p>
    </div>
  );
}