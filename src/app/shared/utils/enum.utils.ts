type EnumValue = string | number;
type Enum = Record<string, EnumValue>;

export const isInEnum = <V>(Enum: Enum) => (value: V): boolean => Object.values(Enum).includes(value as EnumValue);
