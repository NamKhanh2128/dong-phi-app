import { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FeedbackPage = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!category || !title || !content) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Thành công',
      description: 'Đã gửi phản ánh của bạn!',
    });
    setCategory('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-primary-foreground">Phản ánh</h1>
        </div>
      </header>

      <main className="container py-6">
        <div className="rounded-2xl bg-card p-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Gửi ý kiến, kiến nghị</h2>
              <p className="text-sm text-muted-foreground">Chúng tôi luôn lắng nghe bạn</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="an_ninh">An ninh trật tự</SelectItem>
                  <SelectItem value="ve_sinh">Vệ sinh môi trường</SelectItem>
                  <SelectItem value="ha_tang">Hạ tầng cơ sở</SelectItem>
                  <SelectItem value="dich_vu">Dịch vụ công</SelectItem>
                  <SelectItem value="khac">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input
                placeholder="Nhập tiêu đề ngắn gọn"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Nội dung</Label>
              <Textarea
                placeholder="Mô tả chi tiết vấn đề..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] bg-background"
              />
            </div>

            <Button variant="gradient" className="w-full" onClick={handleSubmit}>
              <Send className="h-4 w-4" />
              Gửi phản ánh
            </Button>
          </div>
        </div>

        {/* Past Feedbacks */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Phản ánh đã gửi</h2>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-center text-sm text-muted-foreground py-4">
              Chưa có phản ánh nào
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default FeedbackPage;
