import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Home, UserPlus, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { statistics, pendingRequests } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

const statCards = [
  { 
    label: 'Tổng số hộ', 
    value: statistics.totalHouseholds, 
    icon: Home, 
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    trend: '+12 hộ mới trong tháng',
  },
  { 
    label: 'Tổng nhân khẩu', 
    value: statistics.totalResidents, 
    icon: Users, 
    color: 'text-success',
    bgColor: 'bg-success/10',
    trend: '+45 người trong năm',
  },
  { 
    label: 'Tạm trú', 
    value: statistics.tempResidents, 
    icon: UserPlus, 
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    trend: '32 sinh viên, 13 lao động',
  },
  { 
    label: 'Chờ duyệt', 
    value: statistics.pendingRequests, 
    icon: Clock, 
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    trend: 'Cần xử lý ngay',
    isUrgent: true,
  },
];

const COLORS = ['hsl(199, 89%, 48%)', 'hsl(340, 82%, 52%)'];

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground">Tổ dân phố 7 - Phường La Khê, Quận Hà Đông</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn(
              'transition-shadow hover:shadow-elevated',
              stat.isUrgent && 'border-destructive/50'
            )}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center shrink-0', stat.bgColor)}>
                    <stat.icon className={cn('h-6 w-6', stat.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value.toLocaleString('vi-VN')}</p>
                    <p className={cn(
                      'text-xs mt-1 truncate',
                      stat.isUrgent ? 'text-destructive font-medium' : 'text-muted-foreground'
                    )}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Age Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Phân bố độ tuổi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={statistics.ageDistribution} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: number) => [`${value} người`, 'Số lượng']}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gender Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Phân bố giới tính
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={statistics.genderDistribution}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statistics.genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value} người`, 'Số lượng']}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    formatter={(value, entry: any) => (
                      <span className="text-foreground">
                        {value}: {entry.payload.value.toLocaleString('vi-VN')} ({((entry.payload.value / statistics.totalResidents) * 100).toFixed(1)}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Yêu cầu chờ xử lý
            </CardTitle>
            <Link to="/admin/approvals">
              <Button variant="outline" size="sm">
                Xem tất cả
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.slice(0, 5).map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{request.applicantName}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.type === 'tam_vang' && 'Tạm vắng'}
                        {request.type === 'tam_tru' && 'Tạm trú'}
                        {request.type === 'dat_lich' && 'Đặt lịch'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="pending">Chờ duyệt</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{request.submittedAt}</p>
                  </div>
                </motion.div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Không có yêu cầu chờ xử lý</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
