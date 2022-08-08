import { app } from './firebaseConfig';
import { getAuth } from "firebase/auth";
const fireBaseLogout = () => {
    const auth = getAuth(app);
    auth.signOut()
        .then(result => {
            return result;
        }).catch(err => {
            console.log(err);
            return null;
        });
}
export { fireBaseLogout };