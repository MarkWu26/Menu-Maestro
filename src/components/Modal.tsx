"use client";

import { useState, useEffect, useCallback, Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  const handleSecondaryAction = useCallback(() => {
    secondaryAction?.();
  }, [secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-[1009]" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="
              fixed 
              inset-0 
              bg-gray-500 
              bg-opacity-75 
              transition-opacity
            "
            />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="
                    relative 
                    transform 
                    overflow-hidden 
                    rounded-lg          
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    lg:h-auto
                    md:h-auto
                  bg-white
                    shadow-xl 
                    transition-all 
                  "
                >
                  {/* Content */}
                  <div>
                    <div className=" h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                      {/* Header */}
                      <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                        <button
                          className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                          onClick={handleClose}
                        >
                          <X size={18} />
                        </button>
                        <div className="text-lg font-semibold">{title}</div>
                      </div>
                      {/* Body */}
                      <div className="relative p-6 flex-auto overflow-auto">
                        {body}
                      </div>
                      {/* Footer */}
                      <div className="flex flex-col gap-2 p-6">
                        <div className="flex flex-row items-center gap-4 w-full">
                          {secondaryAction && secondaryActionLabel && (
                            <Button
                              variant="outline"
                              className=" py-6 dark:hover:bg-zinc-900 dark:hover:opacity-90  hover:bg-opacity-75 dark:text-mainDark text-md font-semibold w-full"
                              onClick={handleSecondaryAction}
                            >
                              {secondaryActionLabel}
                            </Button>
                          )}
                          {actionLabel && (
                            <Button
                              disabled={disabled || isLoading}
                              className=" py-6 text-md font-semibold w-full disabled:bg-opacity-50 disabled:opacity-50"
                              onClick={onSubmit}
                            >
                              {isLoading && <Loader2 />}{" "}
                              {!isLoading && actionLabel!}
                            </Button>
                          )}
                        </div>
                        {/* Footer */}
                        {footer}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
