import {
  IonButton,
  IonInput,
  IonItem,
  IonContent,
  IonCardContent,
} from '@ionic/react';
import { React, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import db from '../../Config/firebase-setup';
import Error from '../Error';

const SignUp = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [newAvatarURL, setNewAvatarURL] = useState('');
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);

  // const imgurlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  const history = useHistory();

  const handleCreateNewUser = () => {
    if (newPassword === newConfirmPassword) {
      db.collection('Users')
        .add({
          avatar_url: newAvatarURL,
          username: newUsername,
          password: newPassword,
          name,
          buddies: [],
          trips: [],
        })
        .then((/* docRef */) => {
          // console.log('User Added', docRef.id);
          history.push('/');
        })
        .catch(() => {
          setIsError(true);
        });
    } else {
      alert("Password doesn't match");
    }
  };

  if (isError) return <Error />;
  return (
    <IonContent>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreateNewUser();
        }}
      >
        <IonCardContent>
          <IonItem>
            <IonInput
              required
              type="text"
              placeholder="Username"
              onIonChange={(e) => {
                setNewUsername(e.target.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              required
              type="password"
              placeholder="Password"
              onIonChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              required
              type="password"
              placeholder="Confirm Password"
              onIonChange={(e) => {
                setNewConfirmPassword(e.target.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              placeholder="Avatar URL"
              onIonChange={(e) => {
                setNewAvatarURL(e.target.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              placeholder="Name/Nickname"
              onIonChange={(e) => {
                setName(e.target.value);
              }}
            />
          </IonItem>
        </IonCardContent>
        <IonButton type="submit">Register</IonButton>
        <Link to="/">
          <IonButton>Back To Login</IonButton>
        </Link>
      </form>
    </IonContent>
  );
};

export default SignUp;
