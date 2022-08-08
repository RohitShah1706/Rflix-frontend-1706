import { app } from './firebaseConfig';
import { isDesktop } from 'react-device-detect';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
const fireBaseSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    if (isDesktop) {
        return signInWithPopup(auth, provider)
            .then(result => {
                return result.user;
            })
            .catch(err => {
                console.log(err);
                return null
            })
    }
    else {
        return signInWithRedirect(auth, provider)
            .then(result => {
                return result.user;
            }).catch(err => {
                console.log(err);
                return null
            })
    }
}
export { fireBaseSignIn };