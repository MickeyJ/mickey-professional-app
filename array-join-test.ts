interface ArrayItem {
  id: number;
  index: number;
  name: string;
}

interface SelectedData {
  [key: number]: ArrayItem;
}

const arrayOne: ArrayItem[] = [
  {
    id: 5,
    index: 0,
    name: 'bob',
  },
  {
    id: 3,
    index: 1,
    name: 'suzy',
  },
  {
    id: 1,
    index: 2,
    name: 'jane',
  },
  {
    id: 2,
    index: 3,
    name: 'orb',
  },
  {
    id: 6,
    index: 4,
    name: 'jinket',
  },
];

const arrayTwo: ArrayItem[] = [
  {
    id: 100,
    index: 0,
    name: 'beans',
  },
  {
    id: 9,
    index: 1,
    name: 'fruit',
  },
  {
    id: 56,
    index: 2,
    name: 'jack',
  },
  {
    id: 25,
    index: 3,
    name: 'bubbles',
  },
  {
    id: 68,
    index: 4,
    name: 'fester',
  },
];

maintainOrder(arrayOne)(arrayTwo).forEach((item) => {
  console.log(item);
});

function maintainOrder(aOne: ArrayItem[]) {
  // Maintain selection and position of selected data when result array changes
  let result = aOne;
  const selected: SelectedData = {};
  selected[1] = aOne[1];
  selected[3] = aOne[3];

  console.log('selected pre data change', selected);

  return function (aTwo: ArrayItem[]) {
    result = [];
    // insert selected items into result array at the same index
    return [...aTwo, ...Object.values(selected)].map((_, index) => {
      console.log('index', index);

      if (selected[index]) {
        return selected[index];
      } else {
        return aTwo.shift();
      }
    });
  };
}
