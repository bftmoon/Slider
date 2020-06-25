import ObjectsUtil from './ObjectsUtil';

describe('ObjectsUtil class', () => {
  test('update', () => {
    const updated = ObjectsUtil.update(
      {
        saved: 0,
        changed: 1,
        undef: { saved: 9 },
        deep: {
          saved: 2,
          changed: 3,
          mas: ['a', 'b', 'c'],
          deeper: {
            saved: 4,
            changed: 5,
          },
        },
      },
      {
        changed: 6,
        undef: undefined,
        ignored: 10,
        deep: {
          changed: 7,
          mas: ['k', 'l'],
          deeper: {
            changed: 8,
          },
        },
      },
    );
    expect(updated).toEqual(
      {
        saved: 0,
        changed: 6,
        undef: { saved: 9 },
        deep: {
          saved: 2,
          changed: 7,
          mas: ['k', 'l'],
          deeper: {
            saved: 4,
            changed: 8,
          },
        },
      },
    );
  });
});
