import { createAction } from '@reduxjs/toolkit';
import { IUserPayload } from '../../helpers/appTypes';

export const userLogined = createAction<IUserPayload>('USER/USER_LOGINED');
export const userLogouted = createAction('USER/USER_LOGOUTED');
