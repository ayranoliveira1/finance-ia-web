import { Skeleton } from '@/components/ui/skeleton'

const LastTransactionSkeleton = () => {
  return (
    <div className="h-full space-y-6 rounded-xl border p-6">
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-[2px] w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default LastTransactionSkeleton
