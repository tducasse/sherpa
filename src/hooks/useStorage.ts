import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { Steps } from "../types";

const STEPS_KEY = "steps";

const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [savedSteps, setSteps] = useState<Steps>([]);
  useEffect(() => {
    const initStorage = async () => {
      const newStoreClass = new Storage({ name: "sherpa" });
      const newStore = await newStoreClass.create();
      setStore(newStore);
      const storedSteps = (await newStore.get(STEPS_KEY)) || [];
      setSteps(storedSteps);
    };
    initStorage();
  }, []);

  const saveSteps = (steps: Steps) => {
    setSteps(steps);
    store?.set(STEPS_KEY, steps);
  };

  return {
    store,
    savedSteps,
    saveSteps,
  };
};

export default useStorage;
