import { IonButton, IonContent, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              minWidth: 100,
            }}
          >
            <IonButton onClick={() => history.push("/create")}>
              Create
            </IonButton>
            <IonButton onClick={() => history.push("/view")}>View</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
