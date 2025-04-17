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
// import { generateAiReport } from '../_actions/generate-ai-report'
import { ScrollArea } from '@/components/ui/scroll-area'
// import Markdown from 'react-markdown'
import { useState } from 'react'
import Link from 'next/link'

interface AiReportButtonProps {
  // year: string
  // month: string
  hasPremiumPlan: boolean
}

const AiReportButton = ({ hasPremiumPlan }: AiReportButtonProps) => {
  //   const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState<boolean>(false)

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      // const aiReport = await generateAiReport({ year, month })
      // setReport(aiReport)
    } catch (error) {
      console.log(error)
    } finally {
      setReportIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold" variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px] overflow-hidden">
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
              {/* <Markdown>{report}</Markdown> */}
            </ScrollArea>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>

              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && (
                  <LoaderCircleIcon className="animate-spin" />
                )}
                {reportIsLoading ? `Gerando Relatório` : 'Gerar relatório'}
              </Button>
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
                <Link href={'/subscription'}>Assinar plano Premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
