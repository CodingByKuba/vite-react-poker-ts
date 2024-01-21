import { createContext, useContext } from "react";
import { UserProviderType } from "../data/types";
import colorSound from "../assets/color.mp3";
import fanfareSound from "../assets/fanfare.mp3";
import fullSound from "../assets/full.mp3";
import wowSound from "../assets/wow.mp3";
import johnCenaSound from "../assets/johncena.mp3";
import { useUserContext } from "./UserContext";

const defaultValue: any = undefined;

const SoundContext = createContext(defaultValue);

export const SoundContextProvider: React.FC<UserProviderType> = ({
  children,
}) => {
  const audioFiles: string[] = [
    colorSound,
    fullSound,
    fanfareSound,
    wowSound,
    johnCenaSound,
  ];

  const { userState } = useUserContext();

  const playSound = async (index: 0 | 1 | 2 | 3 | 4) => {
    if (index > 4 || index < 0 || isNaN(index)) return;
    if (userState.soundFrom === 0 || index < userState.soundFrom - 1) return;
    const audio = new Audio(audioFiles[index]);
    audio.play();
  };

  return (
    <SoundContext.Provider
      value={{
        playSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
