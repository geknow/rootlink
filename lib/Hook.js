/**
 * Created by webhugo on 12/26/16.
 */
let Hook = function () {
    let _initHook = function (method) {
        if(!method["__hook__"]){
            method["__hook__"] = {
                actions: [],
                filters: []
            }
        }
    };
    /**
     * 比较函数，保证优先级大的在前面
     * @param hook1
     * @param hook2
     * @returns {number}
     * @private
     */
    let _compare = function (hook1, hook2) {
        return hook2.priority - hook1.priority;
    };

    /**
     * 给方法添加一个钩子函数
     * @param method
     * @param action
     * @param priority
     */
    let addAction = function (method,action,priority) {
        _initHook(method);
        let actions = method["__hook__"].actions;
        actions.push({
            action: action,
            priority: priority || 10
        });
        action.sort(_compare());
    };
    
    
}();

module.exports = Hook;