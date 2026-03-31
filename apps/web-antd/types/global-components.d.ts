import { Button } from 'antdv-next/dist/button/Button';

/* eslint-disable unicorn/require-module-specifiers */
/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    AButton: typeof Button;
    ActionButton: typeof Button;
  }
}

export {};
