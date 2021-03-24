const GlobalNeeds = {
  'vitaminB12': {
    goal: 1.5,
    met: 0,
    unit: 'µg',
  },
  'folate': {
    goal: 200,
    met: 0,
    unit: 'µg',
  },
  'vitaminC': {
    goal: 40,
    met: 0,
    unit: 'mg',
  },
  'calcium': {
    goal: 700,
    met: 0,
    unit: 'mg',
  },
  'potassium': {
    goal: 3500,
    met: 0,
    unit: 'mg'
  },
  'sodium': {
    goal: 2400,
    met: 0,
    unit: 'mg',
  },
  'fiber': {
    goal: 30,
    met: 0,
    unit: 'g',
  },
};

const MaleNeeds = {
  'vitaminA': {
    goal: 700,
    met: 0,
    unit: 'µg',
  },
  'vitaminB6': {
    goal: 1.4,
    met: 0,
    unit: 'mg',
  },
  'riboflavin': {
    goal: 1.3,
    met: 0,
    unit: 'mg',
  },
  'zinc': {
    goal: 9.5,
    met: 0,
    unit: 'mg',
  },
  'magnesium': {
    goal: 300,
    met: 0,
    unit: 'mg',
  },
};

const FemaleNeeds = {
  'vitaminA': {
    goal: 600,
    met: 0,
    unit: 'µg',
  },
  'vitaminB6': {
    goal: 1.2,
    met: 0,
    unit: 'mg',
  },
  'riboflavin': {
    goal: 1.1,
    met: 0,
    unit: 'mg',
  },
  'zinc': {
    goal: 7,
    met: 0,
    unit: 'mg',
  },
  'magnesium': {
    goal: 270,
    met: 0,
    unit: 'mg',
  },
};

const AdultMaleNeeds = {
  'protein': {
    goal: 55.5,
    met: 0,
    unit: 'g'
  },
  'thiamin': {
    goal: 1,
    met: 0,
    unit: 'mg',
  },
  'niacin': {
    goal: 16.5,
    met: 0,
    unit: 'mg',
  },
  'iron': {
    goal: 8.7,
    met: 0,
    unit: 'mg',
  },
};

const AdultFemaleNeeds = {
  'protein': {
    goal: 45,
    met: 0,
    unit: 'g'
  },
  'thiamin': {
    goal: 0.8,
    met: 0,
    unit: 'mg',
  },
  'niacin': {
    goal: 13.2,
    met: 0,
    unit: 'mg',
  },
  'iron': {
    goal: 14.8,
    met: 0,
    unit: 'mg',
  },
};

const FiftyFemaleNeeds = {
  'iron': {
    goal: 8.7,
    met: 0,
    unit: 'mg',
  },
};

const SixtyFiveFemaleNeeds = {
  'protein': {
    goal: 46.5,
    met: 0,
    unit: 'g'
  },
  'niacin': {
    goal: 12.6,
    met: 0,
    unit: 'mg',
  },
};

const SeventyFiveFemaleNeeds = {
  'niacin': {
    goal: 12.1,
    met: 0,
    unit: 'mg',
  },
  'thiamin': {
    goal: 0.7,
    met: 0,
    unit: 'mg',
  },
};

const SixtyFiveMaleNeeds = {
  'protein': {
    goal: 53.3,
    met: 0,
    unit: 'g'
  },
  'thiamin': {
    goal: 0.9,
    met: 0,
    unit: 'mg',
  },
  'niacin': {
    goal: 15.5,
    met: 0,
    unit: 'mg',
  },
};

const SeventyFiveMaleNeeds = {
  'niacin': {
    goal: 15.1,
    met: 0,
    unit: 'mg',
  }
};

export const returnDailyGoals = ({ birthdate, sex }) => {
  const age =  Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10);
  console.log(age);
  if (sex !== 'female') {
    console.log('not a female')
    if (age < 65) {
      console.log("'I'm here!");
      return {
        ...GlobalNeeds,
        ...MaleNeeds,
        ...AdultMaleNeeds,
      };
    } else if (age < 75) {
      return {
        ...GlobalNeeds,
        ...MaleNeeds,
        ...SixtyFiveMaleNeeds,
      };
    } else {
      return {
        ...GlobalNeeds,
        ...MaleNeeds,
        ...AdultMaleNeeds,
        ...SixtyFiveMaleNeeds,
        ...SeventyFiveMaleNeeds,
      };
    }
  }
  if (age < 50) {
    return {
      ...GlobalNeeds,
      ...FemaleNeeds,
      ...AdultFemaleNeeds,
    };
  } else if (age < 65) {
    return {
      ...GlobalNeeds,
      ...FemaleNeeds,
      ...AdultFemaleNeeds,
      ...FiftyFemaleNeeds,
    };
  } else if (age < 75) {
    return {
    ...GlobalNeeds,
      ...FemaleNeeds,
      ...AdultFemaleNeeds,
      ...FiftyFemaleNeeds,
      ...SixtyFiveFemaleNeeds,
    };
  } else {
    return {
      ...GlobalNeeds,
      ...FemaleNeeds,
      ...AdultFemaleNeeds,
      ...FiftyFemaleNeeds,
      ...SixtyFiveFemaleNeeds,
      ...SeventyFiveFemaleNeeds,
    };
  }
};