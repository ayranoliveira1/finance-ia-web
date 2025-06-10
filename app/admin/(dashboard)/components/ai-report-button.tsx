'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BotIcon, LoaderCircleIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Markdown from 'react-markdown'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { generateAiReport } from '../_actions/generate-ai-report'

interface AiReportButtonProps {
  year: string
  month: string
  hasPremiumPlan: boolean
}

const AiReportButton = ({
  year,
  month,
  hasPremiumPlan,
}: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ year, month })
      setReport(aiReport)
    } catch (error) {
      console.log(error)
    } finally {
      setReportIsLoading(false)
    }
  }

  const downloadReport = async () => {
    if (!reportRef.current) return

    const content = reportRef.current.innerHTML
    const page = window.open('', '_blank')

    if (!page) {
      console.error('Failed to open new window for report download.')
      return
    }

    const title = `Relatório ${month}/${year}`
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
          }
          h1, h2, h3, h4 {
            color: #333;
          }
          pre {
            white-space: pre-wrap;
            background: #f4f4f4;
            padding: 10px;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${content}
         <script>
          window.onload = function () {
            window.print();
          };
          window.onafterprint = function () {
            setTimeout(() => window.close(), 100);
          };
        </script>
      </body>
    </html>
  `

    page.document.open()
    page.document.write(html)
    page.document.close()
  }

  useEffect(() => {
    if (!isOpen) {
      setReport(null)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="font-bold rounded-4xl px-10 "
          variant="outline"
        >
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-[600px] overflow-hidden max-w-[90%]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <div ref={reportRef}>
                <Markdown>{report}</Markdown>
              </div>
            </ScrollArea>

            <DialogFooter>
              {report ? (
                <DialogClose asChild>
                  <Button onClick={() => setIsOpen(false)} variant="ghost">
                    Fechar
                  </Button>
                </DialogClose>
              ) : (
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
              )}

              {report ? (
                <Button
                  onClick={downloadReport}
                  disabled={reportIsLoading}
                  className="bg-[#55B02E] hover:bg-[#55B02E]/60 text-white"
                >
                  {reportIsLoading && (
                    <LoaderCircleIcon className="animate-spin" />
                  )}
                  {reportIsLoading ? `Baixando Relatório` : 'Baixar relatório'}
                </Button>
              ) : (
                <Button
                  onClick={handleGenerateReportClick}
                  disabled={reportIsLoading}
                  className="bg-[#55B02E] hover:bg-[#55B02E]/60 text-white"
                >
                  {reportIsLoading && (
                    <LoaderCircleIcon className="animate-spin" />
                  )}
                  {reportIsLoading ? `Gerando Relatório` : 'Gerar relatório'}
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano Premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>

              <Button>
                <Link href={'/admin/subscription'}>Assinar plano Premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
