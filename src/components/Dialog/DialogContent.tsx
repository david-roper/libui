import { forwardRef } from 'react';

import { Close, Content, Portal } from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/utils';

import { DialogOverlay } from './DialogOverlay';

export const DialogContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(function DialogContent({ children, className, ...props }, ref) {
  return (
    <Portal>
      <DialogOverlay />
      <Content
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        <Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="h-4 w-4" />
        </Close>
      </Content>
    </Portal>
  );
});
