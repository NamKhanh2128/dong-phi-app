import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { FeatureCard } from '@/components/user/FeatureCard';
import { NewsCarousel } from '@/components/user/NewsCarousel';
import { currentHousehold, newsItems } from '@/data/mockData';
import { BookOpen, FileText, Calendar, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Thông tin hộ',
    description: 'Xem sổ hộ khẩu điện tử',
    path: '/household',
    gradient: true,
  },
  {
    icon: FileText,
    title: 'Khai báo',
    description: 'Tạm vắng, tạm trú, biến động',
    path: '/forms',
    gradient: false,
  },
  {
    icon: Calendar,
    title: 'Đặt lịch',
    description: 'Nhà văn hóa, sân thể thao',
    path: '/booking',
    gradient: false,
  },
  {
    icon: MessageSquare,
    title: 'Phản ánh',
    description: 'Gửi ý kiến, kiến nghị',
    path: '/feedback',
    gradient: false,
  },
];

const UserDashboard = () => {
  const userName = currentHousehold.members[0].name;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header userName={userName} />
      
      <main className="container py-6">
        {/* Feature Grid */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Dịch vụ</h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={feature.path} {...feature} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Tin tức & Thông báo</h2>
          <NewsCarousel items={newsItems} />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default UserDashboard;
