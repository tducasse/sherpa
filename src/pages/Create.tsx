import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonModal,
  IonPage,
} from "@ionic/react";
import {
  arrowBack,
  arrowForward,
  arrowUndo,
  home,
  menu,
  save,
} from "ionicons/icons";
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import WithMarkers from "../components/WithMarkers";
import { Marker, Steps } from "../types";

const Create: React.FC<RouteComponentProps> = ({ history }) => {
  const [steps, setSteps] = useState<Steps>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activated, setActivated] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [src, setSrc] = useState<string>("");

  const importFile = (e: any) => {
    const selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setSrc(event?.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

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
    setIsOpen(true);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <WithMarkers src={src} markers={markers} onAddMarker={addMarker} />
          <input onChange={importFile} type="file"></input>
        </div>
      </IonContent>
      <IonModal
        isOpen={isOpen}
        trigger="open-modal"
        canDismiss={true}
        onWillDismiss={() => history.replace("/")}
      >
        <IonContent>
          <div>copy this</div>
          <input value={JSON.stringify(steps)} readOnly />
          <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Create;
