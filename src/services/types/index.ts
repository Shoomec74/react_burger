import * as ACTION_TYPES from '../../utils/constants'

export interface IModal {
  readonly type: typeof ACTION_TYPES.FEED_MODAL;
  readonly payload: TTodoItem[],
}

