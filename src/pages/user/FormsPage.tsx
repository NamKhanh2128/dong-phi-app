import { useState } from 'react';
import { ArrowLeft, UserMinus, UserPlus, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TamVangForm } from '@/components/user/forms/TamVangForm';
import { TamTruForm } from '@/components/user/forms/TamTruForm';
import { BienDongForm } from '@/components/user/forms/BienDongForm';
import { cn } from '@/lib/utils';

const formTypes = [
  {
    id: 'tam_vang',
    label: 'Tạm vắng',
    icon: UserMinus,
    description: 'Khai báo khi thành viên đi khỏi địa phương',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: 'tam_tru',
    label: 'Tạm trú / Lưu trú',
    icon: UserPlus,
    description: 'Đăng ký cho khách, người thuê trọ',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'bien_dong',
    label: 'Biến động',
    icon: AlertTriangle,
    description: 'Mới sinh, qua đời, chuyển đi',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

const FormsPage = () => {
  const [activeTab, setActiveTab] = useState('tam_vang');
  const [openForm, setOpenForm] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-primary-foreground">Khai báo</h1>
        </div>
      </header>

      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            {formTypes.map((form) => (
              <TabsTrigger
                key={form.id}
                value={form.id}
                className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                {form.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {formTypes.map((form) => (
            <TabsContent key={form.id} value={form.id} className="mt-6">
              <div className="animate-fade-in">
                <button
                  onClick={() => setOpenForm(form.id)}
                  className="w-full rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:scale-[1.01] text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl', form.bgColor)}>
                      <form.icon className={cn('h-7 w-7', form.color)} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{form.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{form.description}</p>
                      <Button variant="gradient" className="mt-4">
                        Bắt đầu khai báo
                      </Button>
                    </div>
                  </div>
                </button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Recent Submissions */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Khai báo gần đây</h2>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-center text-sm text-muted-foreground py-4">
              Chưa có khai báo nào
            </p>
          </div>
        </section>
      </main>

      <TamVangForm open={openForm === 'tam_vang'} onClose={() => setOpenForm(null)} />
      <TamTruForm open={openForm === 'tam_tru'} onClose={() => setOpenForm(null)} />
      <BienDongForm open={openForm === 'bien_dong'} onClose={() => setOpenForm(null)} />

      <BottomNav />
    </div>
  );
};

export default FormsPage;
