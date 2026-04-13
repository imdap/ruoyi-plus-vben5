"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExportBlobByContent = getExportBlobByContent;
exports.parseFile = parseFile;
exports.saveLocalFile = exports.readLocalFile = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _core = require("@vxe-ui/core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 导入
let fileForm = null;
let fileInput = null;
function parseFile(file) {
  const name = file.name;
  const tIndex = _xeUtils.default.lastIndexOf(name, '.');
  const type = name.substring(tIndex + 1, name.length).toLowerCase();
  const filename = name.substring(0, tIndex);
  return {
    filename,
    type
  };
}
/**
 * 读取本地文件
 */
const readLocalFile = options => {
  const opts = Object.assign({}, options);
  return new Promise((resolve, reject) => {
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.name = 'file';
      fileInput.type = 'file';
    }
    if (!fileForm) {
      fileForm = document.createElement('form');
      fileForm.style.display = 'none';
      fileForm.appendChild(fileInput);
      document.body.appendChild(fileForm);
    }
    const types = opts.types || [];
    const isAllType = !types.length || types.some(type => type === '*');
    fileInput.multiple = !!opts.multiple;
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`;
    fileInput.onchange = evnt => {
      const eventTarget = evnt.target;
      const files = Array.from(eventTarget.files || []);
      const file = files[0];
      let errType = '';
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const {
            type
          } = parseFile(files[fIndex]);
          if (!_xeUtils.default.includes(types, type)) {
            errType = type;
            break;
          }
        }
      }
      if (!errType) {
        resolve({
          status: true,
          files,
          file
        });
      } else {
        if (opts.message !== false) {
          if (_core.VxeUI.modal) {
            _core.VxeUI.modal.message({
              content: (0, _core.getI18n)('vxe.error.notType', [errType]),
              status: 'error'
            });
          }
        }
        const params = {
          status: false,
          files,
          file
        };
        reject(params);
      }
    };
    fileForm.reset();
    fileInput.click();
  });
};
exports.readLocalFile = readLocalFile;
function getExportBlobByContent(content, options) {
  return new Blob([content], {
    type: `text/${options.type};charset=utf-8;`
  });
}
/**
 * 保存文件到本地
 */
const saveLocalFile = options => {
  const opts = Object.assign({
    type: ''
  }, options);
  const {
    filename,
    type,
    content
  } = opts;
  const name = type ? `${filename}.${type}` : `${filename}`;
  if (window.Blob) {
    const blob = content instanceof Blob ? content : getExportBlobByContent(_xeUtils.default.toValueString(content), opts);
    const winNavigator = window.navigator;
    if (winNavigator.msSaveBlob) {
      winNavigator.msSaveBlob(blob, name);
    } else {
      const url = URL.createObjectURL(blob);
      const linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = url;
      document.body.appendChild(linkElem);
      linkElem.click();
      requestAnimationFrame(() => {
        if (linkElem.parentNode) {
          linkElem.parentNode.removeChild(linkElem);
        }
        URL.revokeObjectURL(url);
      });
    }
    return Promise.resolve();
  }
  return Promise.reject(new Error((0, _core.getI18n)('vxe.error.notExp')));
};
exports.saveLocalFile = saveLocalFile;