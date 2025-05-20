import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertTriangle, LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { cancelPlan } from '@/http/cancel-plan'
import { useSession } from 'next-auth/react'

interface ManagePlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ManagePlanModal({ isOpen, onClose }: ManagePlanModalProps) {
  const [activeTab, setActiveTab] = useState('billing')
  const [isUpdating, setIsUpdating] = useState(false)

  const { update } = useSession()

  const handleCancelPlan = async () => {
    setIsUpdating(true)
    try {
      await cancelPlan()

      Promise.resolve(
        setTimeout(() => {
          update()
        }, 1000),
      )

      toast.success('Assinatura cancelada com sucesso', {
        style: {
          backgroundColor: '#55B02E',
          color: '#fff',
          borderColor: '#438d24',
        },
        duration: 2000,
      })
    } catch (error) {
      toast.error('Erro ao cancelar a assinatura', {
        style: {
          backgroundColor: '#FF0000',
          color: '#fff',
          borderColor: '#FF0000',
        },
        duration: 2000,
      })
      console.error(error)
    } finally {
      setIsUpdating(false)
      onClose()
    }
  }

  // Mock data for billing history
  // const billingHistory = [
  //   { id: "INV-001", date: "2023-07-01", amount: plan.prices, status: "Paid" },
  //   { id: "INV-002", date: "2023-06-01", amount: plan.prices, status: "Paid" },
  //   { id: "INV-003", date: "2023-05-01", amount: plan.prices, status: "Paid" },
  // ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gerencie seu plano Premium</DialogTitle>
          <DialogDescription>
            Visualize e gerencie os detalhes da sua assinatura atual
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="billing"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            {/* <TabsTrigger
              className="text-black data-[state=active]:border-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="billing"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              className="text-black data-[state=active]:border-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="payment"
            >
              Payment Method
            </TabsTrigger> */}
            <TabsTrigger
              className="text-black data-[state=active]:border-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="cancel"
            >
              Cancelar Assinatura
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Your subscription renews on the 1st of each month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Plan:</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Fee:</span>
                  <span className="font-medium">
                    R${Number(plan.prices[0].price).toFixed(2)}/mês
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Next Billing Date:
                  </span>
                  <span className="font-medium">August 1, 2023</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          R${invoice.amount[0].price}
                        </p>
                        <p className="text-sm text-green-500">
                          {invoice.status}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2025
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Update Payment Method</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString().padStart(2, "0")}
                              >
                                {(i + 1).toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="mx-2 flex items-center text-muted-foreground">
                          /
                        </span>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={(
                                  new Date().getFullYear() + i
                                ).toString()}
                              >
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Payment Method</Button>
              </CardFooter>
            </Card>
          </TabsContent> */}

          <TabsContent value="cancel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-500">
                  Cancele sua assinatura
                </CardTitle>
                <CardDescription>
                  Lamentamos ver você partir. Por favor, revise as informações
                  abaixo antes de cancelar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-amber-50 dark:bg-amber-950 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Informações importantes</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2 text-muted-foreground">
                      <li>
                        Você perderá o acesso a todos os recursos do Premium
                        imediatamente.
                      </li>
                      <li>
                        Você pode se inscrever novamente a qualquer momento.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancel-reason">
                    Motivo do cancelamento (opcional)
                  </Label>
                  <Select>
                    <SelectTrigger id="cancel-reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="too-expensive">Muito caro</SelectItem>
                      <SelectItem value="missing-features">
                        Faltam recursos que preciso
                      </SelectItem>
                      <SelectItem value="not-using">
                        Não usar o suficiente
                      </SelectItem>
                      <SelectItem value="switching">
                        Mudando para outro serviço
                      </SelectItem>
                      <SelectItem value="other">Outro motivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={onClose}>
                  Manter minha assinatura
                </Button>
                <Button
                  onClick={handleCancelPlan}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  {isUpdating && <LoaderCircleIcon className="animate-spin" />}
                  Cancelar assinatura
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
