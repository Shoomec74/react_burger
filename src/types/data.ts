import { IIngredient, IOrder, TUser } from ".";

export type TUserResponse = {
  readonly success: boolean;
  readonly user: TUser;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly message: string;
};

export type TFeed = {
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly _id: string;
  readonly createdAt: string;
};

export type TFeedResponse = {
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
  readonly orders: Array<TFeed>;
};

export type TIngredientResponse = {
  readonly data: Array<IIngredient>;
  readonly success: boolean;
};

export type TOrderDetailsResponse = {
  readonly name: string;
  readonly order: IOrder;
  readonly success: boolean;
};

export type TUserLogoutResponse = {
  readonly message: string;
  readonly success: boolean;
  readonly refreshToken: string;
};
