# recordCourse
一个教你如何优雅的实现撤销、回退记录的教程（如同浏览器的撤销回退）
## 功能点描述
大家应该都使用过浏览器的后退和前进功能，它就是我们今天的主题：撤销和回退。其实不光是在浏览器里面，在众多的工具软件内也都有类似的功能，远的不说，例如：vscode、ppt。
## 实现思路
在说实现思路之前，我先上一张图：
    
![](https://user-gold-cdn.xitu.io/2018/12/22/167d537e28164f34?w=950&h=630&f=png&s=118431)
眼尖的同学可能已经看到了 Stack ，是的，你想的没错，其实撤销和回退功能就是对 Stack 的使用场景之一。
首先我们需要两个 Stack（可撤销栈和可回退栈）

>为了更直观的展示，我用点击小球代替了对网站的访问。

A 为红色小球；B 为绿色小球；C 为蓝色小球

 1. 当点击 A 之后再点击 B，把 A 和 B  添加到‘可撤销栈’（等同于先访问了 A 网站，后又访问了 B 网站），当前展示的为 B


![](https://user-gold-cdn.xitu.io/2018/12/22/167d55afe78970eb?w=299&h=889&f=png&s=16018)

 2. 当执行撤销功能时让‘可撤销栈’出栈并且把出栈的 B 添加到‘可回退栈’内，当前展示的为 A
 

![](https://user-gold-cdn.xitu.io/2018/12/22/167d556b8624e4ae?w=299&h=893&f=png&s=15632)
 3. 当执行回退功能时让‘可回退栈’出栈并且把出栈的 B 添加到‘可撤销栈’内，当前展示的为 B
 
![](https://user-gold-cdn.xitu.io/2018/12/22/167d55d8b034c0ff?w=299&h=889&f=png&s=16018)
 4. 当我们访问了 A 和 B 之后，这时候撤销了 B ，回到了 A ，并且又点击了 C ，这时候我们需要清空‘可回退栈’，并且把 C 添加到‘可撤销栈’
 
![](https://user-gold-cdn.xitu.io/2018/12/22/167d56221d7cae4c?w=299&h=890&f=png&s=15994)
## code
### 先实现一个特殊的栈

为什么叫它是特殊的栈呢，因为传统的栈是没有 #shift() 功能的。那这里为什么需要有这个函数呢，请带着问题继续往下看。
> 这里偷懒直接使用了 Array 的内置函数，传统上来讲的话不应该使用 - -#
```js
     function createStack() {
                var list = [];
                return {
                    /**
                     * 入栈
                     * @param {*} data
                     */
                    push(data) {
                        list.push(data);
                    },

                    /**
                     * 出栈
                     */
                    pop() {
                        return list.pop();
                    },

                    size() {
                        return list.length;
                    },

                    empty() {
                        return list.length === 0;
                    },

                    clear() {
                        list = [];
                    },
                    //删除头结点（栈底）
                    shift() {
                        list.shift();
                    },

                    peek() {
                        return list[list.length - 1];
                    },

                    getList() {
                        return list;
                    }
                }
            }
```
### record对象
```
     function createRecord() {
                let undoStack = createStack();
                let rollbackStack = createStack();
                const MAX_LIMIT = 6;//最大限制点
                return {
                    //获取可撤销栈 栈顶的数据
                    //用于展示
                    getTopValue() {
                        return undoStack.peek();
                    },
                    //添加记录
                    //把数据直接添加到可撤销栈内
                    //并且清空可回退栈
                    addRecord(data) {
                        //当可撤销栈的大小大于最大的限制的话
                        //那么需要删除头结点
                        if (undoStack.size() >= MAX_LIMIT) {
                            undoStack.shift();
                        }
                        undoStack.push(data);
                        rollbackStack.clear();
                    },
                    //撤销
                    //检测可撤销栈是否为空，为空的话什么也不做
                    //不然把可撤销栈出栈的数据添加到可回退栈内
                    undoRecord() {
                        if (undoStack.empty()) return;
                        const data = undoStack.pop();
                        rollbackStack.push(data);
                    },
                    //回退
                    //检测可回退栈是否为空，为空的话什么也不做
                    //把可回退栈出栈的数据添加到可撤销栈内
                    rollbackRecord() {
                        if (rollbackStack.empty()) return;
                        const data = rollbackStack.pop();
                        undoStack.push(data);
                    },
                    getUndoStack() {
                        return undoStack.getList();
                    },
                    getrollbackStack() {
                        return rollbackStack.getList();
                    }
                }
            }
```
我们在使用 vscode 写代码的时候有没有发现撤销到一定的数量时，就撤销不回去了。是的，这个逻辑就是在 #addRecord() 内处理的。当‘可撤销栈’的大小大于限制数时，那么需要抛弃掉最初的数据，也就是删除头结点。这也是说明为什么我们实现的 Stack 内有 #shift() 功能。
## 总结
以上的逻辑是在公司项目逻辑中抽离出来的，因为接手的好几个项目都要实现此功能。当然了公司项目中我又加了 Command 模式来搭配使用，如果大家有兴趣的话，后续我可以在更新如何搭配 Command 模式使用。
## 链接
[Demo展示链接](https://cuixiaorui.github.io/recordCourse)
