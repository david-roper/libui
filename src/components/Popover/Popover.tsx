import { Root as PopoverRoot, Trigger as PopoverTrigger } from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';

export const Popover = Object.assign(PopoverRoot, {
  Content: PopoverContent,
  Trigger: PopoverTrigger
});
