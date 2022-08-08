import { app } from './firebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const fireBaseSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(result => {
            return result.user;
        })
        .catch(err => {
            console.log(err);
            return null
        })
}
export { fireBaseSignIn };