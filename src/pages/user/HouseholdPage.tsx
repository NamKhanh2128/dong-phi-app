import { useState } from 'react';
import { ArrowLeft, Home, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import { MemberCard } from '@/components/user/MemberCard';
import { MemberDetailPopup } from '@/components/user/MemberDetailPopup';
import { currentHousehold, HouseholdMember } from '@/data/mockData';

const HouseholdPage = () => {
  const [selectedMember, setSelectedMember] = useState<HouseholdMember | null>(null);

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
          <h1 className="text-lg font-semibold text-primary-foreground">Sổ hộ khẩu</h1>
        </div>
      </header>

      <main className="container py-6">
        {/* Household Info Card */}
        <div className="rounded-2xl bg-card p-5 shadow-card animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Mã hộ</p>
              <p className="font-bold text-foreground">{currentHousehold.code}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm text-foreground">{currentHousehold.address}</p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{currentHousehold.members.length} thành viên</span>
          </div>
        </div>

        {/* Members List */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Thành viên hộ gia đình</h2>
          <div className="space-y-3">
            {currentHousehold.members.map((member, index) => (
              <div
                key={member.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MemberCard
                  member={member}
                  onClick={() => setSelectedMember(member)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <MemberDetailPopup
        member={selectedMember}
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <BottomNav />
    </div>
  );
};

export default HouseholdPage;
