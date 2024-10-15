import {Ref} from 'vue';

export const REFS_OVERRIDE_FIELDS = ['value', 'error'] as const;

type UntypedFields = {[T in typeof REFS_OVERRIDE_FIELDS[number]]: unknown };

export interface InputTypedFields extends UntypedFields {
    value: string | null,
    error: string,
}

export type InputFieldType<B = null> = {
    [T in keyof InputTypedFields]:
        B extends Ref ? Ref<InputTypedFields[T]> : InputTypedFields[T];
}

export interface InputFieldBaseInterface {
    type: string;
    name: string;
    placeholder: string;
    isDisabled: boolean;
    isRequired: boolean;
}

export interface InputFieldRefsInterface extends InputFieldBaseInterface, InputFieldType<Ref> {}

export interface InputFieldInterface extends InputFieldBaseInterface, InputFieldType {}

export const InputField = {
    value: null,
    type: 'text',
    isDisabled: false,
    isRequired: false,
    name: 'name',
    error: '',
    placeholder: ''
} as const;