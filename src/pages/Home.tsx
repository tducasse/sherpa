import { IonButton, IonContent, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton onClick={() => history.push("/create")}>Create</IonButton>
        <IonButton onClick={() => history.push("/view")}>View</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
