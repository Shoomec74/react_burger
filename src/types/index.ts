export type TUser = {
  name: string;
  email: string;
  password: string;
};

export interface IOrder {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly count?: number;
}

export interface IDNDIngredient extends IIngredient {
  index: number;
  readonly uniqueID: string;
}

export type TLocation = {
  readonly state?: object;
  readonly from: string;
  readonly pathname: string;
  readonly background: {
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    readonly state: null;
    readonly key: string;
  };
};

export type TSocketMiddlewareActions = {
	readonly wsInit: string;
	readonly onOpen: string;
	readonly onMessage: string;
	readonly onClose: string;
	readonly onError: string;
  readonly wsSendMessage: string;
}
