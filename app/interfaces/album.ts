export interface ImageItem {
  url: string;
  title: string;
  description?: string;
}

export interface PhotoAlbum {
  title: string;
  type: string;
  images: ImageItem[];
  highlight?: boolean;
  isPortrait?: boolean;
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
