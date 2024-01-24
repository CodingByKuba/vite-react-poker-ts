export const generateRandomId = () =>
  (
    parseInt((Math.random() * 100000000).toFixed(0)) +
    "-" +
    new Date().getTime()
  ).toString();

export const parseCardCode = (code: string): string[] => {
  let symbols = code.split("-");
  symbols[0] = parseInt(symbols[0]).toString();

  if (symbols[0] === "11") symbols[0] = "J";
  if (symbols[0] === "12") symbols[0] = "Q";
  if (symbols[0] === "13") symbols[0] = "K";
  if (symbols[0] === "14") symbols[0] = "A";

  if (symbols[1] === "H" || symbols[1] === "D") {
    symbols[2] = "red";
  } else {
    symbols[2] = "black";
  }

  if (symbols[1] === "H") symbols[1] = "♥";
  if (symbols[1] === "C") symbols[1] = "♣";
  if (symbols[1] === "D") symbols[1] = "♦";
  if (symbols[1] === "S") symbols[1] = "♠";

  return symbols;
};

export const countMaxPlayers = (startFromCard: number) =>
  Math.floor((47 - startFromCard * 4) / 5);

export const getCurrentSoundFromName = (soundFrom: number) => {
  if (soundFrom < 0 || soundFrom > 5 || isNaN(soundFrom)) soundFrom = 0;
  const cardSetNames = ["OFF", "KOLOR", "FULL", "KARETA", "POKER", "POKER KR."];
  return cardSetNames[soundFrom];
};

export const generateRoomId = () =>
  (100000 + Math.random() * 899999).toFixed(0);
