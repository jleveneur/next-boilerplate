'use client';

import { type User } from '@supabase/supabase-js';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useButtons } from '@/hooks/translations/use-buttons';
import { useFeatures } from '@/hooks/translations/use-features';
import { useIsMobile } from '@/hooks/use-mobile';

import { deleteUser } from '../actions';

type DeleteUserDialogProps = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteUserDialog = ({ user, ...props }: DeleteUserDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useFeatures('users');
  const buttons = useButtons();
  const isMobile = useIsMobile();

  const handleDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteUser(user.id);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }

      props.onOpenChange?.(false);
    });
  };

  if (isMobile) {
    return (
      <Drawer {...props}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('delete.title')}</DrawerTitle>
            <DrawerDescription>{t('delete.description')}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? buttons('pending') : buttons('delete')}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{buttons('cancel')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('delete.title')}</DialogTitle>
          <DialogDescription>{t('delete.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{buttons('cancel')}</Button>
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
            {isPending ? buttons('pending') : buttons('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteUserDialog };
