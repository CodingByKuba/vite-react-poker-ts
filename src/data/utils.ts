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
