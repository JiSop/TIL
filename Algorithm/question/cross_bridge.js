function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let trucks = [...truck_weights];
  let bridge = [];
  let bridge_weight = 0;
  while (bridge_weight + trucks.length) {
    if (bridge_length <= bridge.length) {
      bridge_weight -= bridge.shift();
    }
    if (bridge_weight + trucks[0] <= weight) {
      const truck = trucks.shift();
      bridge.push(truck);
      bridge_weight += truck;
    } else {
      bridge.push(0);
    }
    time++;
    console.log(`
      대기 트럭: ${trucks}, ${trucks.length}
      다리: ${bridge}, ${bridge.length}
      현재 다리 무게: ${bridge_weight}
      경과 시간: ${time}`);
  }
  return time;
}

console.log(solution(2, 10, [7, 4, 5, 6])); // 8
// console.log(solution(10, 10, [7, 3, 4, 5, 6])); // 32
// console.log(solution(100, 100, [10])); // 101
// console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // 110
