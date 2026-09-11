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
//计算总支出金额
//使用数组方法 reduce 累加所有 amount
const calcTotal = (list) => {
    return list.reduce((sum, item) => sum + item.amount, 0);
};

//按天分组统计每天支出
//使用数组方法 reduce 遍历累加
const groupByDay = (list) => {
    return list.reduce((days, item) => {
        const d = item.day;
        days[d] = (days[d] || 0) + item.amount;
        return days;
    }, {});
};

//按类别分组统计每类支出
//使用数组方法 reduce 遍历累加
const groupByCategory = (list) => {
    return list.reduce((cats, item) => {
        const c = item.category;
        cats[c] = (cats[c] || 0) + item.amount;
        return cats;
    }, {});
};

//找出最高单笔消费
//使用数组方法 reduce 逐个比较
const findHighest = (list) => {
    if (list.length === 0) return null;
    return list.reduce((max, item) => item.amount > max.amount ? item : max, list[0]);
};
//格式化消费报告
const generateReport = (list) => {
    const valid = cleanExpenses(list);
    if (valid.length === 0) {
        return '没有有效消费记录';
    }

    const total = calcTotal(valid);
    const byDay = groupByDay(valid);
    const byCategory = groupByCategory(valid);
    const highest = findHighest(valid);
    const validDays = Object.keys(byDay).length;
    const dailyAvg = (total / validDays).toFixed(2);

    // 使用 map 把分组对象转成可读的明细字符串
    const dayDetails = Object.keys(byDay)
        .map(d => `${d}:${byDay[d]}元`)
        .join(',');

    const categoryDetails = Object.keys(byCategory)
        .map(c => `${c}:${byCategory[c]}元`)
        .join(',');

    // 找出花钱最多的类别
    const topCategory = Object.keys(byCategory)
        .reduce((top, cat) => byCategory[cat] > byCategory[top] ? cat : top, Object.keys(byCategory)[0]);

    return `【一周消费报告】
有效消费 ${valid.length} 笔（过滤非法 ${list.length - valid.length} 条）；
总支出 ${total} 元，日均 ${dailyAvg} 元；
每日明细：${dayDetails};
类别明细：${categoryDetails};
最高单笔：${highest.amount}元 (${highest.desc});
花钱最多的类别：${topCategory}(${byCategory[topCategory]}元)`;
};

// 主程序：用 try-catch 包裹，防止运行时出错导致程序崩溃
try {
    console.log(generateReport(expenses));
} catch (err) {
    console.error('报告生成失败：', err.message);
}
