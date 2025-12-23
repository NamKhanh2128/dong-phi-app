import { useState } from 'react';
import { Search, Eye, GitBranch, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { allHouseholds, Household, HouseholdMember } from '@/data/mockData';
import { cn } from '@/lib/utils';

const HouseholdsPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [splitWizardOpen, setSplitWizardOpen] = useState(false);
  const [splitStep, setSplitStep] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const filteredHouseholds = allHouseholds.filter(
    (h) =>
      h.code.toLowerCase().includes(search.toLowerCase()) ||
      h.members[0].name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSplitStart = (household: Household) => {
    setSelectedHousehold(household);
    setSplitWizardOpen(true);
    setSplitStep(1);
    setSelectedMembers([]);
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSplitComplete = () => {
    toast({
      title: 'Thành công',
      description: 'Đã tách hộ thành công!',
    });
    setSplitWizardOpen(false);
    setSplitStep(1);
    setSelectedMembers([]);
    setSelectedHousehold(null);
  };

  const selectedMemberData = selectedHousehold?.members.filter((m) =>
    selectedMembers.includes(m.id)
  );

  const remainingMembers = selectedHousehold?.members.filter(
    (m) => !selectedMembers.includes(m.id)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Quản lý hộ khẩu</h1>
        <p className="text-muted-foreground">Tổng số: {allHouseholds.length} hộ</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã hộ, chủ hộ, địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hộ</TableHead>
                <TableHead>Chủ hộ</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead className="text-center">Số thành viên</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHouseholds.map((household) => (
                <TableRow key={household.id}>
                  <TableCell className="font-medium">{household.code}</TableCell>
                  <TableCell>{household.members[0].name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{household.address}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{household.members.length}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSplitStart(household)}
                        disabled={household.members.length < 2}
                      >
                        <GitBranch className="h-4 w-4 mr-1" />
                        Tách hộ
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Split Household Wizard */}
      <Dialog open={splitWizardOpen} onOpenChange={setSplitWizardOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <GitBranch className="h-4 w-4 text-primary-foreground" />
              </div>
              Tách hộ khẩu
            </DialogTitle>
          </DialogHeader>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  s <= splitStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>

          {splitStep === 1 && selectedHousehold && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-lg bg-accent/50 p-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Bước 1: Chọn thành viên tách ra</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Chọn những thành viên sẽ chuyển sang hộ mới
              </p>
              <div className="space-y-2">
                {selectedHousehold.members.map((member) => (
                  <Label
                    key={member.id}
                    className={cn(
                      'flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all',
                      selectedMembers.includes(member.id)
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleMemberToggle(member.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.role} • {member.dob}
                      </p>
                    </div>
                    <Badge variant="secondary">{member.role}</Badge>
                  </Label>
                ))}
              </div>
            </div>
          )}

          {splitStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-lg bg-accent/50 p-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Bước 2: Thông tin hộ mới</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Chủ hộ mới</Label>
                  <Input
                    value={selectedMemberData?.[0]?.name || ''}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mã hộ mới</Label>
                  <Input
                    value="TDP7-2024-NEW"
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Địa chỉ mới</Label>
                  <Input
                    placeholder="Nhập địa chỉ mới hoặc giữ nguyên"
                    defaultValue={selectedHousehold?.address}
                  />
                </div>
              </div>
            </div>
          )}

          {splitStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-lg bg-success/10 p-3 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Bước 3: Xác nhận tách hộ</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4">
                  <h4 className="font-semibold text-foreground mb-3">Hộ cũ (Giữ lại)</h4>
                  <p className="text-sm text-muted-foreground mb-2">{selectedHousehold?.code}</p>
                  <div className="space-y-1">
                    {remainingMembers?.map((m) => (
                      <p key={m.id} className="text-sm">• {m.name} ({m.role})</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border-2 border-primary p-4 bg-accent/30">
                  <h4 className="font-semibold text-primary mb-3">Hộ mới (Tách ra)</h4>
                  <p className="text-sm text-muted-foreground mb-2">TDP7-2024-NEW</p>
                  <div className="space-y-1">
                    {selectedMemberData?.map((m) => (
                      <p key={m.id} className="text-sm">• {m.name} ({m.role})</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {splitStep > 1 && (
              <Button variant="outline" onClick={() => setSplitStep(splitStep - 1)} className="flex-1">
                Quay lại
              </Button>
            )}
            {splitStep < 3 ? (
              <Button
                variant="gradient"
                onClick={() => setSplitStep(splitStep + 1)}
                className="flex-1"
                disabled={splitStep === 1 && selectedMembers.length === 0}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button variant="success" onClick={handleSplitComplete} className="flex-1">
                Hoàn tất tách hộ
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HouseholdsPage;
