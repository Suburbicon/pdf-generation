const CAR_VARIANT_TITLES = [
  'Общий',
  'Сидячий',
  'Плацкарт',
  'Купе',
  'Мягкий',
  'Люкс',
];

function getTrainPrefix(tripsCount: number, index: number) {
  if (tripsCount === 2 && index === 0) {
    return 'Туда, поезд';
  }

  if (index === 1) {
    return 'Обратно, поезд';
  }

  return 'Поезд';
}

function getCarVariantTitle(id: number) {
  return CAR_VARIANT_TITLES[id - 1];
}

export const railwaysLib = { getCarVariantTitle, getTrainPrefix };
