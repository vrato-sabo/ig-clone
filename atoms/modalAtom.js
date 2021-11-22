import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const detailModalState = atom({
  key: 'detailModalState',
  default: false,
});

export const selectChatModalState = atom({
  key: 'selectChatModalState',
  default: false,
});

export const usernameState = atom({
  key: 'usernameState',
  default: null,
});

export const idState = atom({
  key: 'idState',
  default: null,
});

export const selectedUserState = atom({
  key: 'selectedUserState',
  default: null,
});

export const filteredUsersState = atom({
  key: 'filteredUsersState',
  default: [],
});

export const fullImageState = atom({
  key: 'fullImageState',
  default: false,
});

export const imgUrlForModalState = atom({
  key: 'imgUrlForModalState',
  default: null,
});

export const imgUrlForMessageState = atom({
  key: 'imgUrlForMessageState',
  default: '',
});

export const messageNotificationState = atom({
  key: 'messageNotificationState',
  default: null,
});

export const dataState = atom({
  key: 'dataState',
  default: '',
});
