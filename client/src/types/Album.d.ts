export interface PagedAlbumsList {
  items: PagedAlbum[];
  total: number;
}
export interface PagedAlbum {
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  id: string;
  title: string;
  image: string;
}
