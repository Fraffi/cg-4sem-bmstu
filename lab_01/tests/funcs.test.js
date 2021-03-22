import {push_coords} from '../scripts/funcs.js';

var array = [];
var arr_len = 5
for (let i = 0; i < arr_len; i++)
    array[i] = {x: i, y: i + 1};

test('Checks if it is in an array.', () => {
    expect(push_coords(31, 2, array.length, array)).toBe(0);
});

test('Checks if it is not in an array.', () => {
    expect(push_coords(1, 2, array.length, array)).toBe(1);
});

test('Adding number in array.', () => {
    push_coords(100, 2, array.length, array);
    expect(array.length).toBe(arr_len + 2);
});