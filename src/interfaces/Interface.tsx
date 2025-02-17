export interface SortChat {
  roomId: number;
  id: number;
  userId: number;
  text: string;
  date: string;
}

export interface Chat {
  id: number;
  userId: number;
  text: string;
  date: string;
}

export interface User {
  id: number;
  name: string;
  image: string;
  contents: string;
}
