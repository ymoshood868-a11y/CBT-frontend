import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-primary text-primary-foreground hover:bg-primary/90',
        accent:    'bg-accent text-accent-foreground hover:bg-accent/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:   'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:     'hover:bg-accent hover:text-accent-foreground',
        link:      'text-primary underline-offset-4 hover:underline',
        success:   'bg-success text-success-foreground hover:bg-success/90',
        warning:   'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      size: {
        sm:      'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg:      'h-12 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = ({ className, variant, size, loading, children, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} disabled={loading || props.disabled} {...props}>
    {loading && <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
    {children}
  </button>
)
