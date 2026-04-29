/* currently we manage contents for 
 @dreamspace route and @resources route */

export interface GalleryItem {
  _id: string;
  caption: string;
  imageUrl: string;
  width: number;
  height: number;
}

export interface Resource {
  _id: string;
  title: string;
  url: string;
  description: string;
  order?: number;
  _updatedAt: string;
}

export interface MusicTrack {
  _id: string;
  title: string;
  url: string;
  _updatedAt: string;
}

export interface Profile {
  _id: string;
  title: string;
  cvUrl?: string;
}
