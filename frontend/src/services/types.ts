import { AxiosResponse } from "axios";

export interface Groupo {
  id: string;
  name: string;
  user: {
    id: string;
    email: string;
    password: string;
  };
}

export interface CreateGroupResponse {
  groups: Groupo[];
}

export interface ApiError {
  status: number;
  statusText: AxiosResponse<String>;
}
