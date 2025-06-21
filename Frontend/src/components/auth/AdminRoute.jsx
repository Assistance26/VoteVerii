import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import Loader from '../ui/Loader'; // Import your loader component

export default function AdminRoute() {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
        }
      } catch (error) {
        console.error("Error verifying admin role:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [currentUser]);

  if (loading) return <Loader />;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  
  return (
    <>
      
      <Outlet /> {/* This renders the nested child routes */}
    </>
  );
}