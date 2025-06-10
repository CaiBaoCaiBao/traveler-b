/**
 * 将行数据转换从成列数据
 */
// function convertRowToColumn<T extends Record<string, any>>(
//     rows: T[]
// ): {
//         [K in keyof T]: T[K][]
//     } {
//     if (rows.length === 0) {
//         return {} as { [K in keyof T]: T[K][] }
//     }
//     // 获取列名
//     const columns = Object.keys(rows[0]) as (keyof T)[];
//     // 初始化返回结果对象
//     const result = {} as { [K in keyof T]: T[K][] };
//     // 初始化每列的值
//     columns.forEach((column) => {
//         result[column] = [];
//     })
//     // 将每行数据转换成列数据
//     rows.forEach(row => {
//         columns.forEach((column) => {
//             result[column].push(row[column])
//         })
//     })

//     return result;
// }

// export default convertRowToColumn;