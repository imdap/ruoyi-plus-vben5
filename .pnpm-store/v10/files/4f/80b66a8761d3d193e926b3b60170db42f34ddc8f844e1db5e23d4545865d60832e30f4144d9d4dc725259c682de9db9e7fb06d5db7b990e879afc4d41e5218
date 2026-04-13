import { nextTick } from 'vue';
import XEUtils from 'xe-utils';
import { VxeUI } from '../../../ui';
import { isColumnInfo, getCellValue, createHandleGetRowId } from '../../src/util';
import { parseFile, formatText, eqEmptyValue } from '../../../ui/src/utils';
import { hasClass } from '../../../ui/src/dom';
import { createHtmlPage, getExportBlobByContent } from './util';
import { warnLog, errLog } from '../../../ui/src/log';
const { getI18n, hooks, renderer } = VxeUI;
let htmlCellElem;
const csvBOM = '\ufeff';
const enterSymbol = '\r\n';
function defaultFilterExportColumn(column) {
    return !!column.field || ['seq', 'checkbox', 'radio'].indexOf(column.type || '') === -1;
}
const getConvertColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
        if (column.childNodes && column.childNodes.length) {
            result.push(column);
            result.push(...getConvertColumns(column.childNodes));
        }
        else {
            result.push(column);
        }
    });
    return result;
};
const convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
        if (parent) {
            column._level = parent._level + 1;
            if (maxLevel < column._level) {
                maxLevel = column._level;
            }
        }
        if (column.childNodes && column.childNodes.length) {
            let colSpan = 0;
            column.childNodes.forEach((subColumn) => {
                traverse(subColumn, column);
                colSpan += subColumn._colSpan;
            });
            column._colSpan = colSpan;
        }
        else {
            column._colSpan = 1;
        }
    };
    originColumns.forEach((column) => {
        column._level = 1;
        traverse(column);
    });
    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }
    const allColumns = getConvertColumns(originColumns);
    allColumns.forEach((column) => {
        if (column.childNodes && column.childNodes.length) {
            column._rowSpan = 1;
        }
        else {
            column._rowSpan = maxLevel - column._level + 1;
        }
        rows[column._level - 1].push(column);
    });
    return rows;
};
function toTableBorder(border) {
    if (border === true) {
        return 'full';
    }
    if (border) {
        return border;
    }
    return 'default';
}
function getBooleanValue(cellValue) {
    return cellValue === 'TRUE' || cellValue === 'true' || cellValue === true;
}
function getFooterData($xeTable, opts, footerTableData) {
    const $xeGrid = $xeTable.xeGrid;
    const $xeGantt = $xeTable.xeGantt;
    const { footerFilterMethod } = opts;
    return footerFilterMethod ? footerTableData.filter((items, index) => footerFilterMethod({ $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, items, $rowIndex: index })) : footerTableData;
}
function getCsvCellTypeLabel(column, cellValue) {
    if (cellValue) {
        if (column.type === 'seq') {
            return `\t${cellValue}`;
        }
        switch (column.cellType) {
            case 'string':
                if (!isNaN(cellValue)) {
                    return `\t${cellValue}`;
                }
                break;
            case 'number':
                break;
            default:
                if (cellValue.length >= 12 && !isNaN(cellValue)) {
                    return `\t${cellValue}`;
                }
                break;
        }
    }
    return cellValue;
}
function toTxtCellLabel(val) {
    if (/[",\s\n]/.test(val)) {
        return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
}
function getElementsByTagName(elem, qualifiedName) {
    return elem.getElementsByTagName(qualifiedName);
}
function getTxtCellKey(now) {
    return `#${now}@${XEUtils.uniqueId()}`;
}
function replaceTxtCell(cell, vMaps) {
    return cell.replace(/#\d+@\d+/g, (key) => XEUtils.hasOwnProp(vMaps, key) ? vMaps[key] : key);
}
function getTxtCellValue(val, vMaps) {
    const rest = replaceTxtCell(val, vMaps);
    return rest.replace(/^"+$/g, (qVal) => '"'.repeat(Math.ceil(qVal.length / 2)));
}
function toExportField(tableConf, field) {
    const { fieldMaps, titleMaps } = tableConf;
    // title 转 field
    if (!fieldMaps[field]) {
        const teCol = titleMaps[field];
        if (teCol && teCol.field) {
            field = teCol.field;
        }
    }
    return field;
}
function parseCsvAndTxt(tableConf, content, cellSeparator) {
    const list = content.split(enterSymbol);
    const rows = [];
    let fields = [];
    if (list.length) {
        const vMaps = {};
        const now = Date.now();
        list.forEach((rVal) => {
            if (rVal) {
                const item = {};
                rVal = rVal.replace(/("")|(\n)/g, (text, dVal) => {
                    const key = getTxtCellKey(now);
                    vMaps[key] = dVal ? '"' : '\n';
                    return key;
                }).replace(/"(.*?)"/g, (text, cVal) => {
                    const key = getTxtCellKey(now);
                    vMaps[key] = replaceTxtCell(cVal, vMaps);
                    return key;
                });
                const cells = rVal.split(cellSeparator);
                if (!fields.length) {
                    fields = cells.map((val) => toExportField(tableConf, getTxtCellValue(val.trim(), vMaps)));
                }
                else {
                    cells.forEach((val, colIndex) => {
                        if (colIndex < fields.length) {
                            item[fields[colIndex]] = getTxtCellValue(val.trim(), vMaps);
                        }
                    });
                    rows.push(item);
                }
            }
        });
    }
    return { fields, rows };
}
function parseCsv(tableConf, content) {
    return parseCsvAndTxt(tableConf, content, ',');
}
function parseTxt(tableConf, content) {
    return parseCsvAndTxt(tableConf, content, '\t');
}
function parseHTML(tableConf, content) {
    const domParser = new DOMParser();
    const xmlDoc = domParser.parseFromString(content, 'text/html');
    const bodyNodes = getElementsByTagName(xmlDoc, 'body');
    const rows = [];
    const fields = [];
    if (bodyNodes.length) {
        const tableNodes = getElementsByTagName(bodyNodes[0], 'table');
        if (tableNodes.length) {
            const theadNodes = getElementsByTagName(tableNodes[0], 'thead');
            if (theadNodes.length) {
                XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), rowNode => {
                    XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), cellNode => {
                        fields.push(toExportField(tableConf, cellNode.textContent || ''));
                    });
                });
                const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');
                if (tbodyNodes.length) {
                    XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
                        const item = {};
                        XEUtils.arrayEach(getElementsByTagName(rowNode, 'td'), (cellNode, colIndex) => {
                            if (fields[colIndex]) {
                                item[fields[colIndex]] = cellNode.textContent || '';
                            }
                        });
                        rows.push(item);
                    });
                }
            }
        }
    }
    return { fields, rows };
}
function parseXML(tableConf, content) {
    const domParser = new DOMParser();
    const xmlDoc = domParser.parseFromString(content, 'application/xml');
    const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet');
    const rows = [];
    const fields = [];
    if (sheetNodes.length) {
        const tableNodes = getElementsByTagName(sheetNodes[0], 'Table');
        if (tableNodes.length) {
            const rowNodes = getElementsByTagName(tableNodes[0], 'Row');
            if (rowNodes.length) {
                XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), cellNode => {
                    fields.push(toExportField(tableConf, cellNode.textContent || ''));
                });
                XEUtils.arrayEach(rowNodes, (rowNode, index) => {
                    if (index) {
                        const item = {};
                        const cellNodes = getElementsByTagName(rowNode, 'Cell');
                        XEUtils.arrayEach(cellNodes, (cellNode, colIndex) => {
                            if (fields[colIndex]) {
                                item[fields[colIndex]] = cellNode.textContent;
                            }
                        });
                        rows.push(item);
                    }
                });
            }
        }
    }
    return { fields, rows };
}
function clearColumnConvert(columns) {
    XEUtils.eachTree(columns, (column) => {
        delete column._level;
        delete column._colSpan;
        delete column._rowSpan;
        delete column._children;
        delete column.childNodes;
    }, { children: 'children' });
}
const tableExportMethodKeys = ['exportData', 'importByFile', 'importData', 'saveFile', 'readFile', 'print', 'getPrintHtml', 'openImport', 'closeImport', 'openExport', 'closeExport', 'openPrint', 'closePrint'];
hooks.add('tableExportModule', {
    setupTable($xeTable) {
        const { props, reactData, internalData } = $xeTable;
        const { computeTreeOpts, computePrintOpts, computeExportOpts, computeImportOpts, computeCustomOpts, computeSeqOpts, computeRadioOpts, computeCheckboxOpts, computeColumnOpts } = $xeTable.getComputeMaps();
        const hasTreeChildren = (row) => {
            const treeOpts = computeTreeOpts.value;
            const childrenField = treeOpts.children || treeOpts.childrenField;
            return row[childrenField] && row[childrenField].length;
        };
        const getSeq = (cellValue, row, $rowIndex, column, $columnIndex) => {
            const seqOpts = computeSeqOpts.value;
            const seqMd = seqOpts.seqMethod || column.seqMethod;
            if (seqMd) {
                return seqMd({
                    $table: $xeTable,
                    row,
                    rowIndex: $xeTable.getRowIndex(row),
                    _rowIndex: $xeTable.getVTRowIndex(row),
                    $rowIndex,
                    column,
                    columnIndex: $xeTable.getColumnIndex(column),
                    _columnIndex: $xeTable.getVTColumnIndex(column),
                    $columnIndex
                });
            }
            return cellValue;
        };
        function getHeaderTitle(opts, column) {
            const columnOpts = computeColumnOpts.value;
            const headExportMethod = column.headerExportMethod || columnOpts.headerExportMethod;
            return headExportMethod ? headExportMethod({ column, options: opts, $table: $xeTable }) : ((opts.isTitle ? column.getTitle() : column.field) || '');
        }
        const toBooleanValue = (cellValue) => {
            return XEUtils.isBoolean(cellValue) ? (cellValue ? 'TRUE' : 'FALSE') : cellValue;
        };
        const toStringValue = (cellValue) => {
            return eqEmptyValue(cellValue) ? '' : `${cellValue}`;
        };
        const getBodyLabelData = (opts, columns, datas) => {
            const { isAllExpand, mode } = opts;
            const { treeConfig } = props;
            const radioOpts = computeRadioOpts.value;
            const checkboxOpts = computeCheckboxOpts.value;
            const treeOpts = computeTreeOpts.value;
            const columnOpts = computeColumnOpts.value;
            if (!htmlCellElem) {
                htmlCellElem = document.createElement('div');
            }
            if (treeConfig) {
                const childrenField = treeOpts.children || treeOpts.childrenField;
                // 如果是树表格只允许导出数据源
                const rest = [];
                const expandMaps = {};
                const useMaps = {};
                const { handleGetRowId } = createHandleGetRowId($xeTable);
                XEUtils.eachTree(datas, (item, $rowIndex, items, path, parent, nodes) => {
                    const row = item._row || item;
                    const rowid = handleGetRowId(row);
                    if (useMaps[rowid]) {
                        return;
                    }
                    const parentRow = parent && parent._row ? parent._row : parent;
                    const pRowid = parentRow ? handleGetRowId(parentRow) : '';
                    if ((isAllExpand || !parentRow || (expandMaps[pRowid] && $xeTable.isTreeExpandByRow(parentRow)))) {
                        const hasRowChild = hasTreeChildren(row);
                        const item = {
                            _row: row,
                            _level: nodes.length - 1,
                            _hasChild: hasRowChild,
                            _expand: hasRowChild && $xeTable.isTreeExpandByRow(row)
                        };
                        columns.forEach((column, $columnIndex) => {
                            let cellValue = '';
                            const renderOpts = column.editRender || column.cellRender;
                            let bodyExportMethod = column.exportMethod || columnOpts.exportMethod;
                            if (!bodyExportMethod && renderOpts && renderOpts.name) {
                                const compConf = renderer.get(renderOpts.name);
                                if (compConf) {
                                    bodyExportMethod = compConf.tableExportMethod || compConf.exportMethod;
                                }
                            }
                            if (!bodyExportMethod) {
                                bodyExportMethod = columnOpts.exportMethod;
                            }
                            if (bodyExportMethod) {
                                cellValue = bodyExportMethod({ $table: $xeTable, row, column, options: opts });
                            }
                            else {
                                switch (column.type) {
                                    case 'seq': {
                                        const seqVal = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('');
                                        cellValue = mode === 'all' ? seqVal : getSeq(seqVal, row, $rowIndex, column, $columnIndex);
                                        break;
                                    }
                                    case 'checkbox':
                                        cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row));
                                        item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : '';
                                        item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ $table: $xeTable, row });
                                        break;
                                    case 'radio':
                                        cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row));
                                        item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : '';
                                        item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ $table: $xeTable, row });
                                        break;
                                    default:
                                        if (opts.original) {
                                            cellValue = getCellValue(row, column);
                                        }
                                        else {
                                            cellValue = $xeTable.getCellLabel(row, column);
                                            if (column.type === 'html') {
                                                htmlCellElem.innerHTML = cellValue;
                                                cellValue = htmlCellElem.innerText.trim();
                                            }
                                            else {
                                                const cell = $xeTable.getCellElement(row, column);
                                                if (cell && !hasClass(cell, 'is--progress')) {
                                                    cellValue = cell.innerText.trim();
                                                }
                                            }
                                        }
                                }
                            }
                            item[column.id] = toStringValue(cellValue);
                        });
                        useMaps[rowid] = true;
                        if (pRowid) {
                            expandMaps[pRowid] = true;
                        }
                        rest.push(Object.assign(item, row));
                    }
                }, { children: childrenField });
                return rest;
            }
            return datas.map((row, $rowIndex) => {
                const item = {
                    _row: row
                };
                columns.forEach((column, $columnIndex) => {
                    let cellValue = '';
                    const renderOpts = column.editRender || column.cellRender;
                    let bodyExportMethod = column.exportMethod || columnOpts.exportMethod;
                    if (!bodyExportMethod && renderOpts && renderOpts.name) {
                        const compConf = renderer.get(renderOpts.name);
                        if (compConf) {
                            bodyExportMethod = compConf.tableExportMethod || compConf.exportMethod;
                        }
                    }
                    if (bodyExportMethod) {
                        cellValue = bodyExportMethod({ $table: $xeTable, row, column, options: opts });
                    }
                    else {
                        switch (column.type) {
                            case 'seq': {
                                const seqValue = $rowIndex + 1;
                                cellValue = mode === 'all' ? seqValue : getSeq(seqValue, row, $rowIndex, column, $columnIndex);
                                break;
                            }
                            case 'checkbox':
                                cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row));
                                item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : '';
                                item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ $table: $xeTable, row });
                                break;
                            case 'radio':
                                cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row));
                                item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : '';
                                item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ $table: $xeTable, row });
                                break;
                            default:
                                if (opts.original) {
                                    cellValue = getCellValue(row, column);
                                }
                                else {
                                    cellValue = $xeTable.getCellLabel(row, column);
                                    if (column.type === 'html') {
                                        htmlCellElem.innerHTML = cellValue;
                                        cellValue = htmlCellElem.innerText.trim();
                                    }
                                    else {
                                        const cell = $xeTable.getCellElement(row, column);
                                        if (cell && !hasClass(cell, 'is--progress')) {
                                            cellValue = cell.innerText.trim();
                                        }
                                    }
                                }
                        }
                    }
                    item[column.id] = toStringValue(cellValue);
                });
                return item;
            });
        };
        const getExportData = (opts) => {
            const $xeGrid = $xeTable.xeGrid;
            const $xeGantt = $xeTable.xeGantt;
            const { columns, dataFilterMethod } = opts;
            let datas = opts.data;
            if (dataFilterMethod) {
                datas = datas.filter((row, index) => dataFilterMethod({ $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, row, $rowIndex: index }));
            }
            return getBodyLabelData(opts, columns, datas);
        };
        const getFooterCellValue = (opts, row, column) => {
            const columnOpts = computeColumnOpts.value;
            const renderOpts = column.editRender || column.cellRender;
            let footLabelMethod = column.footerExportMethod;
            if (!footLabelMethod && renderOpts && renderOpts.name) {
                const compConf = renderer.get(renderOpts.name);
                if (compConf) {
                    footLabelMethod = compConf.tableFooterExportMethod || compConf.footerExportMethod;
                }
            }
            if (!footLabelMethod) {
                footLabelMethod = columnOpts.footerExportMethod;
            }
            if (footLabelMethod) {
                const _columnIndex = $xeTable.getVTColumnIndex(column);
                return footLabelMethod({ $table: $xeTable, items: row, itemIndex: _columnIndex, row, _columnIndex, column, options: opts });
            }
            const cellValue = $xeTable.getFooterCellLabel(row, column);
            return cellValue;
        };
        const toCsv = ($xeTable, opts, columns, datas) => {
            let content = csvBOM;
            if (opts.isHeader) {
                content += columns.map((column) => toTxtCellLabel(getHeaderTitle(opts, column))).join(',') + enterSymbol;
            }
            datas.forEach((row) => {
                content += columns.map((column) => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + enterSymbol;
            });
            if (opts.isFooter) {
                const { footerTableData } = reactData;
                const footers = getFooterData($xeTable, opts, footerTableData);
                footers.forEach((row) => {
                    content += columns.map((column) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join(',') + enterSymbol;
                });
            }
            return content;
        };
        const toTxt = ($xeTable, opts, columns, datas) => {
            let content = '';
            if (opts.isHeader) {
                content += columns.map((column) => toTxtCellLabel(getHeaderTitle(opts, column))).join('\t') + enterSymbol;
            }
            datas.forEach((row) => {
                content += columns.map((column) => toTxtCellLabel(row[column.id])).join('\t') + enterSymbol;
            });
            if (opts.isFooter) {
                const { footerTableData } = reactData;
                const footers = getFooterData($xeTable, opts, footerTableData);
                footers.forEach((row) => {
                    content += columns.map((column) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join('\t') + enterSymbol;
                });
            }
            return content;
        };
        const hasEllipsis = (column, property, allColumnOverflow) => {
            const columnOverflow = column[property];
            const headOverflow = XEUtils.isUndefined(columnOverflow) || XEUtils.isNull(columnOverflow) ? allColumnOverflow : columnOverflow;
            const showEllipsis = headOverflow === 'ellipsis';
            const showTitle = headOverflow === 'title';
            const showTooltip = headOverflow === true || headOverflow === 'tooltip';
            let isEllipsis = showTitle || showTooltip || showEllipsis;
            // 虚拟滚动不支持动态高度
            const { scrollXLoad, scrollYLoad } = reactData;
            if ((scrollXLoad || scrollYLoad) && !isEllipsis) {
                isEllipsis = true;
            }
            return isEllipsis;
        };
        const toHtml = (opts, columns, datas) => {
            const { id, border, treeConfig, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow } = props;
            const { isAllSelected, isIndeterminate } = reactData;
            const { mergeBodyCellMaps } = internalData;
            const treeOpts = computeTreeOpts.value;
            const { print: isPrint, isHeader, isFooter, isColgroup, isMerge, colgroups, original } = opts;
            const allCls = 'check-all';
            const clss = [
                'vxe-table',
                `border--${toTableBorder(border)}`,
                isPrint ? 'is--print' : '',
                isHeader ? 'is--header' : ''
            ].filter(cls => cls);
            const tables = [
                `<table class="${clss.join(' ')}" border="0" cellspacing="0" cellpadding="0">`,
                `<colgroup>${columns.map((column) => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
            ];
            if (isHeader) {
                tables.push('<thead>');
                if (isColgroup && !original) {
                    colgroups.forEach((cols) => {
                        tables.push(`<tr>${cols.map((column) => {
                            const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
                            const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
                            const cellTitle = getHeaderTitle(opts, column);
                            let childWidth = 0;
                            let countChild = 0;
                            XEUtils.eachTree([column], item => {
                                if (!item.childNodes || !column.childNodes.length) {
                                    countChild++;
                                }
                                childWidth += item.renderWidth;
                            }, { children: 'childNodes' });
                            const cellWidth = childWidth - countChild;
                            if (headAlign) {
                                classNames.push(`col--${headAlign}`);
                            }
                            if (column.type === 'checkbox') {
                                return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${column._rowSpan}"><div ${isPrint ? '' : `style="width: ${cellWidth}px"`}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`;
                            }
                            return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${column._rowSpan}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${cellWidth}px"`}><span>${formatText(cellTitle, true)}</span></div></th>`;
                        }).join('')}</tr>`);
                    });
                }
                else {
                    tables.push(`<tr>${columns.map((column) => {
                        const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
                        const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
                        const cellTitle = getHeaderTitle(opts, column);
                        if (headAlign) {
                            classNames.push(`col--${headAlign}`);
                        }
                        if (column.type === 'checkbox') {
                            return `<th class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`;
                        }
                        return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><span>${formatText(cellTitle, true)}</span></div></th>`;
                    }).join('')}</tr>`);
                }
                tables.push('</thead>');
            }
            if (datas.length) {
                tables.push('<tbody>');
                if (treeConfig) {
                    datas.forEach((item) => {
                        tables.push('<tr>' + columns.map((column) => {
                            const colid = column.id;
                            const cellAlign = column.align || allAlign;
                            const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
                            const cellValue = item[colid];
                            if (cellAlign) {
                                classNames.push(`col--${cellAlign}`);
                            }
                            if (column.treeNode) {
                                let treeIcon = '';
                                if (item._hasChild) {
                                    treeIcon = `<i class="${item._expand ? 'vxe-table--tree-fold-icon' : 'vxe-table--tree-unfold-icon'}"></i>`;
                                }
                                classNames.push('vxe-table--tree-node');
                                if (column.type === 'radio') {
                                    return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></div></div></td>`;
                                }
                                else if (column.type === 'checkbox') {
                                    return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></div></div></td>`;
                                }
                                return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell">${cellValue}</div></div></div></td>`;
                            }
                            if (column.type === 'radio') {
                                return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`;
                            }
                            else if (column.type === 'checkbox') {
                                return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`;
                            }
                            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`;
                        }).join('') + '</tr>');
                    });
                }
                else {
                    datas.forEach((item) => {
                        tables.push('<tr>' + columns.map((column) => {
                            const cellAlign = column.align || allAlign;
                            const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
                            const cellValue = item[column.id];
                            let rowSpan = 1;
                            let colSpan = 1;
                            if (isMerge) {
                                const _rowIndex = $xeTable.getVTRowIndex(item._row);
                                const _columnIndex = $xeTable.getVTColumnIndex(column);
                                const spanRest = mergeBodyCellMaps[`${_rowIndex}:${_columnIndex}`];
                                if (spanRest) {
                                    const { rowspan, colspan } = spanRest;
                                    if (!rowspan || !colspan) {
                                        return '';
                                    }
                                    if (rowspan > 1) {
                                        rowSpan = rowspan;
                                    }
                                    if (colspan > 1) {
                                        colSpan = colspan;
                                    }
                                }
                            }
                            if (cellAlign) {
                                classNames.push(`col--${cellAlign}`);
                            }
                            if (column.type === 'radio') {
                                return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`;
                            }
                            else if (column.type === 'checkbox') {
                                return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`;
                            }
                            return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`;
                        }).join('') + '</tr>');
                    });
                }
                tables.push('</tbody>');
            }
            if (isFooter) {
                const { footerTableData } = reactData;
                const footers = getFooterData($xeTable, opts, footerTableData);
                if (footers.length) {
                    tables.push('<tfoot>');
                    footers.forEach((row) => {
                        tables.push(`<tr>${columns.map((column) => {
                            const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign;
                            const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
                            const cellValue = getFooterCellValue(opts, row, column);
                            if (footAlign) {
                                classNames.push(`col--${footAlign}`);
                            }
                            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`;
                        }).join('')}</tr>`);
                    });
                    tables.push('</tfoot>');
                }
            }
            // 是否半选状态
            const script = !isAllSelected && isIndeterminate ? `<script>(function(){var a=document.querySelector(".${allCls}");if(a){a.indeterminate=true}})()</script>` : '';
            tables.push('</table>', script);
            return isPrint ? tables.join('') : createHtmlPage(opts, tables.join(''));
        };
        const toXML = (opts, columns, datas) => {
            let xml = [
                '<?xml version="1.0"?>',
                '<?mso-application progid="Excel.Sheet"?>',
                '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
                '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">',
                '<Version>16.00</Version>',
                '</DocumentProperties>',
                '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">',
                '<WindowHeight>7920</WindowHeight>',
                '<WindowWidth>21570</WindowWidth>',
                '<WindowTopX>32767</WindowTopX>',
                '<WindowTopY>32767</WindowTopY>',
                '<ProtectStructure>False</ProtectStructure>',
                '<ProtectWindows>False</ProtectWindows>',
                '</ExcelWorkbook>',
                `<Worksheet ss:Name="${opts.sheetName}">`,
                '<Table>',
                columns.map((column) => `<Column ss:Width="${column.renderWidth}"/>`).join('')
            ].join('');
            if (opts.isHeader) {
                xml += `<Row>${columns.map((column) => `<Cell><Data ss:Type="String">${getHeaderTitle(opts, column)}</Data></Cell>`).join('')}</Row>`;
            }
            datas.forEach((row) => {
                xml += '<Row>' + columns.map((column) => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('') + '</Row>';
            });
            if (opts.isFooter) {
                const { footerTableData } = reactData;
                const footers = getFooterData($xeTable, opts, footerTableData);
                footers.forEach((row) => {
                    xml += `<Row>${columns.map((column) => `<Cell><Data ss:Type="String">${getFooterCellValue(opts, row, column)}</Data></Cell>`).join('')}</Row>`;
                });
            }
            return `${xml}</Table></Worksheet></Workbook>`;
        };
        const getContent = ($xeTable, opts, columns, datas) => {
            if (columns.length) {
                switch (opts.type) {
                    case 'csv':
                        return toCsv($xeTable, opts, columns, datas);
                    case 'txt':
                        return toTxt($xeTable, opts, columns, datas);
                    case 'html':
                        return toHtml(opts, columns, datas);
                    case 'xml':
                        return toXML(opts, columns, datas);
                }
            }
            return '';
        };
        const downloadFile = (opts, content) => {
            const { filename, type, download } = opts;
            if (!download) {
                const blob = getExportBlobByContent(content, opts);
                return Promise.resolve({ type, content, blob });
            }
            if (VxeUI.saveFile) {
                VxeUI.saveFile({ filename, type, content }).then(() => {
                    if (opts.message !== false) {
                        if (VxeUI.modal) {
                            VxeUI.modal.message({ content: getI18n('vxe.table.expSuccess'), status: 'success' });
                        }
                    }
                });
            }
        };
        const handleExport = (opts) => {
            const $xeGrid = $xeTable.xeGrid;
            const $xeGantt = $xeTable.xeGantt;
            const { remote, columns, colgroups, exportMethod, afterExportMethod } = opts;
            return new Promise(resolve => {
                if (remote) {
                    const params = { options: opts, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt };
                    resolve(exportMethod ? exportMethod(params) : params);
                }
                else {
                    const datas = getExportData(opts);
                    resolve($xeTable.preventEvent(null, 'event.export', { options: opts, columns, colgroups, datas }, () => {
                        return downloadFile(opts, getContent($xeTable, opts, columns, datas));
                    }));
                }
            }).then((params) => {
                clearColumnConvert(columns);
                if (!opts.print) {
                    if (afterExportMethod) {
                        afterExportMethod({ status: true, options: opts, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt });
                    }
                }
                return Object.assign({ status: true }, params);
            }).catch(() => {
                clearColumnConvert(columns);
                if (!opts.print) {
                    if (afterExportMethod) {
                        afterExportMethod({ status: false, options: opts, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt });
                    }
                }
                const params = { status: false };
                return Promise.reject(params);
            });
        };
        const handleImport = (content, opts) => {
            const { tableFullColumn, _importResolve, _importReject } = internalData;
            let rest = { fields: [], rows: [] };
            const tableFieldMaps = {};
            const tableTitleMaps = {};
            tableFullColumn.forEach((column) => {
                const field = column.field;
                const title = column.getTitle();
                if (field) {
                    tableFieldMaps[field] = column;
                }
                if (title) {
                    tableTitleMaps[column.getTitle()] = column;
                }
            });
            const tableConf = {
                fieldMaps: tableFieldMaps,
                titleMaps: tableTitleMaps
            };
            switch (opts.type) {
                case 'csv':
                    rest = parseCsv(tableConf, content);
                    break;
                case 'txt':
                    rest = parseTxt(tableConf, content);
                    break;
                case 'html':
                    rest = parseHTML(tableConf, content);
                    break;
                case 'xml':
                    rest = parseXML(tableConf, content);
                    break;
            }
            const { fields, rows } = rest;
            const status = fields.some(field => tableFieldMaps[field] || tableTitleMaps[field]);
            if (status) {
                $xeTable.createData(rows)
                    .then((data) => {
                    let loadRest;
                    if (opts.mode === 'insert' || opts.mode === 'insertBottom') {
                        loadRest = $xeTable.insertAt(data, -1);
                    }
                    else if (opts.mode === 'insertTop') {
                        loadRest = $xeTable.insert(data);
                    }
                    else {
                        loadRest = $xeTable.reloadData(data);
                    }
                    if (opts.message !== false) {
                        if (VxeUI.modal) {
                            VxeUI.modal.message({ content: getI18n('vxe.table.impSuccess', [rows.length]), status: 'success' });
                        }
                    }
                    return loadRest.then(() => {
                        if (_importResolve) {
                            _importResolve({ status: true });
                        }
                    });
                });
            }
            else if (opts.message !== false) {
                if (VxeUI.modal) {
                    VxeUI.modal.message({ content: getI18n('vxe.error.impFields'), status: 'error' });
                }
                if (_importReject) {
                    _importReject({ status: false });
                }
            }
        };
        const handleFileImport = (file, opts) => {
            const { importMethod, afterImportMethod } = opts;
            const { type, filename } = parseFile(file);
            const importOpts = computeImportOpts.value;
            // 检查类型，如果为自定义导出，则不需要校验类型
            if (!importMethod && !XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)) {
                if (opts.message !== false) {
                    if (VxeUI.modal) {
                        VxeUI.modal.message({ content: getI18n('vxe.error.notType', [type]), status: 'error' });
                    }
                }
                const params = { status: false };
                return Promise.reject(params);
            }
            const rest = new Promise((resolve, reject) => {
                const _importResolve = (params) => {
                    resolve(params);
                    internalData._importResolve = null;
                    internalData._importReject = null;
                };
                const _importReject = (params) => {
                    reject(params);
                    internalData._importResolve = null;
                    internalData._importReject = null;
                };
                internalData._importResolve = _importResolve;
                internalData._importReject = _importReject;
                if (window.FileReader) {
                    const options = Object.assign({ mode: 'insertTop' }, opts, { type, filename });
                    if (options.remote) {
                        if (importMethod) {
                            Promise.resolve(importMethod({ file, options, $table: $xeTable })).then(() => {
                                _importResolve({ status: true });
                            }).catch(() => {
                                _importResolve({ status: true });
                            });
                        }
                        else {
                            _importResolve({ status: true });
                        }
                    }
                    else {
                        const { tableFullColumn } = internalData;
                        $xeTable.preventEvent(null, 'event.import', { file, options, columns: tableFullColumn }, () => {
                            const reader = new FileReader();
                            reader.onerror = () => {
                                errLog('vxe.error.notType', [type]);
                                _importReject({ status: false });
                            };
                            reader.onload = (e) => {
                                handleImport(e.target.result, options);
                            };
                            reader.readAsText(file, options.encoding || 'UTF-8');
                        });
                    }
                }
                else {
                    // 不支持的浏览器
                    errLog('vxe.error.notExp');
                    _importResolve({ status: true });
                }
            });
            return rest.then(() => {
                if (afterImportMethod) {
                    afterImportMethod({ status: true, options: opts, $table: $xeTable });
                }
            }).catch((e) => {
                if (afterImportMethod) {
                    afterImportMethod({ status: false, options: opts, $table: $xeTable });
                }
                return Promise.reject(e);
            });
        };
        const handleFilterColumns = (exportOpts, column, columns) => {
            return columns.some((item) => {
                if (isColumnInfo(item)) {
                    return column.id === item.id;
                }
                else if (XEUtils.isString(item)) {
                    return column.field === item;
                }
                else {
                    const colid = item.id || item.colId;
                    const type = item.type;
                    const field = item.field;
                    if (colid) {
                        return column.id === colid;
                    }
                    else if (field && type) {
                        return column.field === field && column.type === type;
                    }
                    else if (field) {
                        return column.field === field;
                    }
                    else if (type) {
                        return column.type === type;
                    }
                }
                return false;
            });
        };
        const handleFilterFields = (exportOpts, column, includeFields, excludeFields) => {
            if (excludeFields) {
                if (XEUtils.includes(excludeFields, column.field)) {
                    return false;
                }
            }
            if (includeFields) {
                if (XEUtils.includes(includeFields, column.field)) {
                    return true;
                }
                return false;
            }
            return exportOpts.original ? !!column.field : defaultFilterExportColumn(column);
        };
        const handleExportAndPrint = (options, isPrint) => {
            const $xeGrid = $xeTable.xeGrid;
            const $xeGantt = $xeTable.xeGantt;
            const $xeGGWrapper = $xeGrid || $xeGantt;
            const { treeConfig, showHeader, showFooter } = props;
            const { initStore, isGroup, footerTableData, exportStore, exportParams } = reactData;
            const { collectColumn, mergeBodyList, mergeFooterList } = internalData;
            const exportOpts = computeExportOpts.value;
            const hasTree = treeConfig;
            const customOpts = computeCustomOpts.value;
            const selectRecords = $xeTable.getCheckboxRecords();
            const proxyOpts = $xeGGWrapper ? $xeGGWrapper.getComputeMaps().computeProxyOpts.value : {};
            const hasFooter = !!footerTableData.length;
            const hasMerge = !!(mergeBodyList.length || mergeFooterList.length);
            const defOpts = Object.assign({
                message: true,
                isHeader: showHeader,
                isTitle: showHeader,
                isFooter: showFooter,
                isColgroup: isGroup,
                isMerge: hasMerge,
                useStyle: true,
                current: 'current',
                modes: (proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : []).concat(['current', 'selected', 'empty'])
            }, options);
            const types = defOpts.types || XEUtils.keys(exportOpts._typeMaps);
            const modes = defOpts.modes || [];
            const checkMethod = customOpts.checkMethod;
            const exportColumns = collectColumn.slice(0);
            const { columns, excludeFields, includeFields } = defOpts;
            // 处理类型
            const typeList = types.map((value) => {
                return {
                    value,
                    label: getI18n(`vxe.export.types.${value}`)
                };
            });
            const modeList = modes.map((item) => {
                if (item && item.value) {
                    return {
                        value: item.value,
                        label: item.label || item.value
                    };
                }
                return {
                    value: item,
                    label: getI18n(`vxe.export.modes.${item}`)
                };
            });
            // 默认选中
            XEUtils.eachTree(exportColumns, (column, index, items, path, parent) => {
                const isColGroup = column.children && column.children.length > 0;
                let isChecked = false;
                if (columns && columns.length) {
                    isChecked = handleFilterColumns(defOpts, column, columns);
                }
                else if (excludeFields || includeFields) {
                    isChecked = handleFilterFields(defOpts, column, includeFields, excludeFields);
                }
                else {
                    isChecked = column.visible && (isColGroup || defaultFilterExportColumn(column));
                }
                column.checked = isChecked;
                column.halfChecked = false;
                column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ $table: $xeTable, column }) : false);
            });
            // 更新条件
            Object.assign(exportStore, {
                columns: exportColumns,
                typeList,
                modeList,
                hasFooter,
                hasMerge,
                hasTree,
                isPrint,
                hasColgroup: isGroup,
                visible: true
            });
            // 默认参数
            Object.assign(exportParams, {
                mode: selectRecords.length ? 'selected' : 'current'
            }, defOpts);
            const { filename, sheetName, mode, type } = exportParams;
            if (filename) {
                if (XEUtils.isFunction(filename)) {
                    exportParams.filename = filename({
                        options: defOpts,
                        $table: $xeTable,
                        $grid: $xeGrid,
                        $gantt: $xeGantt
                    });
                }
                else {
                    exportParams.filename = `${filename}`;
                }
            }
            if (sheetName) {
                if (XEUtils.isFunction(sheetName)) {
                    exportParams.sheetName = sheetName({
                        options: defOpts,
                        $table: $xeTable,
                        $grid: $xeGrid,
                        $gantt: $xeGantt
                    });
                }
                else {
                    exportParams.sheetName = `${sheetName}`;
                }
            }
            if (!modeList.some(item => item.value === mode)) {
                exportParams.mode = modeList[0].value;
            }
            if (!typeList.some(item => item.value === type)) {
                exportParams.type = typeList[0].value;
            }
            initStore.export = true;
            return nextTick();
        };
        const handleCloseExport = () => {
            if (VxeUI.modal) {
                return VxeUI.modal.close('VXE_EXPORT_MODAL');
            }
            return Promise.resolve();
        };
        const exportMethods = {
            /**
             * 导出文件，支持 csv/html/xml/txt
             * 如果是树表格，则默认是导出所有节点
             * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数转换数据
             * @param {Object} options 参数
             */
            exportData(options) {
                const $xeGrid = $xeTable.xeGrid;
                const $xeGantt = $xeTable.xeGantt;
                const $xeGGWrapper = $xeGrid || $xeGantt;
                const { treeConfig, showHeader, showFooter } = props;
                const { isGroup } = reactData;
                const { tableFullColumn, afterFullData, afterTreeFullData, collectColumn, mergeBodyList, mergeFooterList } = internalData;
                const exportOpts = computeExportOpts.value;
                const treeOpts = computeTreeOpts.value;
                const proxyOpts = $xeGGWrapper ? $xeGGWrapper.getComputeMaps().computeProxyOpts.value : {};
                const hasMerge = !!(mergeBodyList.length || mergeFooterList.length);
                const opts = Object.assign({
                    message: true,
                    isHeader: showHeader,
                    isTitle: showHeader,
                    isFooter: showFooter,
                    isColgroup: isGroup,
                    isMerge: hasMerge,
                    useStyle: true,
                    current: 'current',
                    modes: (proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : []).concat(['current', 'selected', 'empty']),
                    download: true,
                    type: 'csv'
                    // filename: '',
                    // sheetName: '',
                    // original: false,
                    // isAllExpand: false,
                    // data: null,
                    // remote: false,
                    // dataFilterMethod: null,
                    // footerFilterMethod: null,
                    // exportMethod: null,
                    // columnFilterMethod: null,
                    // beforeExportMethod: null,
                    // afterExportMethod: null
                }, exportOpts, options);
                let { filename, sheetName, type, mode, columns, original, columnFilterMethod, beforeExportMethod, includeFields, excludeFields } = opts;
                let groups = [];
                const selectRecords = $xeTable.getCheckboxRecords();
                if (!mode) {
                    mode = selectRecords.length ? 'selected' : 'current';
                }
                let isCustomCol = false;
                let customCols = [];
                if (columns && columns.length) {
                    isCustomCol = true;
                    customCols = columns;
                }
                else {
                    customCols = XEUtils.searchTree(collectColumn, column => {
                        const isColGroup = column.children && column.children.length > 0;
                        let isChecked = false;
                        if (columns && columns.length) {
                            isChecked = handleFilterColumns(opts, column, columns);
                        }
                        else if (excludeFields || includeFields) {
                            isChecked = handleFilterFields(opts, column, includeFields, excludeFields);
                        }
                        else {
                            isChecked = column.visible && (isColGroup || defaultFilterExportColumn(column));
                        }
                        return isChecked;
                    }, { children: 'children', mapChildren: 'childNodes', original: true });
                }
                const handleOptions = Object.assign({}, opts, { filename: '', sheetName: '' });
                // 如果设置源数据，则默认导出设置了字段的列
                if (!isCustomCol && !columnFilterMethod) {
                    columnFilterMethod = ({ column }) => {
                        if (excludeFields) {
                            if (XEUtils.includes(excludeFields, column.field)) {
                                return false;
                            }
                        }
                        if (includeFields) {
                            if (XEUtils.includes(includeFields, column.field)) {
                                return true;
                            }
                            return false;
                        }
                        return original ? !!column.field : defaultFilterExportColumn(column);
                    };
                    handleOptions.columnFilterMethod = columnFilterMethod;
                }
                if (customCols) {
                    handleOptions._isCustomColumn = true;
                    groups = XEUtils.searchTree(XEUtils.mapTree(customCols, (item) => {
                        let targetColumn;
                        if (item) {
                            if (isColumnInfo(item)) {
                                targetColumn = item;
                            }
                            else if (XEUtils.isString(item)) {
                                targetColumn = $xeTable.getColumnByField(item);
                            }
                            else {
                                const colid = item.id || item.colId;
                                const type = item.type;
                                const field = item.field;
                                if (colid) {
                                    targetColumn = $xeTable.getColumnById(colid);
                                }
                                else if (field && type) {
                                    targetColumn = tableFullColumn.find((column) => column.field === field && column.type === type);
                                }
                                else if (field) {
                                    targetColumn = $xeTable.getColumnByField(field);
                                }
                                else if (type) {
                                    targetColumn = tableFullColumn.find((column) => column.type === type);
                                }
                            }
                            return targetColumn || {};
                        }
                    }, {
                        children: 'childNodes',
                        mapChildren: '_children'
                    }), (column, index) => isColumnInfo(column) && (!columnFilterMethod || columnFilterMethod({ $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, column: column, $columnIndex: index })), {
                        children: '_children',
                        mapChildren: 'childNodes',
                        original: true
                    });
                }
                else {
                    groups = XEUtils.searchTree(isGroup ? collectColumn : tableFullColumn, (column, index) => column.visible && (!columnFilterMethod || columnFilterMethod({ $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, column, $columnIndex: index })), { children: 'children', mapChildren: 'childNodes', original: true });
                }
                // 获取所有列
                const cols = [];
                XEUtils.eachTree(groups, column => {
                    const isColGroup = column.children && column.children.length;
                    if (!isColGroup) {
                        cols.push(column);
                    }
                }, { children: 'childNodes' });
                // 构建分组层级
                handleOptions.columns = cols;
                handleOptions.colgroups = convertToRows(groups);
                if (filename) {
                    if (XEUtils.isFunction(filename)) {
                        handleOptions.filename = filename({
                            options: opts,
                            $table: $xeTable,
                            $grid: $xeGrid,
                            $gantt: $xeGantt
                        });
                    }
                    else {
                        handleOptions.filename = `${filename}`;
                    }
                }
                if (!handleOptions.filename) {
                    handleOptions.filename = getI18n(handleOptions.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename', [XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss')]);
                }
                if (sheetName) {
                    if (XEUtils.isFunction(sheetName)) {
                        handleOptions.sheetName = sheetName({
                            options: opts,
                            $table: $xeTable,
                            $grid: $xeGrid,
                            $gantt: $xeGantt
                        });
                    }
                    else {
                        handleOptions.sheetName = `${sheetName}`;
                    }
                }
                if (!handleOptions.sheetName) {
                    handleOptions.sheetName = document.title || '';
                }
                // 检查类型，如果为自定义导出，则不需要校验类型
                if (!handleOptions.exportMethod && !XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)) {
                    errLog('vxe.error.notType', [type]);
                    if (['xlsx', 'pdf'].includes(type)) {
                        warnLog('vxe.error.reqPlugin', [4, 'plugin-export-xlsx']);
                    }
                    const params = { status: false };
                    return Promise.reject(params);
                }
                if (!handleOptions.print) {
                    if (beforeExportMethod) {
                        beforeExportMethod({ options: handleOptions, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt });
                    }
                }
                if (!handleOptions.data) {
                    handleOptions.data = [];
                    if (mode === 'selected') {
                        if (['html', 'pdf'].indexOf(type) > -1 && treeConfig) {
                            handleOptions.data = XEUtils.searchTree($xeTable.getTableData().fullData, item => $xeTable.findRowIndexOf(selectRecords, item) > -1, Object.assign({}, treeOpts, { data: '_row' }));
                        }
                        else {
                            handleOptions.data = selectRecords;
                        }
                    }
                    else if (mode === 'all') {
                        if (!$xeGGWrapper) {
                            errLog('vxe.error.errProp', ['all', 'mode=current,selected']);
                        }
                        if ($xeGGWrapper && !handleOptions.remote) {
                            const gridReactData = $xeGGWrapper.reactData;
                            const { computeProxyOpts } = $xeGGWrapper.getComputeMaps();
                            const proxyOpts = computeProxyOpts.value;
                            const { sortData } = gridReactData;
                            const { beforeQueryAll, afterQueryAll, ajax = {} } = proxyOpts;
                            const resConfigs = proxyOpts.response || proxyOpts.props || {};
                            const ajaxMethods = ajax.queryAll;
                            const queryAllSuccessMethods = ajax.queryAllSuccess;
                            const queryAllErrorMethods = ajax.queryAllError;
                            if (!ajaxMethods) {
                                errLog('vxe.error.notFunc', ['proxy-config.ajax.queryAll']);
                            }
                            if (ajaxMethods) {
                                const params = {
                                    $table: $xeTable,
                                    $grid: $xeGrid,
                                    $gantt: $xeGantt,
                                    sort: sortData.length ? sortData[0] : {},
                                    sorts: sortData,
                                    filters: gridReactData.filterData,
                                    form: gridReactData.formData,
                                    options: handleOptions
                                };
                                return Promise.resolve((beforeQueryAll || ajaxMethods)(params))
                                    .then(rest => {
                                    const listProp = resConfigs.list;
                                    let tdData = [];
                                    if (listProp) {
                                        if (XEUtils.isFunction(listProp)) {
                                            tdData = listProp({ data: rest, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt });
                                        }
                                        else {
                                            tdData = XEUtils.isArray(rest) ? rest : XEUtils.get(rest, listProp);
                                        }
                                    }
                                    else {
                                        if (XEUtils.isArray(rest)) {
                                            tdData = rest;
                                        }
                                    }
                                    handleOptions.data = tdData;
                                    if (afterQueryAll) {
                                        afterQueryAll(params);
                                    }
                                    if (queryAllSuccessMethods) {
                                        queryAllSuccessMethods(Object.assign(Object.assign({}, params), { response: rest }));
                                    }
                                    return handleExport(handleOptions);
                                })
                                    .catch((rest) => {
                                    if (queryAllErrorMethods) {
                                        queryAllErrorMethods(Object.assign(Object.assign({}, params), { response: rest }));
                                    }
                                });
                            }
                        }
                    }
                    if (mode === 'current') {
                        handleOptions.data = treeConfig ? afterTreeFullData : afterFullData;
                    }
                }
                else {
                    handleOptions._isCustomData = true;
                }
                return handleExport(handleOptions);
            },
            importByFile(file, options) {
                const opts = Object.assign({}, options);
                const { beforeImportMethod } = opts;
                if (beforeImportMethod) {
                    beforeImportMethod({ options: opts, $table: $xeTable });
                }
                return handleFileImport(file, opts);
            },
            importData(options) {
                const importOpts = computeImportOpts.value;
                const opts = Object.assign({
                    types: XEUtils.keys(importOpts._typeMaps)
                    // beforeImportMethod: null,
                    // afterImportMethod: null
                }, importOpts, options);
                const { beforeImportMethod, afterImportMethod } = opts;
                if (beforeImportMethod) {
                    beforeImportMethod({ options: opts, $table: $xeTable });
                }
                return VxeUI.readFile(opts).catch(e => {
                    if (afterImportMethod) {
                        afterImportMethod({ status: false, options: opts, $table: $xeTable });
                    }
                    return Promise.reject(e);
                }).then((params) => {
                    const { file } = params;
                    return handleFileImport(file, opts);
                });
            },
            saveFile(options) {
                return VxeUI.saveFile(options);
            },
            readFile(options) {
                return VxeUI.readFile(options);
            },
            print(options) {
                const $xeGrid = $xeTable.xeGrid;
                const $xeGantt = $xeTable.xeGantt;
                const printOpts = computePrintOpts.value;
                const opts = Object.assign({
                    original: false
                    // beforePrintMethod
                }, printOpts, options, {
                    type: 'html',
                    download: false,
                    remote: false,
                    print: true
                });
                const { sheetName } = opts;
                let printTitle = '';
                if (sheetName) {
                    if (XEUtils.isFunction(sheetName)) {
                        printTitle = sheetName({
                            options: opts,
                            $table: $xeTable,
                            $grid: $xeGrid,
                            $gantt: $xeGantt
                        });
                    }
                    else {
                        printTitle = `${sheetName}`;
                    }
                }
                if (!printTitle) {
                    printTitle = document.title || '';
                }
                const beforePrintMethod = opts.beforePrintMethod;
                const tableHtml = opts.html || opts.content;
                return new Promise((resolve, reject) => {
                    if (VxeUI.print) {
                        if (tableHtml) {
                            resolve(VxeUI.print({
                                title: printTitle,
                                html: tableHtml,
                                customStyle: opts.style,
                                beforeMethod: beforePrintMethod
                                    ? ({ html }) => {
                                        return beforePrintMethod({
                                            html,
                                            content: html,
                                            options: opts,
                                            $table: $xeTable,
                                            $grid: $xeGrid,
                                            $gantt: $xeGantt
                                        });
                                    }
                                    : undefined
                            }));
                        }
                        else {
                            resolve(exportMethods.exportData(opts).then(({ content }) => {
                                return VxeUI.print({
                                    title: printTitle,
                                    html: content,
                                    customStyle: opts.style,
                                    beforeMethod: beforePrintMethod
                                        ? ({ html }) => {
                                            return beforePrintMethod({
                                                html,
                                                content: html,
                                                options: opts,
                                                $table: $xeTable,
                                                $grid: $xeGrid,
                                                $gantt: $xeGantt
                                            });
                                        }
                                        : undefined
                                });
                            }));
                        }
                    }
                    else {
                        const e = { status: false };
                        reject(e);
                    }
                });
            },
            getPrintHtml(options) {
                const printOpts = computePrintOpts.value;
                const opts = Object.assign({
                    original: false
                    // beforePrintMethod
                }, printOpts, options, {
                    type: 'html',
                    download: false,
                    remote: false,
                    print: true
                });
                return $xeTable.exportData(opts).then(({ content }) => {
                    return {
                        html: content
                    };
                });
            },
            closeImport() {
                if (VxeUI.modal) {
                    return VxeUI.modal.close('VXE_IMPORT_MODAL');
                }
                return Promise.resolve();
            },
            openImport(options) {
                const { treeConfig, importConfig } = props;
                const { initStore, importStore, importParams } = reactData;
                const importOpts = computeImportOpts.value;
                const defOpts = Object.assign({
                    mode: 'insertTop',
                    message: true,
                    types: XEUtils.keys(importOpts._typeMaps),
                    modes: ['insertTop', 'covering']
                }, importOpts, options);
                const types = defOpts.types || [];
                const modes = defOpts.modes || [];
                const isTree = !!treeConfig;
                if (isTree) {
                    if (defOpts.message) {
                        if (VxeUI.modal) {
                            VxeUI.modal.message({ content: getI18n('vxe.error.treeNotImp'), status: 'error' });
                        }
                    }
                    return;
                }
                if (!importConfig) {
                    errLog('vxe.error.reqProp', ['import-config']);
                }
                // 处理类型
                const typeList = types.map((value) => {
                    return {
                        value,
                        label: getI18n(`vxe.export.types.${value}`)
                    };
                });
                const modeList = modes.map((item) => {
                    if (item && item.value) {
                        return {
                            value: item.value,
                            label: item.label || item.value
                        };
                    }
                    return {
                        value: item,
                        label: getI18n(`vxe.import.modes.${item}`)
                    };
                });
                Object.assign(importStore, {
                    file: null,
                    type: '',
                    filename: '',
                    modeList,
                    typeList,
                    visible: true
                });
                Object.assign(importParams, defOpts);
                if (!modeList.some(item => item.value === importParams.mode)) {
                    importParams.mode = modeList[0].value;
                }
                initStore.import = true;
            },
            closeExport: handleCloseExport,
            openExport(options) {
                const exportOpts = computeExportOpts.value;
                const defOpts = Object.assign({
                    message: true,
                    types: XEUtils.keys(exportOpts._typeMaps)
                }, exportOpts, options);
                if (!props.exportConfig) {
                    errLog('vxe.error.reqProp', ['export-config']);
                }
                return handleExportAndPrint(defOpts);
            },
            closePrint: handleCloseExport,
            openPrint(options) {
                const printOpts = computePrintOpts.value;
                const defOpts = Object.assign({
                    message: true
                }, printOpts, options);
                if (!props.printConfig) {
                    errLog('vxe.error.reqProp', ['print-config']);
                }
                return handleExportAndPrint(defOpts, true);
            }
        };
        return exportMethods;
    },
    setupGrid($xeGrid) {
        return $xeGrid.extendTableMethods(tableExportMethodKeys);
    },
    setupGantt($xeGantt) {
        return $xeGantt.extendTableMethods(tableExportMethodKeys);
    }
});
