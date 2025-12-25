import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { currentHousehold } from '@/data/mockData';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, path, children, isActive, onClick }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hasChildren = children && children.length > 0;
  const isChildActive = children?.some((child) => location.pathname === child.path);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
            isChildActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-8 mt-1 space-y-1">
                {children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    onClick={onClick}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      location.pathname === child.path
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={path || '/'}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const userName = currentHousehold.members[0].name;
  const notificationCount = 3;

  const navItems = [
    { icon: Home, label: 'Trang chủ', path: '/' },
    { icon: BookOpen, label: 'Sổ Hộ Khẩu', path: '/household' },
    {
      icon: FileText,
      label: 'Khai báo',
      children: [
        { label: 'Tạm trú / Lưu trú', path: '/forms?tab=tamtru' },
        { label: 'Tạm vắng', path: '/forms?tab=tamvang' },
        { label: 'Biến động nhân khẩu', path: '/forms?tab=biendong' },
      ],
    },
    { icon: Calendar, label: 'Đặt lịch', path: '/booking' },
    { icon: MessageSquare, label: 'Phản ánh', path: '/feedback' },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <p className="text-sm text-primary-foreground/80">Xin chào,</p>
              <p className="font-semibold text-primary-foreground">{userName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-[10px]"
                      variant="destructive"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card">
                <div className="p-3 font-medium border-b border-border">
                  Thông báo mới
                </div>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium">Họp tổ dân phố</span>
                  <span className="text-sm text-muted-foreground">
                    19h00 ngày 28/12/2024
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium">Tiêm vắc-xin cúm</span>
                  <span className="text-sm text-muted-foreground">
                    Dành cho người cao tuổi
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium">Thu tiền điện</span>
                  <span className="text-sm text-muted-foreground">
                    25-30/12/2024
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-card shadow-xl"
          >
            {/* Sidebar Header */}
            <div className="gradient-primary flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">{userName}</p>
                  <p className="text-xs text-primary-foreground/80">Cư dân</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={closeSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  children={item.children}
                  isActive={location.pathname === item.path}
                  onClick={closeSidebar}
                />
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="border-t border-border p-4 space-y-1">
              <Link
                to="/account"
                onClick={closeSidebar}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Tài khoản</span>
              </Link>
              <button
                onClick={closeSidebar}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-20 md:pb-6">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card shadow-elevated md:hidden">
        <div className="container flex items-center justify-around py-2">
          {[
            { icon: Home, label: 'Trang chủ', path: '/' },
            { icon: BookOpen, label: 'Sổ hộ khẩu', path: '/household' },
            { icon: FileText, label: 'Khai báo', path: '/forms' },
            { icon: Calendar, label: 'Đặt lịch', path: '/booking' },
            { icon: MessageSquare, label: 'Phản ánh', path: '/feedback' },
          ].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
