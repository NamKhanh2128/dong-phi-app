import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Clock, UserPlus, Calendar, UserMinus, KeyRound, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { pendingRequests } from '@/data/mockData';
import { cn } from '@/lib/utils';

// Mock data for account and password requests
const accountRequests = [
  {
    id: 'acc-001',
    name: 'Trần Văn Hùng',
    phone: '0987654321',
    email: 'tranvanhung@email.com',
    submittedAt: '23/12/2024 10:30',
    status: 'pending',
    householdCode: 'TDP7-2024-002',
  },
  {
    id: 'acc-002',
    name: 'Lê Thị Hoa',
    phone: '0912345678',
    email: 'lethihoa@email.com',
    submittedAt: '22/12/2024 14:15',
    status: 'pending',
    householdCode: 'TDP7-2024-003',
  },
];

const passwordRequests = [
  {
    id: 'pwd-001',
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    submittedAt: '24/12/2024 08:00',
    reason: 'Quên mật khẩu cũ',
    householdCode: 'TDP7-2024-001',
  },
];

const typeLabels: Record<string, string> = {
  tam_vang: 'Tạm vắng',
  tam_tru: 'Tạm trú',
  dat_lich: 'Đặt lịch',
  bien_dong: 'Biến động',
};

const typeIcons: Record<string, React.ElementType> = {
  tam_vang: UserMinus,
  tam_tru: UserPlus,
  dat_lich: Calendar,
  bien_dong: Clock,
};

const ApprovalsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('requests');
  const [requestFilter, setRequestFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingRequests[0] | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<typeof accountRequests[0] | null>(null);
  const [selectedPassword, setSelectedPassword] = useState<typeof passwordRequests[0] | null>(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredRequests = pendingRequests.filter((r) => {
    if (requestFilter === 'all') return true;
    return r.type === requestFilter;
  });

  const handleApprove = () => {
    toast({
      title: 'Đã duyệt',
      description: `Yêu cầu của ${selectedRequest?.applicantName} đã được phê duyệt.`,
    });
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập lý do từ chối',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Đã từ chối',
      description: `Yêu cầu của ${selectedRequest?.applicantName} đã bị từ chối.`,
    });
    setSelectedRequest(null);
    setShowRejectInput(false);
    setRejectReason('');
  };

  const handleAccountApprove = () => {
    toast({
      title: 'Đã duyệt tài khoản',
      description: `Tài khoản của ${selectedAccount?.name} đã được kích hoạt.`,
    });
    setSelectedAccount(null);
  };

  const handlePasswordApprove = () => {
    toast({
      title: 'Đã duyệt đổi mật khẩu',
      description: `Yêu cầu đổi mật khẩu của ${selectedPassword?.name} đã được chấp nhận.`,
    });
    setSelectedPassword(null);
  };

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground">Phê duyệt</h1>
        <p className="text-muted-foreground">Xử lý các yêu cầu chờ duyệt từ cư dân</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted mb-6 w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="requests" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Yêu cầu</span>
            <Badge variant="destructive" className="ml-1">{pendingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="accounts" className="gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Tài khoản</span>
            <Badge variant="secondary" className="ml-1">{accountRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="passwords" className="gap-2">
            <KeyRound className="h-4 w-4" />
            <span className="hidden sm:inline">Mật khẩu</span>
            <Badge variant="secondary" className="ml-1">{passwordRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Requests Tab */}
        <TabsContent value="requests">
          <div className="flex flex-wrap gap-2 mb-4">
            {['all', 'tam_tru', 'tam_vang', 'dat_lich'].map((filter) => (
              <Button
                key={filter}
                variant={requestFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRequestFilter(filter)}
              >
                {filter === 'all' ? 'Tất cả' : typeLabels[filter]}
              </Button>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredRequests.map((request, index) => {
              const Icon = typeIcons[request.type];
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{request.applicantName}</p>
                              <Badge variant="pending">{typeLabels[request.type]}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Mã hộ: {request.householdCode}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Gửi lúc: {request.submittedAt}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => setSelectedRequest(request)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Xem xét
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Không có yêu cầu nào</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Duyệt tài khoản mới
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {accountRequests.map((account, index) => (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.phone} • {account.householdCode}</p>
                        <p className="text-xs text-muted-foreground">{account.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Chi tiết
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {accountRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Không có yêu cầu đăng ký mới</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Passwords Tab */}
        <TabsContent value="passwords">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-warning" />
                Duyệt đổi mật khẩu
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {passwordRequests.map((pwd, index) => (
                  <motion.div
                    key={pwd.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                        <KeyRound className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{pwd.name}</p>
                        <p className="text-sm text-muted-foreground">{pwd.reason}</p>
                        <p className="text-xs text-muted-foreground">{pwd.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="success" size="sm" onClick={() => setSelectedPassword(pwd)}>
                        <Check className="h-4 w-4 mr-1" />
                        Duyệt
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {passwordRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Không có yêu cầu đổi mật khẩu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Review Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => {
        setSelectedRequest(null);
        setShowRejectInput(false);
        setRejectReason('');
      }}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Eye className="h-4 w-4 text-primary-foreground" />
              </div>
              Xem xét yêu cầu
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-foreground">{selectedRequest.applicantName}</p>
                  <Badge variant="pending">{typeLabels[selectedRequest.type]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Mã hộ: {selectedRequest.householdCode}</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-foreground">Chi tiết yêu cầu</p>
                {Object.entries(selectedRequest.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium text-foreground text-right">
                      {typeof value === 'number' 
                        ? value.toLocaleString('vi-VN') + ' VNĐ'
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>

              {selectedRequest.type === 'tam_tru' && (
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Ảnh CCCD đính kèm</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-dashed border-border">
                      <span className="text-xs text-muted-foreground">Mặt trước CCCD</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-dashed border-border">
                      <span className="text-xs text-muted-foreground">Mặt sau CCCD</span>
                    </div>
                  </div>
                </div>
              )}

              {showRejectInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label>Lý do từ chối</Label>
                  <Textarea
                    placeholder="Nhập lý do từ chối..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="bg-background"
                  />
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                {!showRejectInput ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRejectInput(true)}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                    <Button
                      variant="success"
                      onClick={handleApprove}
                      className="flex-1"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Duyệt
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRejectInput(false);
                        setRejectReason('');
                      }}
                      className="flex-1"
                    >
                      Quay lại
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      className="flex-1"
                    >
                      Xác nhận từ chối
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Account Review Dialog */}
      <Dialog open={!!selectedAccount} onOpenChange={() => setSelectedAccount(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-primary-foreground" />
              </div>
              Duyệt tài khoản
            </DialogTitle>
          </DialogHeader>

          {selectedAccount && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Họ tên</span>
                  <span className="font-medium text-foreground">{selectedAccount.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số điện thoại</span>
                  <span className="font-medium text-foreground">{selectedAccount.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground">{selectedAccount.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mã hộ khẩu</span>
                  <span className="font-medium text-foreground">{selectedAccount.householdCode}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedAccount(null)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="success" onClick={handleAccountApprove} className="flex-1">
                  <Check className="h-4 w-4 mr-1" />
                  Kích hoạt tài khoản
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Password Review Dialog */}
      <Dialog open={!!selectedPassword} onOpenChange={() => setSelectedPassword(null)}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-warning/20 flex items-center justify-center">
                <KeyRound className="h-4 w-4 text-warning" />
              </div>
              Xác nhận đổi mật khẩu
            </DialogTitle>
          </DialogHeader>

          {selectedPassword && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Họ tên</span>
                  <span className="font-medium text-foreground">{selectedPassword.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lý do</span>
                  <span className="font-medium text-foreground">{selectedPassword.reason}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Khi duyệt, hệ thống sẽ gửi link đặt lại mật khẩu qua email/SMS cho người dùng.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedPassword(null)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="success" onClick={handlePasswordApprove} className="flex-1">
                  <Check className="h-4 w-4 mr-1" />
                  Duyệt đổi mật khẩu
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalsPage;
