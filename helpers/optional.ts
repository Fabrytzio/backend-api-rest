export const isDefined = (value: any): boolean => typeof value !== 'undefined' && value !== null;

export class Optional<T> {
    private readonly value: T | null = null;

    private constructor(value: T | null) { this.value = value; }

    public get(): T {
        if (this.value === null) throw new TypeError('value is not defined');
        return this.value;
    }

    public static empty<T>(): Optional<T> {
        return new Optional<T>(null);
    }

    public static of<T>(value: T): Optional<T> {
        if (!isDefined(value)) throw new Error("value must be defined");
        return new Optional<T>(value);
    }

    public static ofNullable<T>(value: T | null): Optional<T> {
        if (typeof value === 'undefined') throw new TypeError('value cannot be undefined');
        return new Optional<T>(value);
    }

}