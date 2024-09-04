import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if(!uid) return set({currentUser:null, isLoading: false});

    try{
        const docRef = doc(db, "users", uid);
        // const docSnap = await getDoc(docRef);
        const docSnap = onSnapshot(docRef, (res)=>{
          set({currentUser:res.data(), isLoading:false});
        });
        console.log(docSnap);

        // if (docSnap.exists()) {
        //     set({currentUser:docSnap.data(), isLoading:false})
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     set({currentUser:null, isLoading:false})
        // }
    } catch (err) {
        console.log(err);
        return set({currentUser:null, isLoading: false});
    }
  }
}))