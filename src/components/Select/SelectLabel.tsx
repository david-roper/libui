import { forwardRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/utils';

export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return <SelectPrimitive.Label className={cn('px-2 py-1.5 text-sm font-semibold', className)} ref={ref} {...props} />;
});
