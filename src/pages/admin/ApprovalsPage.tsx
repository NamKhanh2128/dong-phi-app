import { useState } from 'react';
import { Check, X, Eye, Clock, UserPlus, Calendar, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

const typeLabels = {
  tam_vang: 'Tạm vắng',
  tam_tru: 'Tạm trú',
  dat_lich: 'Đặt lịch',
  bien_dong: 'Biến động',
};

const typeIcons = {
  tam_vang: UserMinus,
  tam_tru: UserPlus,
  dat_lich: Calendar,
  bien_dong: Clock,
};

const ApprovalsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingRequests[0] | null>(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredRequests = pendingRequests.filter((r) => {
    if (activeTab === 'all') return true;
    return r.type === activeTab;
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Phê duyệt yêu cầu</h1>
        <p className="text-muted-foreground">Xử lý các yêu cầu chờ duyệt</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="tam_tru">Tạm trú</TabsTrigger>
          <TabsTrigger value="tam_vang">Tạm vắng</TabsTrigger>
          <TabsTrigger value="dat_lich">Đặt lịch</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-4">
            {filteredRequests.map((request) => {
              const Icon = typeIcons[request.type];
              return (
                <Card key={request.id} className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
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
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => {
        setSelectedRequest(null);
        setShowRejectInput(false);
        setRejectReason('');
      }}>
        <DialogContent className="max-w-lg bg-card">
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

              {/* Request Details */}
              <div className="space-y-3">
                <p className="font-medium text-foreground">Chi tiết yêu cầu</p>
                {Object.entries(selectedRequest.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium text-foreground">
                      {typeof value === 'number' 
                        ? value.toLocaleString('vi-VN') + ' VNĐ'
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>

              {/* ID Card Preview for Tạm trú */}
              {selectedRequest.type === 'tam_tru' && (
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Ảnh CCCD</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Mặt trước</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Mặt sau</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reject Reason */}
              {showRejectInput && (
                <div className="space-y-2 animate-fade-in">
                  <Label>Lý do từ chối</Label>
                  <Textarea
                    placeholder="Nhập lý do từ chối..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="bg-background"
                  />
                </div>
              )}

              {/* Action Buttons */}
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
    </div>
  );
};

export default ApprovalsPage;
