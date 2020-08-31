/**
 * class로 구현한 큐
 */
class Queue {
  constructor(array = []) {
    this._arr = [...array];
  }
  // 큐가 비었다면 true 반환
  get isEmpty() {
    return this._arr.length === 0;
  }
  // 큐의 첫 번째 데이터를 제거하지 않고 반환
  get peek() {
    return this.isEmpty ? null : this._arr[0];
  }
  // 큐의 복사본을 반환
  get buffer() {
    return [...this._arr];
  }
  // 큐 마지막에 데이터 삽입
  enq(item) {
    this._arr.push(item);
  }
  // 큐의 첫 번째 데이터를 제거하면서 반환
  deq() {
    return this.isEmpty ? null : this._arr.shift();
  }
}

const q = new Queue();
q.enq(1);
q.enq(2);
q.enq(3);
q.enq(4);
q.enq(5);
q.deq(); // 1
q.buffer; // [2, 3, 4, 5]
q.peek; // 2
q.isEmpty; // false

/**
 * 큐에서 n번째 데이터 반환
 * : 큐에 존재하는 n번째 데이터에 접급하기 위해서는 deq를 n번 호출해야한다.
 */
function queueAccessNthNode(queue, n) {
  if (n <= 0) console.error("error");
  const bufferQueue = new Queue(queue.buffer);
  while (--n !== 0) {
    bufferQueue.deq();
  }
  return bufferQueue.deq();
}

const q2 = new Queue([2, 3, 4, 5]);
queueAccessNthNode(q2, 2); // 3

/**
 * 큐에 해당 데이터가 존재한다면 true 반환
 */
function queueSearch(queue, element) {
  const bufferArray = queue.buffer;
  const bufferQueue = new Queue(bufferArray);
  while (!bufferQueue.isEmpty) {
    if (bufferQueue.deq() === element) return true;
  }
  return false;
}

const q3 = new Queue([2, 3, 4, 5]);
queueSearch(q3, 4); // true
queueSearch(q3, 1); // false
