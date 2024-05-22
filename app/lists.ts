import { AlbumType } from "./interfaces/album";

export const photographyFilter = [
  "Pre Wedding",
  "Couples",
  "Fashion",
  "Products",
  "Events",
  "Food",
  "Travel",
];

export const photographyAlbums: AlbumType[] = [
  {
    title: "Arcade X Flashback",
    type: "fashion",
    setToShow: true,
    images: [
      "arcade-x-flashback_01.jpg",
      "arcade-x-flashback_02.jpg",
      "arcade-x-flashback_03.jpg",
    ],
  },
  {
    title: "Kim & Alastair",
    type: "couples",
    setToShow: true,
    images: ["DSC08406.jpg", "DSC08407.jpg", "DSC08432.jpg"],
  },
  {
    title: "An & Jonathan",
    type: "pre wedding",
    setToShow: true,
    images: ["DSC08153.jpg", "DSC08951.jpg", "DSC09082.jpg"],
  },
  {
    title: "Dempsey X Chiara",
    type: "events",
    setToShow: true,
    images: [
      "dempsey-x-chiara_01.jpg",
      "dempsey-x-chiara_02.jpg",
      "dempsey-x-chiara_03.jpg",
    ],
  },
  // {
  //   title: "Nat Layn",
  //   type: "modelling",
  //   setToShow: true,
  //   images: ["DSC05690.jpg", "DSC05932.jpg"],
  // },
];

export const modellingAlbums: AlbumType[] = [
  {
    title: "Sudio Collage",
    type: "sudio-collage",
    setToShow: true,
    images: [
      "Sudio-Collage-FinalR2_01.jpg",
      "Sudio-Collage-FinalR2_02.jpg",
      "Sudio-Collage-FinalR2_03.jpg",
    ],
  },
  {
    title: "Dempsey X Chiara",
    type: "dempsey-x-chiara",
    setToShow: true,
    images: [
      "dempsey-x-chiara_01.jpg",
      "dempsey-x-chiara_02.jpg",
      "dempsey-x-chiara_03.jpg",
    ],
  },
];
