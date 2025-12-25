import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/user/FeatureCard';
import { NewsCarousel } from '@/components/user/NewsCarousel';
import { newsItems } from '@/data/mockData';
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
  return (
    <div className="container py-6">
      {/* Feature Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-lg font-semibold text-foreground"
        >
          Dịch vụ
        </motion.h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Tin tức & Thông báo
        </h2>
        <NewsCarousel items={newsItems} />
      </motion.section>
    </div>
  );
};

export default UserDashboard;
