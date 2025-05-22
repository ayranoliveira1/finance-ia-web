'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { debounce } from 'lodash'

import { Loader2 } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Transaction } from '@/types/transactions'
import { DataTablePagination } from './data-table-pagination'

interface DataTableProps {
  columns: ColumnDef<Transaction, unknown>[]
  accessToken?: string
}

export function DataTable({ columns, accessToken }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page')) || 1

  const [inputValue, setInputValue] = useState(search)

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: 12,
  })

  const query = new URLSearchParams()
  if (search) query.append('search', search)
  if (page) query.append('page', page.toString())

  interface TransactionsPaginationType {
    transactions: Transaction[]
    totalItems: number
    totalPages: number
    currentPage: number
    pageSize: number
  }

  const { data, isLoading } = useQuery<TransactionsPaginationType>({
    queryKey: ['transactions', { search, page }],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?${query.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      return response.json()
    },
  })

  const table = useReactTable({
    data: data?.transactions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    manualPagination: true,
    pageCount: data?.totalPages,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    initialState: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newState)
      updateParams('page', newState.pageIndex + 1) // ← lembre do +1!
    },
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters)
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      updateParams('page', 1)
    },
  })

  const updateParams = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())

      if (key === 'search') {
        params.set('page', '1')
      }

      if (value) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim() === '') {
          debouncedSearch.cancel()
          updateParams('search', '')
        }
        updateParams('search', value)
      }, 1500),
    [updateParams],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data?.currentPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="px-1">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Pesquisar pelo nome"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value
            setInputValue(value)
            debouncedSearch(value)
          }}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border relative">
        <div className="max-h-[700px] overflow-y-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="sticky top-0" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
