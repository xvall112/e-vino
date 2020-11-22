import React from "react";

import RedWineImage from "../../images/redWine.png";
import WhiteWineImage from "../../images/whiteWine.png";

export default [
  {
    id: 1,
    name: "Portské Červené",
    price: 160,
    obsah: 0.7,
    color: "červené",
    druh: "suché",
    rocnik: 2018,
    image: <img src={RedWineImage} />
  },
  {
    id: 2,
    name: "Portské Bílé",
    price: 160,
    obsah: 0.7,
    color: "bíle",
    druh: "suché",
    rocnik: 2018,
    image: <img src={WhiteWineImage} />
  },
  {
    id: 3,
    name: "Aurelius",
    price: 160,
    obsah: 0.7,
    color: "bílé",
    rocnik: 2019,
    druh: "polosuché",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 4,
    name: "Veltlínské zelené",
    price: 140,
    obsah: 0.7,
    color: "bíle",
    rocnik: 2019,
    druh: "polosuche",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 5,
    name: "Chardonnay",
    price: 140,
    obsah: 0.7,
    color: "bíle",
    rocnik: 2019,
    druh: "polosladké",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 6,
    name: "Pálava",
    price: 160,
    obsah: 0.7,
    color: "bíle",
    rocnik: 2019,
    druh: "polosladké",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 7,
    name: "Tramín červený",
    price: 140,
    obsah: 0.7,
    color: "bíle",
    rocnik: 2019,
    druh: "polosladké",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 8,
    name: "Rulandské šedé",
    price: 160,
    obsah: 0.7,
    color: "bíle",
    rocnik: 2019,
    druh: "sladké",
    image: <img src={WhiteWineImage} />
  },
  {
    id: 9,
    name: "Neronet",
    price: 140,
    obsah: 0.7,
    color: "červené",
    rocnik: 2019,
    druh: "suche",
    image: <img src={RedWineImage} />
  },
  {
    id: 10,
    name: "Solaris",
    price: 160,
    obsah: 0.7,
    color: "bílé",
    rocnik: 2020,
    druh: "suche",
    image: <img src={WhiteWineImage} />
  }
];
