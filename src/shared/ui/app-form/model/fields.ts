import {Ref} from 'vue';

export const REFS_INPUT_OVERRIDE_FIELDS = [
    'value',
    'error'
] as const;

export const REFS_RANGE_OVERRIDE_FIELDS = [
    'valueMin',
    'valueMax',
] as const;

type UntypedInputFields = { [T in typeof REFS_INPUT_OVERRIDE_FIELDS[number]]: unknown };

type UntypedRangeFields = { [T in typeof REFS_RANGE_OVERRIDE_FIELDS[number]]: unknown };

export interface InputTypesFields extends UntypedInputFields {
    value: string | null,
    error: string,
}

export interface RangeTypesFields extends UntypedRangeFields {
    valueMin: number,
    valueMax: number,
}

export type InputFieldType<B = null> = {
    [T in keyof InputTypesFields]:
    B extends Ref ? Ref<InputTypesFields[T]> : InputTypesFields[T];
}

export type RangeFieldType<B = null> = {
    [T in keyof RangeTypesFields]:
    B extends Ref ? Ref<RangeTypesFields[T]> : RangeTypesFields[T];
}

export interface InputFieldBaseInterface {
    type: string;
    name: string;
    placeholder: string;
    isDisabled: boolean;
    isRequired: boolean;
}

export interface RangeFieldBaseInterface {
    min: number,
    max: number,
    step: number,
    isDisabled: boolean,
    isRequired: boolean,
}

export interface InputFieldRefsInterface extends InputFieldBaseInterface, InputFieldType<Ref> {
}

export interface InputFieldInterface extends InputFieldBaseInterface, InputFieldType {
}

export interface RangeFieldInterface extends RangeFieldBaseInterface, RangeFieldType {
}

export interface RangeFieldRefsInterface extends RangeFieldBaseInterface, RangeFieldType<Ref> {
}

export const InputField = {
    value: null,
    error: '',
    type: 'text',
    name: 'name',
    placeholder: '',
    isDisabled: false,
    isRequired: false,
} as const;

export const RangeField = {
    valueMin: 0,
    valueMax: 0,
    min: 0,
    max: 0,
    step: 0,
    isDisabled: false,
    isRequired: false,
} as const;