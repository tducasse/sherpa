import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import WithMarkers from "../components/WithMarkers";
import { Marker, Steps } from "../types";
import {
  arrowBack,
  arrowForward,
  arrowUndo,
  home,
  menu,
  save,
} from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import useStorage from "../hooks/useStorage";

const Create: React.FC<RouteComponentProps> = ({ history }) => {
  const [steps, setSteps] = useState<Steps>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activated, setActivated] = useState<boolean>(true);
  const { saveSteps } = useStorage();

  const addMarker = (marker: Marker) => setMarkers([...markers, marker]);
  const resetMarkers = () => setMarkers([]);
  const nextStep = () => {
    setSteps([...steps, markers]);
    setMarkers([]);
  };
  const previousStep = () => {
    setSteps(steps.slice(0, -1));
    setMarkers(steps[steps.length - 1]);
  };
  const submit = () => {
    const newSteps = [...steps, markers];
    setSteps(newSteps);
    setMarkers([]);
    saveSteps(newSteps);
    history.replace("/home");
  };
  const toggleActivated = () => setActivated(!activated);

  return (
    <IonPage>
      <IonFab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        activated={activated}
      >
        <IonFabButton onClick={toggleActivated}>
          <IonIcon icon={menu} />
        </IonFabButton>
        <IonFabList side="start">
          <IonFabButton onClick={submit} disabled={markers.length < 4}>
            <IonIcon icon={save} />
          </IonFabButton>
          <IonFabButton onClick={nextStep} disabled={markers.length < 4}>
            <IonIcon icon={arrowForward} />
          </IonFabButton>
          <IonFabButton onClick={previousStep} disabled={!steps.length}>
            <IonIcon icon={arrowBack} />
          </IonFabButton>
          <IonFabButton onClick={resetMarkers}>
            <IonIcon icon={arrowUndo} />
          </IonFabButton>
          <IonFabButton onClick={() => history.replace("/")}>
            <IonIcon icon={home} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonContent fullscreen>
        <WithMarkers
          src="sample.jpeg"
          markers={markers}
          onAddMarker={addMarker}
        />
      </IonContent>
    </IonPage>
  );
};

export default Create;
