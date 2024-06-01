export interface ImageItem {
  url: string;
  title: string;
  description?: string;
  height: number;
  width: number;
}

export interface PhotoAlbum {
  title: string;
  type: string;
  images: ImageItem[];
  highlight?: boolean;
  priority?: number;
}

export interface SlugAlbum {
  title: string;
  type: string;
  images: ImageItem[];
}
export interface AlbumList {
  photographyLists: PhotoAlbum[];
  modellingLists: PhotoAlbum[];
}

export interface Portrait {
  title: string;
  image: string;
}

export interface Feature {
  title: string;
  link: string;
  date: string;
  coverPhoto: string;
  author: string;
}
