import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar as CalendarIcon, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="container py-6">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-card p-4 shadow-card"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md pointer-events-auto mx-auto"
        />
      </motion.div>

      {/* New Booking Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          variant="gradient"
          className="w-full mt-6"
          size="lg"
          onClick={() => setOpenWizard(true)}
        >
          <Plus className="h-5 w-5" />
          Đặt lịch mới
        </Button>
      </motion.div>

      {/* Slots for Selected Date */}
      <motion.section
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          {date ? date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Chọn ngày'}
        </h2>

        {selectedDateSlots.length > 0 ? (
          <div className="space-y-3">
            {selectedDateSlots.map((slot, index) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
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
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-card p-6 shadow-card text-center">
            <p className="text-muted-foreground">Không có lịch đặt trong ngày này</p>
          </div>
        )}
      </motion.section>

      <BookingWizard open={openWizard} onClose={() => setOpenWizard(false)} />
    </div>
  );
};

export default BookingPage;
