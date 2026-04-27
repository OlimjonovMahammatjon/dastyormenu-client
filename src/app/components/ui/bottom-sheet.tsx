import { Drawer } from 'vaul'
import { X } from 'lucide-react'

interface BottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: React.ReactNode
}

export function BottomSheet({ open, onOpenChange, title, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-40" />
        <Drawer.Content 
          className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t-2 border-gold rounded-t-xl z-50 flex flex-col max-h-[85vh] shadow-2xl"
          aria-describedby={title ? undefined : 'bottom-sheet-content'}
        >
          <div className="flex-shrink-0 mx-auto w-12 h-1.5 bg-border rounded-full mt-4 mb-4" aria-hidden="true" />
          {title && (
            <div className="flex-shrink-0 flex items-center justify-between px-6 pb-4 border-b border-border">
              <Drawer.Title className="text-xl text-text">{title}</Drawer.Title>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Yopish"
                className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-6 py-4" id="bottom-sheet-content">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
