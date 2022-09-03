import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonPage,
} from "@ionic/react";
import WithMarkers from "../components/WithMarkers";
import { arrowBack, arrowForward, home, menu } from "ionicons/icons";
import { RouteChildrenProps } from "react-router";

import { useState } from "react";
import { Steps } from "../types";

const View: React.FC<RouteChildrenProps> = ({ history }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activated, setActivated] = useState<boolean>(true);
  const [src, setSrc] = useState<string>("");
  const [steps, saveSteps] = useState<Steps>([]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const toggleActivated = () => setActivated(!activated);

  const importFile = (e: any) => {
    const selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setSrc(event?.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

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
          <IonFabButton
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            <IonIcon icon={arrowForward} />
          </IonFabButton>
          <IonFabButton onClick={previousStep} disabled={!currentStep}>
            <IonIcon icon={arrowBack} />
          </IonFabButton>
          <IonFabButton onClick={() => history.replace("/")}>
            <IonIcon icon={home} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonContent fullscreen>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!!steps.length && (
            <WithMarkers
              src={src}
              markers={steps.length ? steps[currentStep] : []}
            />
          )}
          <input onChange={importFile} type="file"></input>
          <input onChange={(e) => saveSteps(JSON.parse(e.target.value))} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default View;
