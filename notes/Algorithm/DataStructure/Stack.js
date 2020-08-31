/**
 * class로 구현한 stack
 */
class Stack {
  constructor() {
    this._arr = [];
  }
  // 스택이 비었다면 true 반환
  get isEmpty() {
    return this._arr.length === 0;
  }
  // 스택 마지막에 추가된 데이터를 제거하지 않고 반환
  get peek() {
    return this.isEmpty ? null : this._arr[this._arr.length - 1];
  }
  // 스택의 복사본을 반환
  get getBuffer() {
    return [...this._arr];
  }
  // 스택의 마지막에 데이터 추가
  push(item) {
    this._arr.push(item);
  }
  // 스택 마지막에 추가된 데이터를 제거하면서 반환
  pop() {
    return this._arr.pop();
  }
}
