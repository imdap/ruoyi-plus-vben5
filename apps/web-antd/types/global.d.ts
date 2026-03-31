import type { MessageInstance } from 'antdv-next/dist/message/interface';
import type { ModalStaticFunctions } from 'antdv-next/dist/modal/confirm';
import type { NotificationInstance } from 'antdv-next/dist/notification/interface';

declare global {
  interface Window {
    message: MessageInstance;
    modal: Omit<ModalStaticFunctions, 'warn'>;
    notification: NotificationInstance;
  }
}
