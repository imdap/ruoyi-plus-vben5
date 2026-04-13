import { VxeUI } from '@vxe-ui/core';
import VxeNoticeBarComponent from './src/notice-bar';
import { dynamicApp } from '../dynamics';
export const VxeNoticeBar = Object.assign({}, VxeNoticeBarComponent, {
    install(app) {
        app.component(VxeNoticeBarComponent.name, VxeNoticeBarComponent);
    }
});
dynamicApp.use(VxeNoticeBar);
VxeUI.component(VxeNoticeBarComponent);
export const NoticeBar = VxeNoticeBar;
export default VxeNoticeBar;
