import Stack from "../utils/dataStructure/Stack.js";
const recordLimit = 20;
let undoStack = new Stack();
let rollbackStack = new Stack();

/**
 * 添加记录
 * @param {*} data
 */
export function addRecord(data) {
  if (undoStack.size() >= recordLimit) {
    undoStack.shift();
  }
  undoStack.push(data);
  rollbackStack.clear();
}

/**
 * 撤销
 */
export function undoRecord() {
  if (undoStack.empty()) return;
  const data = undoStack.top();
  rollbackStack.push(data);
}

/**
 * 回退
 */
export function rollbackRecord() {
  if (rollbackStack.empty()) return;
  const data = rollbackStack.top();
  undoStack.push(data);
}
