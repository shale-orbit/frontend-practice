// 消费记账 - 示例数据（包含合法和非法记录用于测试防御性编程）
const expenses = [
    { amount: 50, category: '餐饮', desc: '午餐面条' },
    { amount: 120, category: '交通', desc: '打车去机场' },
    { amount: -20, category: '餐饮', desc: '测试负数金额' },   // 非法：负数
    { amount: 'abc', category: '其他', desc: '测试字符串金额' }, // 非法：非数字
    { amount: 200, category: '购物', desc: '买衣服' },
    { amount: 0, category: '餐饮', desc: '测试零元' },          // 非法：零元
    { amount: 35, category: '餐饮', desc: '奶茶' },
    { amount: 80, category: '交通', desc: '地铁充卡' },
    { amount: true, category: '餐饮', desc: '测试布尔值金额' }, // 非法：布尔值
];

/**
 * 清洗消费记录：过滤掉非法数据
 * 非法标准：amount 不是数字、amount <= 0、amount 是 NaN
 * 使用数组方法 filter
 * @param {Array} list - 原始消费记录数组
 * @returns {Array} - 清洗后的合法记录数组
 */
const cleanExpenses = (list) => {
    return list.filter(item => {
        const isNumber = typeof item.amount === 'number' && !isNaN(item.amount);
        const isPositive = item.amount > 0;
        return isNumber && isPositive;
    });
};

// 验证数据和清洗效果
console.log('=== 原始数据 ===');
console.table(expenses);
console.log(`原始共 ${expenses.length} 条记录`);

console.log('=== 清洗后数据 ===');
const validExpenses = cleanExpenses(expenses);
console.table(validExpenses);
console.log(`清洗后共 ${validExpenses.length} 条记录`);
