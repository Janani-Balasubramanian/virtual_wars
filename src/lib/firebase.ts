import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration (Placeholder values - replace with real ones from Firebase Console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_MOCK_KEY_FOR_EVALUATION",
  authDomain: "virtual-wars-election.firebaseapp.com",
  projectId: "virtual-wars-election",
  storageBucket: "virtual-wars-election.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * Logs a voter's selected status to Firestore for analytics and personalized assistance.
 * @param status The selected voter status
 */
export const logVoterStatus = async (status: string) => {
  try {
    await addDoc(collection(db, 'voter_interactions'), {
      status,
      timestamp: serverTimestamp(),
      platform: 'web',
      version: '1.0.0'
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { db, analytics };
