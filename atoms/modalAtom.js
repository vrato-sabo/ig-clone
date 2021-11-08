import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const detailModalState = atom({
  key: 'detailModalState',
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
