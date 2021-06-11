import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
} from '@ionic/react';

import TravelCard from './TravelCard';
import AccomodationCard from './AccomodationCard';
import ExcursionCard from './ExcursionCard';
import BuddiesCard from './BuddiesCard';

import getTripById from '../tripById.api';

const Trip = () => {
  const history = useHistory();
  const tripId = useParams();
  const id = tripId;
  const [currTrip, setCurrTrip] = useState(tripId.trip_id);

  useEffect(() => {
    getTripById(currTrip, setCurrTrip);
  }, []);

  return (
    <>
      <IonCard color="light">
        <IonCardTitle>
          {'15 days until '}
          {currTrip.trip_name}
        </IonCardTitle>
        <IonCardSubtitle>
          {'Location: '}
          {currTrip.destination}
        </IonCardSubtitle>
      </IonCard>

      <TravelCard id={id} />

      <AccomodationCard id={id} />

      <ExcursionCard id={id} />

      <BuddiesCard id={id} />

      <IonCard>
        <IonCardTitle>Notes</IonCardTitle>
      </IonCard>
      <IonButton color="success" onClick={() => history.push('/form')}>
        Edit Details
      </IonButton>
    </>
  );
};

export default Trip;
