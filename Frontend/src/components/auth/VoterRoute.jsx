import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import Loader from '../ui/Loader'; // Import your loader component

export default function VoterRoute() {
  const { currentUser } = useAuth();
  const [isVoter, setIsVoter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVoter = async () => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsVoter(userDoc.exists() && userDoc.data().role === 'voter');
        }
      } catch (error) {
        console.error("Error verifying voter role:", error);
      } finally {
        setLoading(false);
      }
    };
    checkVoter();
  }, [currentUser]);

  if (loading) return <Loader />;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isVoter) return <Navigate to="/" replace />;
  
  return (
    <>
     
      <Outlet /> {/* This renders the nested child routes */}
    </>
  );
}