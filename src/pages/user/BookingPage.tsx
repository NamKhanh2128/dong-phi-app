import { useState } from 'react';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Clock, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import { Calendar } from '@/components/ui/calendar';
import { BookingWizard } from '@/components/user/BookingWizard';
import { bookingSlots } from '@/data/mockData';
import { cn } from '@/lib/utils';

const BookingPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openWizard, setOpenWizard] = useState(false);

  const selectedDateSlots = bookingSlots.filter(
    (slot) => slot.date === (date ? date.toLocaleDateString('vi-VN') : '')
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-primary-foreground">Đặt lịch</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setOpenWizard(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-6">
        {/* Calendar */}
        <div className="rounded-2xl bg-card p-4 shadow-card animate-fade-in">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md pointer-events-auto mx-auto"
          />
        </div>

        {/* New Booking Button */}
        <Button
          variant="gradient"
          className="w-full mt-6"
          size="lg"
          onClick={() => setOpenWizard(true)}
        >
          <Plus className="h-5 w-5" />
          Đặt lịch mới
        </Button>

        {/* Slots for Selected Date */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            {date ? date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Chọn ngày'}
          </h2>

          {selectedDateSlots.length > 0 ? (
            <div className="space-y-3">
              {selectedDateSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={cn(
                    'rounded-xl p-4 shadow-card',
                    slot.status === 'booked' ? 'bg-muted/50' : 'bg-card'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        slot.status === 'booked' ? 'bg-muted' : 'bg-accent'
                      )}>
                        <Building className={cn('h-5 w-5', slot.status === 'booked' ? 'text-muted-foreground' : 'text-primary')} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{slot.service}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{slot.startTime} - {slot.endTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={slot.status === 'booked' ? 'secondary' : 'success'}>
                      {slot.status === 'booked' ? 'Đã đặt' : 'Trống'}
                    </Badge>
                  </div>
                  {slot.bookedBy && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Người đặt: {slot.bookedBy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-card p-6 shadow-card text-center">
              <p className="text-muted-foreground">Không có lịch đặt trong ngày này</p>
            </div>
          )}
        </section>
      </main>

      <BookingWizard open={openWizard} onClose={() => setOpenWizard(false)} />

      <BottomNav />
    </div>
  );
};

export default BookingPage;
