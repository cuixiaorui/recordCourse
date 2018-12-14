class Stack {
    constructor() {
      this._list = [];
    }
  
    /**
     * 入栈
     * @param {*} data
     */
    push(data) {
      this._list.push(data);
    }
  
    /**
     * 出栈
     */
    top() {
      return this._list.pop();
    }
  
    size() {
      return this._list.length;
    }
  
    empty() {
      return this._list.length === 0;
    }
  
    /**
     * 清空
     */
    clear() {
      this._list = [];
    }
  
    /**
     * 删除栈的第一个元素（栈底）
     */
    shift() {
      this._list.shift();
    }
  
    toStirng() {
      console.log(...this._list);
    }
  }
  
  export default Stack;
  