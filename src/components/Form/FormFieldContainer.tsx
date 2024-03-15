import React from 'react';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import { Popover } from '../Popover';
import { FormErrorMessage } from './FormErrorMessage';

export type FormFieldContainerProps = {
  children: React.ReactNode;
  description?: string;
  error?: string;
};

export const FormFieldContainer = ({ children, description, error }: FormFieldContainerProps) => {
  return (
    <div className="my-8">
      <div className="relative my-1 flex w-full">
        <div className="flex flex-grow flex-col">{children}</div>
        {description && (
          <Popover>
            <Popover.Trigger>
              <QuestionMarkCircledIcon />
            </Popover.Trigger>
            <Popover.Content>Hello World</Popover.Content>
          </Popover>
        )}
      </div>
      {error && <FormErrorMessage message={error} />}
    </div>
  );
};
