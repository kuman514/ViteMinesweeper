/**
 * This queue is verified in BOJ submit 61624324
 * https://www.acmicpc.net/submit/2178/61624324
 */

interface QueueNode<T> {
  data: T;
  next: QueueNode<T> | null;
}

interface QueueType<T> {
  push(value: T): void;
  getFront(): T | null;
  pop(): T | null;
}

export class Queue<T> implements QueueType<T> {
  private front: QueueNode<T> | null;

  private back: QueueNode<T> | null;

  constructor() {
    this.front = null;
    this.back = null;
  }

  public push(value: T): void {
    const newNode: QueueNode<T> = {
      data: value,
      next: null,
    };

    if (this.front === null || this.back === null) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = this.back.next;
    }
  }

  public getFront(): T | null {
    return this.front?.data ?? null;
  }

  public pop(): T | null {
    if (this.front === null) {
      return null;
    }

    const frontData = this.front.data;
    this.front = this.front.next;

    if (this.front === null) {
      this.back = null;
    }

    return frontData;
  }
}
