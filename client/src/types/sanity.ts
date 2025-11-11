/* currently we manage contents for 
 @dreamspace route, @current-projects.tsx component, @resources route */

export interface CurrentProject {
  _id: string;
  title: string;
  url?: string;
  description: string;
  order?: number;
}

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
}