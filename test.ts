/*
    Нужно сравнить на пересечение 2 массива: 1m - заданный диапазон [reqS, reqE], 2m - диапазон из предложенных курсов [start, end]
    Рассматривается следующая последовательность действий:
    1) если 2m неорграничен те [null, null] то он автоматически подходит
    2-3) если 1m ограничен сверху или снизу, соотвественно [null, reqE] и [reqS, null], то проводится сранение соотвественно reqE >= start и reqS <= end,
    если start или end равен null, то соответвующие диапазоны точно пересекаются 
    4) 1m - отрезок, те огранчен сверху и снизу -> возможны 3 случая:
        4.1-2) ограничение 2m сверху или снизу, пересечение определяется по логике пунков 1-2
        4.3) 2m тоже отрезок и по формуле (reqS - end) * (reqE - start) < 0 определеяется пересечение
*/

interface Course {
  name: string;
  prices: Array<number | null>;
}
// Список курсов
let courses: Array<Course> = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];
let requiredRange4 = [150, 550];
let requiredRange5 = [500, 550];

const filterFunc = (
  base: Array<Course>,
  range: Array<number | null>
): Array<Course> => {
  try {
    let filteredArr = [];
    let [reqS, reqE] = [range[0], range[1]];
    console.log(reqS, reqE);
    console.log("----------");
    for (let i = 0; i < base.length; i++) {
      let [start, end] = base[i].prices;
      if (
        // все значения
        (start == null && end == null) ||
        // ограничение сверху
        (reqS == null && reqE !== null && (start == null || reqE >= start)) ||
        // ограничение снизу
        (reqS != null && reqE == null && (end == null || reqS <= end)) ||
        // отрезок
        (reqS !== null &&
          reqE !== null &&
          // огрначение снизу
          ((start == null && end !== null && reqS <= end) ||
            // ограничение сверху
            (start != null && end == null && reqE >= start) ||
            // сравнение двух отрезков
            (start !== null &&
              end !== null &&
              (reqS - end) * (reqE - start) < 0)))
      ) {
        filteredArr.push(base[i]);
      }
    }
    return filteredArr;
  } catch (err) {
    console.log({ message: err.message });
  }
};

let filteredArr: Array<Course> = filterFunc(courses, requiredRange1);
console.log(filteredArr);
