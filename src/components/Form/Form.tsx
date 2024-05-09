import React, { useEffect, useState } from 'react';

import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType
} from '@douglasneuroinformatics/libui-form-types';
import { set } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import type { Promisable } from 'type-fest';
import { z } from 'zod';

import { Button } from '../Button/Button.js';
import { Heading } from '../Heading/Heading.js';
import { ErrorMessage } from './ErrorMessage.js';
import { FieldsComponent } from './FieldsComponent.js';
import { getInitialValues } from './utils.js';

import type { FormErrors } from './types.js';

type FormProps<TSchema extends z.ZodType<FormDataType>, TData extends z.TypeOf<TSchema> = z.TypeOf<TSchema>> = {
  [key: `data-${string}`]: unknown;
  className?: string;
  content: FormContent<TData>;
  id?: string;
  initialValues?: PartialNullableFormDataType<TData>;
  onError?: (error: z.ZodError<TData>) => void;
  onSubmit: (data: TData) => Promisable<void>;
  preventResetValuesOnReset?: boolean;
  readOnly?: boolean;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema: z.ZodType<TData>;
};

const Form = <TSchema extends z.ZodType<FormDataType>, TData extends z.TypeOf<TSchema> = z.TypeOf<TSchema>>({
  className,
  content,
  id,
  initialValues,
  onError,
  onSubmit,
  preventResetValuesOnReset,
  readOnly,
  resetBtn,
  submitBtnLabel,
  validationSchema,
  ...props
}: FormProps<TSchema, TData>) => {
  const { i18n, t } = useTranslation('libui');
  const [rootError, setRootError] = useState<null | string>(null);
  const [errors, setErrors] = useState<FormErrors<TData>>({});
  const [values, setValues] = useState<PartialFormDataType<TData>>(
    initialValues ? getInitialValues(initialValues) : {}
  );

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      validationSchema
        .safeParseAsync(values)
        .then((result) => {
          if (!result.success) {
            handleError(result.error);
          }
        })
        .catch(console.error);
    }
  }, [i18n.resolvedLanguage]);

  const handleError = (error: z.ZodError<TData>) => {
    const fieldErrors: FormErrors<TData> = {};
    const rootErrors: string[] = [];
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        set(fieldErrors, issue.path, issue.message);
      } else {
        rootErrors.push(issue.message);
      }
    }
    setRootError(rootErrors.join('\n'));
    setErrors(fieldErrors);
    if (onError) {
      onError(error);
    }
  };

  const reset = () => {
    setRootError(null);
    setErrors({});
    if (!preventResetValuesOnReset) {
      setValues({});
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await validationSchema.safeParseAsync(values);
    if (result.success) {
      reset();
      await onSubmit(result.data);
    } else {
      console.error(result.error.issues);
      handleError(result.error);
    }
  };

  const isGrouped = Array.isArray(content);

  return (
    <form
      autoComplete="off"
      className={twMerge('w-full', isGrouped ? 'space-y-8 divide-y' : 'space-y-6', className)}
      id={id}
      onSubmit={(event) => void handleSubmit(event)}
      {...props}
    >
      {isGrouped ? (
        content.map((fieldGroup, i) => {
          return (
            <div className="space-y-6 [&:not(:first-child)]:pt-8" key={i}>
              <div className="space-y-1">
                {fieldGroup.title && <Heading variant="h4">{fieldGroup.title}</Heading>}
                {fieldGroup.description && (
                  <p className="text-sm italic leading-tight text-muted-foreground">{fieldGroup.description}</p>
                )}
              </div>
              <FieldsComponent
                errors={errors}
                fields={fieldGroup.fields as FormFields<TData>}
                readOnly={readOnly}
                setErrors={setErrors}
                setValues={setValues}
                values={values}
              />
            </div>
          );
        })
      ) : (
        <FieldsComponent
          errors={errors}
          fields={content}
          readOnly={readOnly}
          setErrors={setErrors}
          setValues={setValues}
          values={values}
        />
      )}
      <div className="flex w-full gap-3">
        {/** Note - aria-label is used for testing in downstream packages */}
        <Button
          aria-label="Submit Button"
          className="block w-full"
          data-cy="submit-form"
          disabled={readOnly}
          type="submit"
          variant="primary"
        >
          {submitBtnLabel ?? t('form.submit')}
        </Button>
        {resetBtn && (
          <Button
            aria-label="Reset Button"
            className="block w-full"
            disabled={readOnly}
            type="button"
            variant="secondary"
            onClick={reset}
          >
            {t('form.reset')}
          </Button>
        )}
      </div>
      {rootError && <ErrorMessage error={rootError} />}
    </form>
  );
};

export { Form, type FormProps };
