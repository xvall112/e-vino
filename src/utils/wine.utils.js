import React from "react";

export const selectImageWine = color => {
  switch (color) {
    case "bílé":
      return "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062";

    case "červené":
      return "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FredWine.png?alt=media&token=17f66421-70ea-429d-9f85-09fbeca80aab";

    case "růžové":
      return "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FpinkWine.png?alt=media&token=84e087c2-fce9-4102-ac8a-ee29891ce59c";
  }
};
