import { returnDailyGoals } from './nutritionalneeds';
import { cloneDeep } from 'lodash';

const nutrientReducer = (accumulator, current) => {
  const nutrients = current.totalNutrients;
  for (const [key, value] of Object.entries(nutrients)) {
    if (key !== '_id') {
      accumulator[key].met = accumulator[key].met + value;
    }
  }
  return accumulator;
};

export const calcTotalsByNutrient = ({ items, birthdate, sex }) => {
  const dailyGoals = returnDailyGoals({ birthdate, sex });
  return items.reduce(nutrientReducer, cloneDeep(dailyGoals));
};

export const calcTotalProgress = (nutrientTotals) => {
  let runningPercentTotal = 0;
  let nutrients = Object.keys(nutrientTotals);
  for (const nutrient of nutrients) {
    const percentage = nutrientTotals[nutrient].met / nutrientTotals[nutrient].goal;
    runningPercentTotal += percentage > 1 ? 1 : percentage;
  }
  return Math.floor(runningPercentTotal / nutrients.length * 100);
};