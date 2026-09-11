const expenses = [
    { amount: 12,  category: '餐饮', desc: '周一午餐面条',   day: '周一' },
    { amount: -20, category: '餐饮', desc: '测试负数金额',   day: '周二' },   // 非法：负数
    { amount: 15,  category: '餐饮', desc: '周二奶茶',       day: '周二' },
    { amount: 'abc', category: '购物', desc: '测试字符串金额', day: '周三' },   // 非法：非数字
    { amount: 100, category: '购物', desc: '周三买衣服',     day: '周三' },
    { amount: 0,   category: '餐饮', desc: '测试零元',       day: '周四' },    // 非法：零元
    { amount: 30,  category: '餐饮', desc: '周五晚餐',       day: '周五' },
    { amount: 35, category: '娱乐', desc: '周六看电影',     day: '周六' },
    { amount: 5,  category: '餐饮', desc: '周日早餐',       day: '周日' },
];

//清洗消费记录：过滤掉非法数据
//使用数组方法 filter
const cleanExpenses = (list) => {
    return list.filter(item => {
        const isNumber = typeof item.amount === 'number' && !isNaN(item.amount);
        const isPositive = item.amount > 0;
        return isNumber && isPositive;
    });
};

