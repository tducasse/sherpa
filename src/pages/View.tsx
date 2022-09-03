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
import useStorage from "../hooks/useStorage";

const View: React.FC<RouteChildrenProps> = ({ history }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activated, setActivated] = useState<boolean>(true);
  const { savedSteps } = useStorage();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
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
          <IonFabButton
            onClick={nextStep}
            disabled={currentStep === savedSteps.length - 1}
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
        <WithMarkers
          src="sample.jpeg"
          markers={savedSteps.length ? savedSteps[currentStep] : []}
        />
      </IonContent>
    </IonPage>
  );
};

export default View;
