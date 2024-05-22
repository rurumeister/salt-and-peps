export interface ImageItem {
  url: string;
  title: string;
  description: string;
}

export interface PhotoAlbum {
  title: string;
  type: string;
  images: ImageItem[];
  highlight: boolean;
}
