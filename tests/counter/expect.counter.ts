import { expect } from 'chai';

export class ExpectCounter {

  actual: number;

  expected: number;

  constructor(expected: number) {
    this.actual = 0;
    this.expected = expected;
  }

  expect(val: any, message?: string) {
    this.actual++;
    return expect(val, message);
  }

  assert() {
    expect(this.actual).to.equal(this.expected);
  }
}
