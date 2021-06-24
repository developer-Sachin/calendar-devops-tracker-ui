export class User {
  userName: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
}


export interface UserPage {
  content: User[];

  totalPages: number;
  totalElements: number;

  size: number;
  first: boolean;
  last: boolean;

  number: number;
  numberOfElements: number;
}

export interface PagingInfo {
  pageIndex: number;
}
