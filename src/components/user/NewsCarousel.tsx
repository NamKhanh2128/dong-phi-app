import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Heart, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface NewsCarouselProps {
  items: NewsItem[];
}

const typeIcons = {
  meeting: Users,
  health: Heart,
  payment: CreditCard,
  event: Calendar,
};

const typeColors = {
  meeting: 'bg-primary/10 text-primary',
  health: 'bg-success/10 text-success',
  payment: 'bg-warning/10 text-warning',
  event: 'bg-secondary/20 text-secondary-foreground',
};

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <div
                key={item.id}
                className="min-w-full bg-card p-5 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', typeColors[item.type])}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <h4 className="mt-1 font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                currentIndex === index
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted-foreground/30'
              )}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
