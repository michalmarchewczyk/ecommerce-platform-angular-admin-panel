import { createAction, props } from '@ngrx/store';
import { LoginDto } from '../../../api';

export const login = createAction('[Auth] Login', props<{ data: LoginDto }>());
