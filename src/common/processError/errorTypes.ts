export class NoteError extends Error {
  constructor(message = "Note Error!") {
    super(message);
    this.name = "NoteError"
  }
}

export class IntervalError extends Error {
  constructor(message = "Interval Error!") {
    super(message);
    this.name = "IntervalError"
  }
}

export class RadixError extends Error {
  constructor(message = "Radix Error!") {
    super(message);
    this.name = "RadixError"
  }
}

export class ChordError extends Error {
  constructor(message = "Chord Error!") {
    super(message);
    this.name = "ChordError"
  }
}

export class ScaleError extends Error {
  constructor(message = "Scale Error!") {
    super(message);
    this.name = "ScaleError"
  }
}

export class ScoreError extends Error {
  constructor(message = "Score Error!") {
    super(message);
    this.name = "ScoreError"
  }
}

export class CircleOfFifthsError extends Error {
  constructor(message = "FifthCircle Error!") {
    super(message);
    this.name = "FifthCircleError"
  }
}

export class FactoryError extends Error {
  constructor(message = "Factory Error!") {
    super(message);
    this.name = "FactoryError"
  }
}