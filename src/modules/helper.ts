export function GenericGreeter<T>(arg: T): void {
  console.log(`hello, ${arg} with type ${typeof arg}`);
}
